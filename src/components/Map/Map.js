// @flow

import React, { useState, useEffect } from "react";
import ReactDomServer from "react-dom/server";

import { useHistory } from "react-router";
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
import {
    MapContainer,
    MapToolbox,
    NumberBox,
    NumbersContainer,
    PostcodeSearchForm,
    SliderContainer
} from "./Map.styles";
import usePrevious from "hooks/usePrevious";
import { CurrentLocation } from "../DashboardHeader/DashboardHeader.styles";
import useApi from "../../hooks/useApi";
import moment from "moment";
import { Histogram, IndicatorLine, Plotter } from "../Plotter/Plotter";
import numeral from "numeral";
import {
    LegendContainer,
    Row, ScaleColor,
    ScaleGroup,
    ScaleLegend,
    ScaleLegendLabel, ScaleValue
} from "../../pages/InteractiveMap/InteractiveMap.styles";
import turf from "turf";
import { useFullRollingRates } from "../../hooks/useMapData";
import axios from "axios";
import MapMarker from "assets/icon-mapmarker.svg";


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


const getChangeFactor = (data: Array<number>[]) => {

    const
        sigma_this_week = data.slice(0, 7).reduce((acc, item) => item[0] + acc, 0),
        sigma_last_week = data.slice(7).reduce((acc, item) => item[0] + acc, 0),
        delta = sigma_this_week - sigma_last_week,
        delta_percentage = (sigma_this_week / Math.max(sigma_last_week, 1) - 1) * 100,
        trend = delta_percentage > 0
            ? 0
            : delta_percentage < 0
            ? 180
            : 90;

    return {
        percentage: numeral(delta_percentage).format("0,0.0"),
        change: numeral(Math.round(delta)).format("0,0"),
        totalThisWeek: numeral(sigma_this_week).format("0,0"),
        totalLastWeek: numeral(sigma_last_week).format("0,0"),
        trend: trend
    }

};


const Map: ComponentType<*> = ({ data, geoKey, isRate = true, colours, geoJSON, geoData, date, extrema, minData, maxData, valueIndex, children, dates, ...props }) => {

    const
        bounds = new L.LatLngBounds(new L.LatLng(50.5, -14.5), new L.LatLng(58.8, 10)),
        maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -12.5), new L.LatLng(61, 10)),
        centrePoint = bounds.getCenter(),
        [map, setMap] = useState(null),
        [styleDataStatus, setStyleDataStatus] = useState(false);

    const
        [postcodeData, setPostcodeData] = useState(null),
        [currentLocation, setCurrentLocation] = useState(null),
        [locationData, setLocationData] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        [areaType, setAreaType] = useState("utla"),
        dataDate = moment().subtract(5, "days"),
        apiData = useApi({
            ...currentLocation
                ? {
                    conjunctiveFilters: [
                        { key: "areaCode", sign: "=", value: currentLocation },
                        { key: "areaType", sign: "=", value: areaType },
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
        fortnightData = useApi({
            ...currentLocation
                ? {
                    conjunctiveFilters: [
                        { key: "areaCode", sign: "=", value: currentLocation },
                        { key: "areaType", sign: "=", value: areaType },
                        { key: "date", sign: "<=", value: dataDate.toISOString().split("T")[0] },
                        { key: "date", sign: ">=", value: dataDate.subtract(13, 'days').toISOString().split("T")[0] },
                    ],
                }
                : {},
            cache: true,
            structure: [
                "newCasesBySpecimenDate",
                "date"
            ],
            defaultResponse: []
        }),
        casesData = useFullRollingRates(locationData?.type),
        changeFactor = getChangeFactor(fortnightData);

    console.log(changeFactor)
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
                // maxBounds: [
                //     [40.653782, -20.130489],
                //     [71.090472, 10.316913]
                // ],
                zoom: 4.9,
                minZoom: 4.9,
                maxZoom: 15,
                        preserveDrawingBuffer: true

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

                // map.addSource("geo-lsoa", {
                //     type: 'geojson',
                //     data: "https://uk-covid19.azurefd.net/downloads/maps/lsoa_data_latest.geojson",
                //     buffer: 1,
                //     tolerance: 1,
                //     maxzoom: 14
                //     // minzoom: 8.5
                // });

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
                    // minzoom: 7
                });

                map.addSource("geo-utla", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/utla-ref.geojson",
                    buffer: 32,
                    maxzoom: 7,
                    // minzoom: 3
                });

                map.addSource("timeseries-geo-data-utla", {
                    type: 'geojson',
                    data: `https://uk-covid19.azurefd.net/downloads/maps/utla_data_latest.geojson`,
                    buffer: 32,
                    maxzoom: 7,
                    // minzoom: 3
                });

                map.addSource("geo-nation", {
                    type: 'geojson',
                    data: "https://uk-covid19.azurefd.net/downloads/maps/nation-ref.geojson",
                    buffer: 8,
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
                        'maxzoom': 15,
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

                // map.addLayer(
                //     {
                //         'id': 'lsoa',
                //         'type': 'circle',
                //         'source': 'geo-lsoa',
                //         'minzoom': 11.5,
                //         // layout: {
                //         //   'icon-allow-overlap': false,
                //         // },
                //         'paint': {
                //             'circle-radius': {
                //                 'base': 5,
                //                 'stops': [
                //                     [11, 15],
                //                     [15, 70],
                //                     // [20, 180]
                //                 ]
                //             },
                //             'circle-color': [
                //                 "step",
                //                 ['get', 'value'],
                //                 colours[0],
                //                 5, colours[1],
                //                 10, colours[2],
                //                 20, colours[3],
                //                 30, colours[4],
                //             ]
                //         }
                //     },
                //     'msoa'
                // );

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
                                10000, colours[5],
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
                                10000, colours[5],
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
                        'maxzoom': 15,
                        'paint': {
                            'fill-color': [
                                "step",
                                ['get', 'value'],
                                colours[0],
                                100, colours[1],
                                250, colours[2],
                                500, colours[3],
                                5000, colours[4],
                            ],
                            'fill-opacity': 1
                        }
                    },
                    'msoa'
                );


                map.on("sourcedata", function (e) {
                    if ( e.sourceId.startsWith("geo") > -1 ) {
                        // createLayer(e.sourceId.split(/-/g).slice(-1))
                    }

                });

                [['choropleth-utla', 'utla'], ['choropleth-ltla', 'ltla'], ['choropleth-msoa', 'msoa']].map(loc => {
                    map.on('click', loc[0], function (e) {
                        setCurrentLocation(e.features[0].properties.code)
                        setAreaType(loc[1])
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
                    // map.
                });

                map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
                map.addControl(new mapboxgl.FullscreenControl());

                // function sourceCallback() {
                //     // assuming 'map' is defined globally, or you can use 'this'
                //     if (map.getSource('my-data') && map.isSourceLoaded('my-data')) {
                //         console.log('source loaded!');
                //     }
                // }
                //
                // map.on('sourcedata', sourceCallback)
                map.on("render", (e) => {
                    // console.log(e);
                    setIsLoading(false)
                });

            })
        }
    }, [map]);

    useEffect(() => {

        if ( styleDataStatus ) filterBy(date)

    }, [date, styleDataStatus]);

    useEffect(() => {

        setLocationData(apiData?.[0] ?? null)

    }, [apiData]);

    useEffect(() => {

        if ( map && postcodeData ) {
            // console.log(MapMarker)

            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = `url(${MapMarker})`;
            el.style.backgroundRepeat = "no-repeat";
            el.style.backgroundSize = "100% 100%";
            el.style.width = "70px";
            el.style.height = "70px";

            new mapboxgl.Marker(el, {anchor: "bottom"})
                .setLngLat(postcodeData.geometry.coordinates)
                .addTo(map);

            map.flyTo({
                center: [
                    postcodeData.geometry.coordinates[0],
                    postcodeData.geometry.coordinates[1]
                ],
                zoom: 7
            });

        }

    }, [postcodeData, map])

    // if ( !(map && layerGroup && data && geoData) )
    //     return <Loading/>;
    function downloadImage (e) {
        // e.preventDefault();
        const img = map.getCanvas().toDataURL('image/png')
        e.target.href = img
    }

    return <>
            <SliderContainer>
            { children }
        </SliderContainer>
    <MapContainer>

        { isLoading && <Loading/> }
        <div id={ "map" } style={ { visibility: isLoading ? "hidden" : "visible" } }/>
        {
            !isLoading &&
            <>
                <PostcodeSearchForm onSubmit={  (e) => {
                        e.preventDefault();
                        const postcode = document.getElementById("postcode").value;
                        (async () => {
                            const { data } = await axios.get(URLs.postcode, { params: { category: "postcode", search: postcode } });
                            setPostcodeData(data)
                        })();
                    } }>
                    <labe htmlFor={ "postcode" } className={ "govuk-visually-hidden" }>Search by postcode</labe>
                    <input className={ "govuk-input govuk-input--width-10" }
                           name={ "postcode" }
                           maxLength={ 10 }
                           type={ "text" }
                           id={ "postcode" }
                           pattern={ "[A-Za-z]{1,2}\\d{1,2}[A-Za-z]?\\s?\\d{1,2}[A-Za-z]{1,2}" }
                           placeholder={ "Search by postcode" }/>
                    <labe htmlFor={ "submit-postcode" } className={ "govuk-visually-hidden" }>Search by postcode</labe>
                    <input name={ "submit-postcode" } className={ "govuk-button" } id={ "submit-postcode" } type={ "submit" } value={ "" }/>
                </PostcodeSearchForm>
                <LegendContainer>
                    {/*<ScaleLegend>*/}
                    {/*    <ScaleLegendLabel>LSOAs</ScaleLegendLabel>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: "#fff" }}/>*/}
                    {/*        <ScaleValue>0 &ndash; 2</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[0] }}/>*/}
                    {/*        <ScaleValue>3 &ndash; 5</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[1] }}/>*/}
                    {/*        <ScaleValue>6 &ndash; 10</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[2] }}/>*/}
                    {/*        <ScaleValue>11 &ndash; 20</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[3] }}/>*/}
                    {/*        <ScaleValue>21 &ndash; 30</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[4] }}/>*/}
                    {/*        <ScaleValue>31+</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*</ScaleLegend>*/}

                    {/*<ScaleLegend>*/}
                    {/*    <ScaleLegendLabel>MSOAs (England only)</ScaleLegendLabel>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: "#fff" }}/>*/}
                    {/*        <ScaleValue>0 &ndash; 2</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[0] }}/>*/}
                    {/*        <ScaleValue>3 &ndash; 10</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[1] }}/>*/}
                    {/*        <ScaleValue>11 &ndash; 20</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[2] }}/>*/}
                    {/*        <ScaleValue>21 &ndash; 30</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[3] }}/>*/}
                    {/*        <ScaleValue>31 &ndash; 50</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*    <ScaleGroup>*/}
                    {/*        <ScaleColor style={{ background: colours[4] }}/>*/}
                    {/*        <ScaleValue>51+</ScaleValue>*/}
                    {/*    </ScaleGroup>*/}
                    {/*</ScaleLegend>*/}

                    <ScaleLegend>
                        <ScaleLegendLabel>Local authorities</ScaleLegendLabel>
                        <ScaleGroup>
                            <ScaleColor style={{ background: "#fff" }}/>
                            <ScaleValue>Missing data</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[0] }}/>
                            <ScaleValue>0 &ndash; 500</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[1] }}/>
                            <ScaleValue>501 &ndash; 1500</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[2] }}/>
                            <ScaleValue>1501 &ndash; 3000</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[3] }}/>
                            <ScaleValue>3001 &ndash; 5000</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[4] }}/>
                            <ScaleValue>5001-10,000</ScaleValue>
                        </ScaleGroup>
                        <ScaleGroup>
                            <ScaleColor style={{ background: colours[5] }}/>
                            <ScaleValue>10,001+</ScaleValue>
                        </ScaleGroup>
                    </ScaleLegend>
                </LegendContainer>
            </>

        }
        { !isLoading && locationData
            ? <MapToolbox>
                <h2>{ locationData.name }<small>7 days to { dataDate.format("DD MMMM YYYY") }</small></h2>
                <NumbersContainer>
                    <NumberBox>
                        <h3>Cases</h3>
                        <p>{ changeFactor.totalThisWeek }</p>
                    </NumberBox>
                    {/*<NumberBox>*/}
                    {/*    <h3>Incidence rate</h3>*/}
                    {/*    <p>{ numeral(locationData.incidenceRate).format("0,0.0") ?? "N/A" }</p>*/}
                    {/*</NumberBox>*/}
                    <NumberBox>
                        <h3>7-day rolling rate</h3>
                        <p>{ numeral(locationData.rollingRate).format("0,0.0") ?? "N/A" }</p>
                    </NumberBox>
                    <NumberBox>
                        <h3>Change</h3>
                        <p>{ changeFactor.change } ({ changeFactor.percentage }%)</p>
                    </NumberBox>
                </NumbersContainer>
                <strong>How does this area compare?</strong>
                {/*<Histogram data={ casesData } currentLocation={ locationData.rollingRate }/>*/}
                <IndicatorLine data={ casesData } currentLocation={ locationData.rollingRate }/>
            </MapToolbox>
            : null
        }
        </MapContainer>
                <a onClick={ downloadImage }
                   className={ "govuk-link govuk-link--no-visited-state" }
                   download={ "map.png" } href={ "" }>Download image</a>
        </>

};  // Map


export default Map;
