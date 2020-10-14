// @flow

import React, { useState, useEffect } from "react";
import L from "leaflet";
import mapboxgl from "mapbox-gl";
import Loading from "components/Loading";
import URLs from "common/urls";
import type ComponentType from "react";

import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    IndicatorLegend,
    MapContainer,
    MapToolbox,
    NumberBox,
    NumbersContainer,
    PostcodeSearchForm,
    SliderContainer
} from "./Map.styles";
import useApi from "hooks/useApi";
import moment from "moment";
import { IndicatorLine } from "components/Plotter/Plotter";
import numeral from "numeral";
import {
    LegendContainer,
    ScaleColor,
    ScaleGroup,
    ScaleLegend,
    ScaleLegendLabel, ScaleValue
} from "pages/InteractiveMap/InteractiveMap.styles";
import turf from "turf";
import { useFullRollingRates } from "hooks/useMapData";
import axios from "axios";
import MapMarker from "assets/icon-mapmarker.svg";
import useTimestamp from "hooks/useTimestamp";


const colours = [
    "#e0e543",
    "#74bb68",
    "#399384",
    "#2067AB",
    "#12407F",
    "#53084A"
];


const MapLayers = [
    {
        label: "utla",
        name: "UTLA",
        paths: {
            timeSeries: "https://coronavirus.data.gov.uk/downloads/maps/utla_data_latest.geojson",
            outline: "https://coronavirus.data.gov.uk/downloads/maps/utla-ref.geojson"
        },
        foreground: "water",
        tolerance: .8,
        buffer: 1,
        minZoom: 1,
        maxZoom: 7,
        buckets: [
            colours[0],
            10, colours[1],
            50, colours[2],
            100, colours[3],
            200, colours[4],
            400, colours[5],
        ]
    },
    {
        label: "ltla",
        name: "LTLA",
        paths: {
            timeSeries: "https://coronavirus.data.gov.uk/downloads/maps/ltla_data_latest.geojson",
            outline: "https://coronavirus.data.gov.uk/downloads/maps/ltla-ref.geojson"
        },
        tolerance: 1,
        buffer: 1,
        minZoom: 7,
        maxZoom: 8.5,
        foreground: "utla",
        buckets: [
            colours[0],
            10, colours[1],
            50, colours[2],
            100, colours[3],
            200, colours[4],
            400, colours[5],
        ]
    },
    {
        label: "msoa",
        name: "MSOA",
        paths: {
            timeSeries: "https://coronavirus.data.gov.uk/downloads/maps/msoa_data_latest.geojson",
            outline: "https://coronavirus.data.gov.uk/downloads/maps/msoa-ref.geojson"
        },
        tolerance: 1,
        buffer: 1,
        minZoom: 8.5,
        maxZoom: 15,
        foreground: "ltla",
        buckets: [
            colours[0],
            10, colours[1],
            50, colours[2],
            100, colours[3],
            200, colours[4],
            400, colours[5],
        ]
    }
];


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


const getChangeFactor = (data: Array<number>[], sliceBy: number = 7) => {

    const
        sigma_this_week = data.slice(0, sliceBy).reduce((acc, item) => item[0] + acc, 0),
        sigma_last_week = data.slice(sliceBy).reduce((acc, item) => item[0] + acc, 0),
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


const SoaCard = ({ currentLocation, areaType }) => {

    const
        [locationData, setLocationData] = useState(null),
        apiData = useApi({
            extraParams: [
                {key: "areaType", sign: "=", value: "msoa"},
                {key: "areaCode", sign: "=", value: currentLocation}
            ],
            cache: false,
            structure: {
                areaCode: "areaCode",
                release: "release",
                newCasesBySpecimenDate: [{
                    date: "date",
                    rollingSum: "rollingSum",
                    rollingRate: "rollingRate"
                }]
            },
            defaultResponse: null,
            endpoint: "soaApi"
        }),
        [fortnightData, setFortnightData] = useState(null),
        casesData = useFullRollingRates(areaType);

    useEffect(() => {

        if ( apiData ) {
            const
                latestDate = apiData?.newCasesBySpecimenDate?.[0]?.date ?? "",
                precedingWeek = moment(latestDate).subtract(1, "week").format("YYYY-MM-DD"),
                fortnightDates = [latestDate, precedingWeek];

            setFortnightData(
                fortnightDates.map(date => {
                    const value = apiData?.newCasesBySpecimenDate?.find(item => item.date === date);
                    return [value?.rollingSum ?? 2]
                })
            );
                // apiData?.newCasesBySpecimenDate?.map(item => {
                //     if ( fortnightDates.indexOf(item.date) > -1 )
                //         return item.rollingSum
                // }) ?? null

        }

    }, [ apiData?.newCasesBySpecimenDate ])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(URLs.postcode, { params: { category: "msoa", search: currentLocation } });
            setLocationData(data)
        })();
    }, [currentLocation])

    if ( !locationData || !currentLocation || !casesData || !fortnightData || !apiData )
        return <MapToolbox><Loading/></MapToolbox>;

    const
        changeFactor = getChangeFactor([[0], ...fortnightData, [0]], 2);

    return <MapToolbox>
        <h2 className={ 'govuk-heading-m' }>
            { locationData?.msoaName ?? "" }
            <small className={ "govuk-caption-m" }>7
                days to { moment(apiData.newCasesBySpecimenDate?.[0]?.date).format("DD MMMM YYYY") }
            </small>
        </h2>
        <NumbersContainer>
            <NumberBox>
                <h3>Cases</h3>
                <p>{ changeFactor.totalThisWeek }</p>
            </NumberBox>
            <NumberBox>
                <h3>7&ndash;day rolling rate</h3>
                <p>{ numeral(apiData.newCasesBySpecimenDate?.[0]?.rollingRate).format("0,0.0") ?? "N/A" }</p>
            </NumberBox>
            <NumberBox>
                <h3>Change</h3>
                <p>{ changeFactor.change } ({ changeFactor.percentage }%)</p>
            </NumberBox>
        </NumbersContainer>
        <strong>Case rate compared to national average</strong>
        <IndicatorLine data={ casesData }
                       currentLocation={ apiData.newCasesBySpecimenDate?.[0]?.rollingRate }>
            <IndicatorLegend>
                <span>Below average</span>
                <span>Above average</span>
            </IndicatorLegend>
        </IndicatorLine>
    </MapToolbox>

};


const LocalAuthorityCard = ({ currentLocation, areaType }) => {

    const
        timestamp = useTimestamp(),
        [locationData, setLocationData] = useState(null),
        dataDate = moment(timestamp).subtract(5, "days"),
        apiData = useApi({
            ...(currentLocation && areaType !== "msoa")
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
                rollingRate: "newCasesBySpecimenDateRollingRate",
            },
            defaultResponse: null
        }),
        fortnightData = useApi({
            ...(currentLocation && areaType !== "msoa")
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
        casesData = useFullRollingRates(locationData?.type);

    useEffect(() => {

        setLocationData(apiData?.[0] ?? null)

    }, [apiData]);

    if ( !currentLocation || areaType === "msoa" ) return null;

    if ( !locationData || !casesData || !fortnightData )
        return <MapToolbox><Loading/></MapToolbox>;

    const changeFactor = getChangeFactor(fortnightData);

    return <MapToolbox>
        <h2>{ locationData.name }<small>7 days to { moment(fortnightData?.[0]?.[1] ?? "").format("DD MMMM YYYY") }</small></h2>
        <NumbersContainer>
            <NumberBox>
                <h3>Cases</h3>
                <p>{ changeFactor.totalThisWeek }</p>
            </NumberBox>
            <NumberBox>
                <h3>7&ndash;day rolling rate</h3>
                <p>{ numeral(locationData.rollingRate).format("0,0.0") ?? "N/A" }</p>
            </NumberBox>
            <NumberBox>
                <h3>Change</h3>
                <p>{ changeFactor.change } ({ changeFactor.percentage }%)</p>
            </NumberBox>
        </NumbersContainer>
        <strong>Case rate compared to national average</strong>
        <IndicatorLine data={ casesData } currentLocation={ locationData.rollingRate }>
            <IndicatorLegend>
                <span>Below average</span>
                <span>Above average</span>
            </IndicatorLegend>
        </IndicatorLine>
    </MapToolbox>

};



const Map: ComponentType<*> = ({ data, geoKey, isRate = true, colours, geoJSON, geoData, date,
                                   extrema, minData, maxData, valueIndex, children, dates, ...props }) => {

    const
        bounds = new L.LatLngBounds(new L.LatLng(50.5, -14.5), new L.LatLng(58.8, 10)),
        maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -12.5), new L.LatLng(61, 10)),
        centrePoint = bounds.getCenter(),
        [map, setMap] = useState(null),
        [styleDataStatus, setStyleDataStatus] = useState(false);

    const
        [postcodeData, setPostcodeData] = useState(null),
        [currentLocation, setCurrentLocation] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        [zoomLayerIndex, setZoomLayerIndex] = useState(0),
        [areaType, setAreaType] = useState("utla");

    let hoveredStateId = null;
    let isAtStart = true;

    const filterBy = (date: string) => {

        const filters = ['==', 'date', date.split(/T/)[0]];

        if ( map )
            MapLayers.map(layer => {
                const mapLayer = map.getLayer(`choropleth-${layer.label}`);

                if ( mapLayer ) map.setFilter(`choropleth-${layer.label}`, filters);

            });

    };

    useEffect(() => {
        if ( !map ) {
            setMap(new mapboxgl.Map({
                container: 'map',
                style: URLs.mapStyle,
                center: centrePoint,
                zoom: 4.9,
                minZoom: 4.9,
                maxZoom: 15,
                preserveDrawingBuffer: true
            }));
        }
    }, []);

    useEffect(() => {

        if ( map && !styleDataStatus ) {

            map.on("load", function () {

                MapLayers.map( layer => {
                    map.addSource(`timeSeries-${layer.label}`, {
                        type: 'geojson',
                        data: layer.paths.timeSeries,
                        buffer: layer.buffer,
                        tolerance: layer.tolerance,
                        maxzoom: layer.maxZoom
                    });

                    map.addSource(`geo-${layer.label}`, {
                        type: 'geojson',
                        data: layer.paths.outline,
                        buffer: layer.buffer,
                        tolerance: layer.tolerance,
                        maxzoom: layer.maxZoom
                    });
                });

                MapLayers.map( layer => {
                    map.addLayer({
                        'id': layer.label,
                        'type': 'line',
                        'source': `geo-${layer.label}`,
                        'minzoom': layer.minZoom,
                        'maxzoom': layer.maxZoom,
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
                    }, layer.foreground);

                    map.addLayer({
                        'id': `choropleth-${layer.label}`,
                        'type': 'fill',
                        'source': `timeSeries-${layer.label}`,
                        'minzoom': layer.minZoom,
                        'maxzoom': layer.maxZoom,
                        'paint': {
                            'fill-color': [
                                "step",
                                ['get', 'value'],
                                ...layer.buckets,
                            ],
                            'fill-opacity': 1,
                        }
                    }, layer.label);


                    map.on('click', `choropleth-${layer.label}`, function (e) {

                        setCurrentLocation(e.features[0].properties.code);
                        // setAreaType(layer.label);
                        setAreaType(layer.label);

                        const outlineId = map
                            .queryRenderedFeatures({ layers: [layer.label] })
                            .find(item => item.properties.code === e.features[0].properties.code)
                            .id;
                        console.log(outlineId);
                        // if ( e.features.length > 0 ) {
                        if ( hoveredStateId?.id ) {
                            map.setFeatureState(
                                { source: `geo-${ hoveredStateId.location }`, id: hoveredStateId.id },
                                { hover: false }
                            );
                        }

                        hoveredStateId = {
                            id: outlineId,
                            location: layer.label
                        };

                        map.setFeatureState(
                            { source: `geo-${ hoveredStateId.location }`, id: hoveredStateId.id },
                            { hover: true }
                        );

                        map.fitBounds(turf.bbox(e.features[0]), {
                            padding: 20,
                            maxZoom: map.getLayer(layer.label).maxzoom - 0.2
                        });

                    });

                });

                map.on('zoom', function() {

                    const zoomLevel = map.getZoom();

                    if ( zoomLevel < 7 ) {
                        setZoomLayerIndex(0);
                    }
                    else if ( zoomLevel >= 7 && zoomLevel < 8.5 ) {
                        setZoomLayerIndex(1);
                    }
                    else if ( zoomLevel >= 8.5 ) {
                        setZoomLayerIndex(2);
                    }

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

        if ( map && postcodeData ) {

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
        e.target.href =  map.getCanvas().toDataURL('image/png');
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
                    <label htmlFor={ "postcode" } className={ "govuk-visually-hidden" }>Search by postcode</label>
                    <input className={ "govuk-input govuk-input--width-10" }
                           name={ "postcode" }
                           maxLength={ 10 }
                           type={ "text" }
                           id={ "postcode" }
                           pattern={ "[A-Za-z]{1,2}\\d{1,2}[A-Za-z]?\\s?\\d{1,2}[A-Za-z]{1,2}" }
                           placeholder={ "Search by postcode" }/>
                    <label htmlFor={ "submit-postcode" } className={ "govuk-visually-hidden" }>Search by postcode</label>
                    <input name={ "submit-postcode" } className={ "govuk-button" } id={ "submit-postcode" } type={ "submit" } value={ "" }/>
                </PostcodeSearchForm>
                <LegendContainer>
                    <ScaleLegend>
                        <ScaleLegendLabel>{ MapLayers?.[zoomLayerIndex]?.name ?? "" } rate</ScaleLegendLabel>
                        <ScaleGroup>
                            <ScaleColor style={{ background: "#fff" }}/>
                            <ScaleValue>{
                                MapLayers[zoomLayerIndex].label === "msoa"
                                    ? <>Suppressed</>
                                    : "Missing data"
                            } </ScaleValue>
                        </ScaleGroup>
                        {

                            MapLayers[zoomLayerIndex].buckets.map( (item, index) => {
                                if ( index % 2 > 0 ) {
                                    return <ScaleGroup>
                                        <ScaleColor style={ { background: MapLayers[zoomLayerIndex].buckets?.[index - 1] ?? 0 } }/>
                                        <ScaleValue>
                                            {
                                                (MapLayers[zoomLayerIndex].label === "msoa" && index === 1)
                                                    ? 0
                                                    : MapLayers[zoomLayerIndex].buckets?.[index - 2] ?? 0
                                            }
                                            &nbsp;&ndash;&nbsp;
                                            { MapLayers[zoomLayerIndex].buckets?.[index] ?? "+" }
                                        </ScaleValue>
                                    </ScaleGroup>
                                }
                            })
                        }
                        <ScaleGroup>
                            <ScaleColor style={ { background: MapLayers[zoomLayerIndex].buckets.slice(-1) } }/>
                            <ScaleValue>
                                { MapLayers[zoomLayerIndex].buckets.slice(-2, -1) }&nbsp;+
                            </ScaleValue>
                        </ScaleGroup>
                    </ScaleLegend>
                </LegendContainer>
            </>

        }
        {
            areaType !== "msoa"
                ? <LocalAuthorityCard currentLocation={ currentLocation } areaType={ areaType }/>
                : <SoaCard currentLocation={ currentLocation } areaType={ areaType }/>
        }
        </MapContainer>
        <span style={{ textAlign: "right" }}>
            Download as <a onClick={ downloadImage }
                   className={ "govuk-link govuk-link--no-visited-state" }
                   download={ "map.png" } href={ "" }>image</a>.</span>
        </>

};  // Map


export default Map;
