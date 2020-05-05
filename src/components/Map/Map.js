/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import L from 'leaflet';

import ErrorBoundary from 'components/ErrorBoundary';

import useCountryLayer from './countryLayer';
import useRegionLayer from './regionLayer';
import useUtlaLayer from './utlaLayer';
import zoomLayers from './zoomLayers';

import 'mapbox-gl-leaflet';

import * as Styles from './Map.styles';

import 'leaflet/dist/leaflet.css';

const countryCoordinates = {
    // England
    E92000001: [52.3555, -1.1743],
    // Scotland
    S92000003: [56.4907, -4.2026],
    // Wales
    W92000004: [52.1307, -3.7837],
    // NI
    N92000002: [54.7877, -6.4923],
};

const regionCoordinates = {
    // West midlands
    E12000005: [52.556969, -2.20358],
    // East of england
    E12000006: [52.24073, 0.504207],
    // North west
    E12000002: [54.44944, -2.77239],
    // East midlands
    E12000004: [52.795719, -0.84969],
    // South west
    E12000009: [50.811192, -3.63346],
    // London
    E12000007: [51.492271, -0.30866],
    // Yorkshire and the humber
    E12000003: [53.93264, -1.28714],
    // North east
    E12000001: [55.297009, -1.72888],
    // South east
    E12000008: [51.45097, -0.99311],
};

function glAvailable() {
    if ( !window.WebGLRenderingContext )
        return false; // WebGL is not supported

    // WebGL is supported
    const
        canvas = document.createElement("canvas"),
        drivers = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    let context = false;

    for ( const driverName of drivers ) {
        try {

            context = canvas.getContext(driverName);

            if ( context && typeof context.getParameter == "function" )
                return true;  // WebGL is enabled

        } catch (e) {
        }
    }

    return false;  // WebGL is disabled

}

const Map: ComponentType<Props> = ({
                                       country,
                                       setCountry,
                                       countryData,
                                       region,
                                       setRegion,
                                       regionData,
                                       utla,
                                       setUtla,
                                       utlaData,
                                       location: { hash },
                                   }: Props) => {
    const [map, setMap] = useState(null);
    const [utlaCoordinates, setUtlaCoordinates] = useState({});
    const [layerGroup, setLayerGroup] = useState(null);

    // Initialise map
    useEffect(() => {
        const initializeMap = () => {
            const mapbox = L.mapboxGL({
                attribution: '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>',
                style: 'https://c19tile.azureedge.net/style.json'
            });
            const map = L.map('map', {
                center: [55.7, -3.7],
                zoom: 5.4,
                minZoom: 5.4,
                maxZoom: 12,
                layers: [
                    mapbox
                ]
            });
            const canvas = mapbox.getCanvas();
            if (canvas) {
                canvas.setAttribute('aria-label', 'Map showing number of COVID-19 cases by nation, region, or local authority in the UK');
            }

            map.zoomControl.setPosition('bottomright');

            setLayerGroup(L.layerGroup().addTo(map));

            setMap(map);
        };

        if ( !map && glAvailable() ) {
            initializeMap();
        }
    }, []);

    // Setup layers, updating layers is handled within the hooks
    useCountryLayer(countryData, hash, layerGroup, country, region, utla, id => {
        setCountry(id);
        setRegion(null);
        setUtla(null);
    });
    useRegionLayer(regionData, hash, layerGroup, country, region, utla, id => {
        setCountry(null);
        setRegion(id);
        setUtla(null);
    });
    useUtlaLayer(utlaData, hash, layerGroup, country, region, utla, id => {
        setCountry(null);
        setRegion(null);
        setUtla(id);
    });

    // Load utla coordinates
    useEffect(() => {
        (async () => {
            const { data } = await axios.get('https://c19pub.azureedge.net/utlas.geojson');
            const c = data.features.reduce((acc, cur) => {
                return {
                    ...acc,
                    [cur.properties.ctyua19cd]: {
                        long: cur.properties.long,
                        lat: cur.properties.lat,
                    },
                };
            }, {});
            setUtlaCoordinates(c);
        })();
    }, []);

    // Fly to area when selected area changes
    useEffect(() => {
        if ( map ) {
            if ( country ) {
                map.flyTo(countryCoordinates[country], zoomLayers.country.max - 1, { animate: false });
            }
            if ( region ) {
                map.flyTo(regionCoordinates[region], zoomLayers.region.min, { animate: false });
            }
            if ( utla ) {
                const la = utlaCoordinates[utla];
                if ( la ) {
                    map.flyTo([la.lat, la.long], zoomLayers.utla.min + 2, { animate: false });
                }
            }
        }
    }, [country, region, utla]);

    if ( !glAvailable() ) {
        return <Styles.Map>
            <Styles.Container>
                <Styles.P>
                    Your browser does not support WebGL or it has been disabled.
                    You must install WebGL and ensure that it is enabled
                    in the browser to see the map.
                </Styles.P>
            </Styles.Container>
        </Styles.Map>
    }

    return (
        <ErrorBoundary>
            <Styles.Map id="map"/>
        </ErrorBoundary>
    );
};

export default withRouter(Map);
