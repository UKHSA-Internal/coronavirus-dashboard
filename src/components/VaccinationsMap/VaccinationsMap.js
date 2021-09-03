// @flow

import React, { useEffect, useState, useMemo } from "react";
import L from "leaflet";
import mapboxgl from "mapbox-gl";
import URLs from "common/urls";

import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    MapContainer, PostcodeSearchForm,
    ZoomButton, ZoomControlContainer
} from "./VaccinationsMap.styles";
import { Legend } from "./Legend";
import bbox from "@turf/bbox";
import axios from "axios";
import MapMarker from "assets/icon-mapmarker.svg";
import useTimestamp from "hooks/useTimestamp";
import usePrevious from "hooks/usePrevious";
import { MapComponent } from "./MapComponent";
import type { ComponentType } from "react";
import * as constants from "./constants";
import deepEqual from "deep-equal";
import useGenericAPI from "hooks/useGenericAPI";
import { DateStamp } from "./InfoCard/DateStamp";
import InfoCard from "./InfoCard";
import { MapLayers } from "./constants";



const Map: ComponentType<*> = ({ width, ...props }) => {

    const
        bounds = new L.LatLngBounds(new L.LatLng(50.5, -14.5), new L.LatLng(58.8, 10)),
        centrePoint = bounds.getCenter(),
        [map, setMap] = useState([]),
        [styleDataStatus, setStyleDataStatus] = useState(false),
        [showInfo, setShowInfo] = useState(false),
        [postcodeData, setPostcodeData] = useState(null),
        [currentLocation, setCurrentLocation] = useState({ currentLocation: null, areaType: "utla" }),
        [zoomLayerIndex, setZoomLayerIndex] = useState(0),
        prevAreaType = usePrevious(currentLocation.areaType),
        rawTimestamp = useTimestamp(),
        geoData = useGenericAPI("mapVaccinationData", null),
        [ hoverState, setHoverSate ] = useState({}),
        prevHoverState = usePrevious(hoverState),
        [ mapHasLoaded, setMapHasLoaded ] = useState([false, false]);

    let timestamp;

    useEffect(() => {
        timestamp = rawTimestamp.split("T")[0];
    }, [rawTimestamp]);

    useEffect(() => {
        if ( !map.length && geoData ) {
            const mapInstances = [
                new mapboxgl.Map({
                    container: 'first',
                    style: URLs.mapStyle,
                    center: centrePoint,
                    zoom: 4.9,
                    minZoom: 4.9,
                    maxZoom: 15,
                    preserveDrawingBuffer: true,
                }),
                new mapboxgl.Map({
                    container: 'second',
                    style: URLs.mapStyle,
                    center: centrePoint,
                    zoom: 4.9,
                    minZoom: 4.9,
                    maxZoom: 15,
                    preserveDrawingBuffer: true,
                })
           ];

            setMap(mapInstances);

        }
    }, [ geoData ]);

    useMemo(() => {

        const conditions = [
            map.length,
            !styleDataStatus,
            geoData
        ];

        if ( conditions.every(item => item) ) {

            for ( let mapIndex = 0; mapIndex < map.length; mapIndex++ ) {

                const mapInstance = map[mapIndex];
                const otherMap = (mapIndex === 0 ? map[1] : map[0]);
                // mapInstance.fitBounds([50.5, -14.5, 58.8, 10], {}, {source: 'fitBounds'})

                mapInstance.once("style.load", function () {

                    mapInstance.addSource(`timeSeries`, {
                        type: 'geojson',
                        data: geoData
                    });

                    for ( const layer of MapLayers ) {
                        mapInstance.addSource(`geo-${ layer.label }`, {
                            type: 'geojson',
                            data: URLs[layer.outline],
                            buffer: layer.buffer,
                            tolerance: layer.tolerance,
                            maxzoom: layer.maxZoom
                        });

                        mapInstance.addLayer({
                            'id': layer.label,
                            'type': 'line',
                            'source': `geo-${ layer.label }`,
                            'minzoom': layer.minZoom,
                            'maxzoom': layer.maxZoom,
                            'layout': {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            'paint': {
                                'line-color': '#000000',
                                'line-width': [
                                    'case',
                                    ['boolean', ['feature-state', 'hover'], false],
                                    3,
                                    .1
                                ]
                            }
                        }, layer.foreground);

                        mapInstance.addLayer({
                            'id': `choropleth-${ layer.label }`,
                            'type': 'fill',
                            "fill-antialias": true,
                            'source': `timeSeries`,
                            'minzoom': layer.minZoom,
                            'maxzoom': layer.maxZoom,
                            'paint': {
                                'fill-color': [
                                    "step",
                                    ['get', mapIndex === 0 ? 'f' : 'c'],
                                    ...(
                                        mapIndex === 0
                                            ? constants.bucketsFirst
                                            : constants.bucketsSecond
                                    )
                                ],
                                'fill-opacity': 1,
                            },
                            'filter': ['==', 'at', layer.label]
                        }, layer.label);

                        mapInstance.addLayer({
                            'id': `${ layer.label }-click`,
                            'type': 'fill',
                            'source': `geo-${ layer.label }`,
                            'minzoom': layer.minZoom,
                            'maxzoom': layer.maxZoom,
                            'paint': {
                                'fill-color': "#ffffff",
                                'fill-opacity': .001
                            },
                        }, `choropleth-${ layer.label }`);

                        mapInstance.on('click', `${ layer.label }-click`, function (e) {

                            const outlineId = mapInstance
                                .queryRenderedFeatures({ layers: [layer.label] })
                                .find(item => item.properties.code === e.features[0].properties.code)
                                .id;

                            const newState = {
                                id: outlineId,
                                location: layer.label,
                                features: e.features[0],
                                layer: layer.label,
                                mapInstanceIndex: mapIndex
                            };

                            if ( !deepEqual(prevHoverState, newState) ) setHoverSate(newState);

                        });

                    }

                    mapInstance.on('move', () => {
                        const centre = mapInstance.getCenter();
                        const otherCentre = otherMap.getCenter();

                        if ( !deepEqual(centre, otherCentre) ) {
                            otherMap.setCenter(centre);
                        }
                    });

                    mapInstance.on('zoom', () => {

                        const zoomLevel = mapInstance.getZoom();
                        const otherZoomLevel = otherMap.getZoom();

                        if ( !deepEqual(zoomLevel, otherZoomLevel) ) {
                            otherMap.setZoom(zoomLevel);
                        }

                        if ( zoomLevel < 7 ) {
                            setZoomLayerIndex(0);
                        } else if ( zoomLevel >= 7 && zoomLevel < 8.5 ) {
                            setZoomLayerIndex(1);
                        } else if ( zoomLevel >= 8.5 ) {
                            setZoomLayerIndex(2);
                        }

                    });

                    mapInstance.on('styledata', function (e) {
                        setStyleDataStatus(true)
                    });

                    // disable map rotation using right click + drag
                    mapInstance.dragRotate.disable();

                    // disable map rotation using touch rotation gesture
                    mapInstance.touchZoomRotate.disableRotation();
                    mapInstance.touchZoomRotate.disableRotation();

                    setMapHasLoaded(prev => {
                        prev[mapIndex] = true;
                        return prev
                    });

                });
            }
        }
    }, [ map.length ]);

    useEffect(() => {

        if ( !map || !mapHasLoaded.every(v => v) || !hoverState?.id ) return;

        // The following iterations must be defined separately
        // so that the two maps change state simultaneously.
        // If combined, one moves before the other.
        for ( const mapInstance of map ) {
            if ( prevHoverState?.id ) {
                mapInstance.setFeatureState(
                    { source: `geo-${ prevHoverState.location }`, id: prevHoverState.id },
                    { hover: false }
                );
            }
        }

        for ( const mapInstance of map ) {
            mapInstance.setFeatureState(
                { source: `geo-${ hoverState.location }`, id: hoverState.id },
                { hover: true }
            );

            mapInstance.fitBounds(bbox(hoverState.features), {
                padding: 20,
                maxZoom: Math.max(
                    mapInstance.getLayer(hoverState.layer).minzoom + 0.5,
                    mapInstance.getZoom()
                )
            });

        }

        setCurrentLocation(prev => ({
            ...prev,
            currentLocation: hoverState.features.properties.code
        }));

        setShowInfo(true);

    }, [ map, hoverState.id, hoverState.layer, prevHoverState, mapHasLoaded ]);


    useEffect(() => {

        if ( map.length && postcodeData ) {

            setShowInfo(true);

            for ( let ind = 0; ind < map.length; ind ++ ) {

                const mapInstance = map[ind];

                const el = document.createElement("div");
                el.className = "marker";
                el.style.backgroundImage = `url(${MapMarker})`;
                el.style.backgroundRepeat = "no-repeat";
                el.style.backgroundSize = "100% 100%";
                el.style.width = "70px";
                el.style.height = "70px";

                new mapboxgl.Marker(el, {anchor: "bottom"})
                    .setLngLat(postcodeData.geometry.coordinates)
                    .addTo(mapInstance);

                if ( ind === 1 ) {
                    mapInstance.setZoom(12.5);
                }

                mapInstance.setCenter([
                    postcodeData.geometry.coordinates[0],
                    postcodeData.geometry.coordinates[1]
                ]);
            }
        }

    }, [postcodeData, map]);

    useEffect(() => {

        if ( currentLocation?.areaType === "msoa" ) {

            setCurrentLocation(prev => ({
                ...prev,
                currentLocation: postcodeData?.msoa
            }))

        }

    }, [ postcodeData, currentLocation?.areaType ]);

    useEffect(() => {
        setCurrentLocation(prev => ({
            ...prev,
            areaType: constants.MapLayers[zoomLayerIndex].label
        }));
    }, [ zoomLayerIndex, currentLocation.currentLocation ]);

    const zoomIn = () => {
        map[0].setZoom(map[0].getZoom() + 1);
    };

    const zoomOut = () => {
        map[0].setZoom(map[0].getZoom() - 1);
    };

    return <>
        <p id={ "month" } className={ "govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-3" }>
            Percentage of people aged 16+ vaccinated up to and including <DateStamp/>:
        </p>
        <MapContainer>
            <MapComponent/>
                <PostcodeSearchForm onSubmit={  (e) => {
                        e.preventDefault();
                        const postcode: string = document.getElementById("postcode").value;
                        (async () => {
                            const { data } = await axios.get(URLs.postcode, {
                                params: {
                                    category: "postcode",
                                    search: postcode.replace(/\s/, "").toUpperCase().trim()
                                }
                            });
                            setPostcodeData(data)
                        })();
                    } }>
                    <label htmlFor={ "postcode" }
                           className={ "govuk-visually-hidden" }>
                        Search by postcode
                    </label>
                    <input className={ "govuk-input govuk-input--width-6" }
                           name={ "postcode" }
                           maxLength={ 10 }
                           type={ "text" }
                           id={ "postcode" }
                           pattern={ "[A-Za-z]{1,2}\\d{1,2}[A-Za-z]?\\s?\\d{1,2}[A-Za-z]{1,2}\\s{0,2}" }
                           placeholder={ "Postcode" }/>
                    <label htmlFor={ "submit-postcode" }
                           className={ "govuk-visually-hidden" }>
                        Search by postcode
                    </label>
                    <input name={ "submit-postcode" }
                           className={ "govuk-button" }
                           id={ "submit-postcode" }
                           type={ "submit" }
                           value={ "" }/>
                </PostcodeSearchForm>
                <ZoomControlContainer>
                    <ZoomButton onClick={ zoomIn }>+<span className={"govuk-visually-hidden" }>Zoom in</span></ZoomButton>
                    <ZoomButton onClick={ zoomOut }>&ndash;<span className={"govuk-visually-hidden" }>Zoom out</span></ZoomButton>
                </ZoomControlContainer>
                <Legend/>
            {
                (currentLocation.areaType !== prevAreaType || !showInfo)
                    ? null
                    : <InfoCard data={ geoData } { ...currentLocation } setShowInfo={ setShowInfo }/>
            }
            </MapContainer>
    </>;

};  // Map


export default Map;
