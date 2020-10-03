// @flow

import React, { useState, useEffect } from "react";
import ReactDomServer from "react-dom/server";

import { useHistory } from "react-router";
// import 'mapbox-gl-leaflet';
import L from "leaflet";
import mapboxgl from "mapbox-gl";
import { max } from "d3-array";
import { scaleLinear, scaleSqrt } from "d3-scale";

import useGeoData from "hooks/useGeoData";
import Loading from "components/Loading";
import URLs from "common/urls";
import * as utils from "./utils";

import type ComponentType from "react";
import type { MapType } from "./Map.types";

import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapToolbox, NumberBox, NumbersContainer, SliderContainer } from "./Map.styles";
import usePrevious from "hooks/usePrevious";
import { CurrentLocation } from "../DashboardHeader/DashboardHeader.styles";
import useApi from "../../hooks/useApi";
import moment from "moment";
import { Histogram, Plotter } from "../Plotter/Plotter";
import numeral from "numeral";
import { Row } from "../../pages/InteractiveMap/InteractiveMap.styles";
import turf from "turf";


const OpenStreetMapAttrib: ComponentType<*> = () => {

    return <a
        href={ "http://www.openstreetmap.org/about/" }
        target={ "_blank" }
        rel={ "noopener noreferrer" }
    >
        &copy; OpenStreetMap contributors
    </a>

}; // OpenStreetMapAttrib


const getBlobOptions = (data, geoData, areaCodeKey) => {

    return geoData
        .filter(({ properties: { [areaCodeKey]: key } }) => (data.getByKey(key)?.rawData?.value ?? 0) > 0)
        .map(({ properties: p, properties: { [areaCodeKey]: key } }) => ({
            type: 'Feature',
            properties: {
                name: data?.[key]?.name?.value ?? 0,
                count: data.getByKey(key)?.rawData?.value ?? 0
            },
            geometry: {
                type: 'Point',
                coordinates: [p.long, p.lat],
            },
        }))

}; // getBlobOptions


const initialiseMap: MapType<*> = () => {

    const
        mapbox = L.mapboxGL({
            attribution: ReactDomServer.renderToStaticMarkup(<OpenStreetMapAttrib/>),
            style: URLs.mapStyle
        }),
        bounds = new L.LatLngBounds(new L.LatLng(52.5, -10.5), new L.LatLng(58.8, 15)),
        maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -10.5), new L.LatLng(61, 15)),
        centrePoint = bounds.getCenter(),
        map = L.map('map', {
            center: centrePoint,
            maxBounds: maxBounds,
            zoom: 5.4,
            minZoom: 5.4,
            maxZoom: 12,
            layers: [mapbox]
        }),
        canvas = mapbox.getCanvas();

    if ( canvas )
        canvas.setAttribute(
            'aria-label',
            'Map showing number of COVID-19 cases by nation, region, or local authority in the UK.'
        );

    map.zoomControl.setPosition('bottomright');

    return {
        map: map,
        layerGroup: L.layerGroup().addTo(map),
        canvas: canvas,
        centrePoint: centrePoint
    }


};  // initialiseMap


const Map: ComponentType<*> = ({ data, geoKey, isRate = true, colours, geoJSON, geoData, date, extrema, minData, maxData, valueIndex, children, dates, ...props }) => {

    const
        bounds = new L.LatLngBounds(new L.LatLng(50.5, -14.5), new L.LatLng(58.8, 10)),
        maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -12.5), new L.LatLng(61, 10)),
        centrePoint = bounds.getCenter(),
        [map, setMap] = useState(null),
        [styleDataStatus, setStyleDataStatus] = useState(false);

    const
        [currentLocation, setCurrentLocation] = useState(null),
        [locationData, setLocationData] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        dataDate = moment().subtract(5, "days"),
        apiData = useApi({
            ...currentLocation
                ? {
                    conjunctiveFilters: [
                        { key: "areaCode", sign: "=", value: currentLocation },
                        { key: "date", sign: "=", value: dataDate.toISOString().split("T")[0] },
                    ],
                }
                : {},
            cache: true,
            structure: {
                date: "date",
                name: "areaName",
                type: "areaType",
                value: "newCasesBySpecimenDate",
                incidenceRate: "newCasesBySpecimenDateRate",
                rollingRate: "newCasesBySpecimenDateRollingRate",
            }
        }),
        casesData = useApi({
            ...locationData
                ? {
                    conjunctiveFilters: [
                        { key: "areaType", sign: "=", value: locationData.type },
                        { key: "date", sign: "=", value: dataDate.toISOString().split("T")[0] },
                    ],
                }
                : {},
            structure: [
                "newCasesBySpecimenDateRollingRate",
            ],
            cache: true,
            defaultResponse: []
        });

    let hoveredStateId = null;
    let isAtStart = true;
    // let map;

    // let map, layerGroup, centrePoint;

    // console.log(geoData)
    // console.log(shadeScale(data.filter(d => d[areaCode] === p.id)?.[0] ?? 0));

    // useEffect(() => {
    //     setMapControl(initialiseMap());
    // }, []);

    const filterBy = (date: string) => {

        const filters = ['==', 'date', date.split(/T/)[0]];
        // const filters = ['get', 'value'];

        if ( map ) {
            map.setFilter('choropleth-msoa', filters);
            map.setFilter('choropleth-utla', filters);
            map.setFilter('choropleth-ltla', filters);
            map.setFilter('lsoa', filters);
        }
        // map.setPaintProperty('choropleth', 'fill-color.input', ['get', 'value']);

        // Set the label to the month
        // document.getElementById('month').textContent = months[month];
    };


    useEffect(() => {

        // console.log(geoData);
        // const { map, layerGroup, centrePoint } = initialiseMap();
        // console.log(index)
        // console.log(data?.[index] ?? null)
        // console.log(map)

        if ( !map ) {
            setMap(new mapboxgl.Map({
                container: 'map',
                style: URLs.mapStyle,
                center: centrePoint,

                // maxBounds: [
                //     [40.653782, -20.130489],
                //     [71.090472, 10.316913]
                // ],
                zoom: 5
            }));
        }

    }, [])

    useEffect(() => {

        if ( map && !styleDataStatus ) {

            map.on("load", function () {
                // map.addSource("geo-data", {
                //     type: 'geojson',
                //     data: `https://uk-covid19.azurefd.net/${geoJSON}`
                // });

                map.addSource("timeseries-geo-data-msoa", {
                    type: 'geojson',
                    data: `https://uk-covid19.azurefd.net/downloads/maps/msoa_data_latest.geojson`,
                    buffer: 1,
                    tolerance: 1,
                    maxzoom: 12
                    // minzoom: 8.5
                });

                map.addSource("geo-msoa", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/msoa-ref.geojson",
                    buffer: 1,
                    tolerance: 1,
                    maxzoom: 12.5
                    // minzoom: 8.5
                });

                map.addSource("geo-lsoa", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/lsoa_data_latest.geojson",
                    buffer: 1,
                    tolerance: 1,
                    maxzoom: 14
                    // minzoom: 8.5
                });

                map.addSource("timeseries-geo-data-ltla", {
                    type: 'geojson',
                    data: `https://uk-covid19.azurefd.net/downloads/maps/ltla_data_latest.geojson`,
                    buffer: 1,
                    tolerance: 1,
                    maxzoom: 8.5,
                    // minzoom: 7
                });

                map.addSource("geo-ltla", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/ltla-ref.geojson",
                    buffer: 1,
                    tolerance: 1,
                    maxzoom: 8.5,
                    attribution: "ONS layouts © Crown copyright",
                    // minzoom: 7
                });

                map.addSource("geo-utla", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/utla-ref.geojson",
                    buffer: 32,
                    maxzoom: 7,
                    attribution: "ONS layouts © Crown copyright",
                    // minzoom: 3
                });

                map.addSource("timeseries-geo-data-utla", {
                    type: 'geojson',
                    data: `https://uk-covid19.azurefd.net/downloads/maps/utla_data_latest.geojson`,
                    buffer: 32,
                    maxzoom: 7,
                    attribution: "ONS layouts © Crown copyright",
                    // minzoom: 3
                });

                map.addSource("geo-nation", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/nation-ref.geojson",
                    buffer: 8,
                    attribution: "",
                    maxzoom: 3,
                    // minzoom: .1
                });


                map.addLayer(
                    {
                        'id': 'nation',
                        'type': 'line',
                        'source': 'geo-nation',
                        'minzoom': .1,
                        'maxzoom': 5,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#888',
                            'line-width': 1
                        }
                    },
                    "water"
                );

                map.addLayer(
                    {
                        'id': 'utla',
                        'type': 'line',
                        'source': 'geo-utla',
                        'minzoom': 3,
                        'maxzoom': 7,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                '#000000',
                                '#888'
                            ],
                            'line-width': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                5,
                                .5
                            ]
                        }
                    },
                    'nation'
                );

                map.addLayer(
                    {
                        'id': 'ltla',
                        'type': 'line',
                        'source': 'geo-ltla',
                        'minzoom': 7,
                        'maxzoom': 8.5,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                '#000000',
                                '#888'
                            ],
                            'line-width': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                5,
                                .5
                            ]
                        }
                    },
                    'utla'
                );

                map.addLayer(
                    {
                        'id': 'msoa',
                        'type': 'line',
                        'source': 'geo-msoa',
                        'minzoom': 8.5,
                        'maxzoom': 13.5,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                '#000000',
                                '#888'
                            ],
                            'line-width': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                5,
                                .5
                            ]
                        }
                    },
                    'ltla'
                );

                map.addLayer(
                    {
                        'id': 'lsoa',
                        'type': 'circle',
                        'source': 'geo-lsoa',
                        'minzoom': 11.5,
                        // layout: {
                        //   'icon-allow-overlap': false,
                        // },
                        'paint': {
                            'circle-radius': {
                                'base': 5,
                                'stops': [
                                    [12, 12],
                                    [22, 180]
                                ]
                                // '*',
                                // ['get', 'value'],
                                // 2
                                // 3, 3,
                                // 5, 10,
                                // 10, 20,
                                // 20, 30,
                                // 30, 40,
                            },
                            'circle-color': [
                                "step",
                                ['get', 'value'],
                                colours[0],
                                5, colours[1],
                                10, colours[2],
                                20, colours[3],
                                30, colours[4],
                            ]
                        }
                    },
                    'msoa'
                );

                //
                // //
                //
                // // console.log(extrema)
                //
                //
                map.addLayer(
                    {
                        'id': 'choropleth-utla',
                        'type': 'fill',
                        'source': 'timeseries-geo-data-utla',
                        // 'minzoom': 5.5,
                        'maxzoom': 7,
                        'paint': {
                            'fill-color': [
                                "step",
                                ['get', 'value'],
                                colours[0],
                                500, colours[1],
                                1500, colours[2],
                                3000, colours[3],
                                5000, colours[4],
                            ],
                            'fill-opacity': 1,
                            // 'line-color': '#888',
                            // 'line-width': [
                            //     'case',
                            //     ['boolean', ['feature-state', 'hover'], false],
                            //     2,
                            //     .5
                            // ]
                        }
                    },
                    'utla'
                );

                map.addLayer(
                    {
                        'id': 'choropleth-ltla',
                        'type': 'fill',
                        'source': 'timeseries-geo-data-ltla',
                        'minzoom': 7,
                        'maxzoom': 8.5,
                        'paint': {
                            'fill-color': [
                                "step",
                                ['get', 'value'],
                                colours[0],
                                500, colours[1],
                                1500, colours[2],
                                3000, colours[3],
                                5000, colours[4],
                            ],
                            'fill-opacity': 1,

                            // 'line-color': '#888',
                            // 'line-width': [
                            //     'case',
                            //     ['boolean', ['feature-state', 'hover'], false],
                            //     2,
                            //     .5
                            // ]
                        }
                    },
                    'ltla'
                );


                map.addLayer(
                    {
                        'id': 'choropleth-msoa',
                        'type': 'fill',
                        'source': 'timeseries-geo-data-msoa',
                        'minzoom': 8.5,
                        'maxzoom': 11.5,
                        'paint': {
                            'fill-color': [
                                "step",
                                ['get', 'value'],
                                colours[0],
                                10, colours[1],
                                20, colours[2],
                                30, colours[3],
                                50, colours[4],
                            ],
                            'fill-opacity': 1
                        }
                    },
                    'msoa'
                );

                // map.on('mouseleave', 'utla', () => {
                //     if ( hoveredStateId ) {
                //         map.setFeatureState(
                //             { source: 'timeseries-geo-data-utla', id: hoveredStateId },
                //             { hover: false }
                //         );
                //     }
                //     hoveredStateId = null;
                // });


                // map.on('mouseover', `utla`, function (e) {
                //     if ( e.features.length > 0 ) {
                //         if ( hoveredStateId ) {
                //             map.setFeatureState(
                //                 { source: `geo-utla`, id: hoveredStateId },
                //                 { hover: false }
                //             );
                //         }
                //         hoveredStateId = e.features[0].id;
                //         map.setFeatureState(
                //             { source: 'geo-utla', id: hoveredStateId },
                //             { hover: true }
                //         );
                //     }
                // });
                //
                // map.on('mousemove', `ltla`, function (e) {
                //     if ( e.features.length > 0 ) {
                //         if ( hoveredStateId ) {
                //             map.setFeatureState(
                //                 { source: `geo-ltla`, id: hoveredStateId },
                //                 { hover: false }
                //             );
                //         }
                //         hoveredStateId = e.features[0].id;
                //         map.setFeatureState(
                //             { source: 'geo-ltla', id: hoveredStateId },
                //             { hover: true }
                //         );
                //     }
                // });


                // const createLayer = (areaType) => {
                //     const zoomLevels = {
                //         nation: {
                //             minzoom: .2,
                //             maxzoom: 3
                //         },
                //         utla: {
                //             minzoom: 3,
                //             maxzoom: 7
                //         },
                //         ltla: {
                //             minzoom: 7,
                //             maxzoom: 8.5
                //         },
                //         msoa: {
                //             minzoom: 8.5,
                //             maxzoom: 12
                //         }
                //     };
                //
                //     const colourScales = {
                //         default: [
                //             colours[0],
                //             500, colours[1],
                //             1500, colours[2],
                //             3000, colours[3],
                //             5000, colours[4]
                //         ],
                //         msoa: [
                //             colours[0],
                //             10, colours[1],
                //             20, colours[2],
                //             30, colours[3],
                //             50, colours[4],
                //         ]
                //     };
                //
                //     map.addLayer(
                //         {
                //             'id': `outline-${areaType}`,
                //             'type': 'line',
                //             'source': `geo-${areaType}`,
                //             // 'minzoom': 3,
                //             // 'maxzoom': 7,
                //             ...zoomLevels[areaType],
                //             'layout': {
                //                 'line-join': 'round',
                //                 'line-cap': 'round'
                //             },
                //             'paint': {
                //                 'line-color': [
                //                     'case',
                //                     ['boolean', ['feature-state', 'hover'], false],
                //                     '#000000',
                //                     '#888'
                //                 ],
                //                 'line-width': [
                //                     'case',
                //                     ['boolean', ['feature-state', 'hover'], false],
                //                     3,
                //                     .5
                //                 ]
                //             }
                //         },
                //         'water'
                //     );
                //
                //     map.addLayer(
                //         {
                //             'id': `choropleth-${areaType}`,
                //             'type': 'fill',
                //             'source': `timeseries-geo-data-${areaType}`,
                //             // 'minzoom': 5.5,
                //             // 'maxzoom': 7,
                //             ...zoomLevels[areaType],
                //             'paint': {
                //                 'fill-color': [
                //                     "step",
                //                     ['get', 'value'],
                //                     ...(colourScales?.[areaType] ?? colourScales?.default)
                //                 ],
                //                 'fill-opacity': 1,
                //             }
                //         },
                //         `outline-${areaType}`
                //     );
                //
                // };

                // map.on('mouseover', function (e) {
                //     console.log(e);
                //         if ( e.features.length > 0 ) {
                //             if ( hoveredStateId ) {
                //                 map.setFeatureState(
                //                     { source: `geo-$${areaType}`, id: hoveredStateId },
                //                     { hover: false }
                //                 );
                //             }
                //             hoveredStateId = e.features[0].id;
                //             map.setFeatureState(
                //                 { source: `geo-${areaType}`, id: hoveredStateId },
                //                 { hover: true }
                //             );
                //         }
                //     });

                map.on("sourcedata", function (e) {
                    if ( e.sourceId.startsWith("geo") > -1 ) {
                        // createLayer(e.sourceId.split(/-/g).slice(-1))
                    }

                });

                [['choropleth-utla', 'utla'], ['choropleth-ltla', 'ltla'], ['choropleth-msoa', 'msoa'], ['lsoa', 'lsoa']].map(loc => {
                    map.on('click', loc[0], function (e) {
                        setCurrentLocation(e.features[0].properties.code)

                        const outlineId = map
                            .queryRenderedFeatures({ layers: [loc[1]] })
                            .find(item => item.properties.code === e.features[0].properties.code)
                            .id;

                        // if ( e.features.length > 0 ) {
                        if ( hoveredStateId?.id ) {
                            map.setFeatureState(
                                { source: `geo-${ hoveredStateId.location }`, id: hoveredStateId.id },
                                { hover: false }
                            );
                        }
                        hoveredStateId = { id: outlineId, location: loc[1] };
                        // console.log(hoveredStateId)
                        map.setFeatureState(
                            { source: `geo-${ hoveredStateId.location }`, id: hoveredStateId.id },
                            { hover: true }
                        );

                        map.fitBounds(turf.bbox(e.features[0]), {
                            padding: 20,
                            maxZoom: map.getLayer(loc[1]).maxzoom - 0.2
                        });

                    });

                });


                // map.legendControl.addLegend(ReactDomServer.renderToStaticMarkup(children));

                map.on('styledata', function (e) {
                    setStyleDataStatus(true)
                });

                map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
                map.addControl(new mapboxgl.FullscreenControl());

                map.on("render", () => setIsLoading(false));

            })
        }
    }, [map]);

    useEffect(() => {

        if ( styleDataStatus ) filterBy(date)

    }, [date, styleDataStatus]);

    useEffect(() => {

        setLocationData(apiData?.[0] ?? null)

    }, [apiData]);

    // if ( !(map && layerGroup && data && geoData) )
    //     return <Loading/>;


    return <>
        { isLoading && <Loading/> }
        <MapContainer id={ "map" } style={ { visibility: isLoading ? "hidden" : "visible" } }/>

        { !isLoading && <SliderContainer>{ children }</SliderContainer> }
        { !isLoading && locationData
            ? <MapToolbox>
                <h2>{ locationData.name }<small>as of { dataDate.format("DD MMMM YYYY") }</small></h2>
                <NumbersContainer>
                    <NumberBox>
                        <h3>Cases</h3>
                        <p>{ numeral(locationData.value).format("0,0") }</p>
                    </NumberBox>
                    <NumberBox>
                        <h3>Incidence rate</h3>
                        <p>{ numeral(locationData.incidenceRate).format("0,0.0") ?? "N/A" }</p>
                    </NumberBox>
                    <NumberBox>
                        <h3>7-day rolling rate</h3>
                        <p>{ numeral(locationData.rollingRate).format("0,0.0") ?? "N/A" }</p>
                    </NumberBox>
                </NumbersContainer>
                <strong>How does this area compare?</strong>
                <Histogram data={ casesData.map(item => item[0]) } currentLocation={ locationData.rollingRate }/>
            </MapToolbox>
            : null
        }
    </>

};  // Map


export default Map;
