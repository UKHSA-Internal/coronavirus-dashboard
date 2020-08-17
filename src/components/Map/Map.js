// @flow

import React, { useState, useEffect } from "react";
import ReactDomServer from "react-dom/server";

import { useHistory } from "react-router";
import 'mapbox-gl-leaflet';
import L from "leaflet";
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
import { MapContainer } from "./Map.styles";


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
        bounds = new L.LatLngBounds(new L.LatLng(52.5, -6.5), new L.LatLng(58.8, 1)),
        maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -8.5), new L.LatLng(61, 2)),
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


const Map: ComponentType<*> = ({ data, geoKey, isRate = true, date, minData, maxData, children, ...props }) => {

    const
        geoData = useGeoData("countries_v2.geojson", geoKey),
        { location: { hash } } = useHistory(),
        [ areaName, areaCode, Rate, Date ] = [0, 1, 2, 3],
        [mapControl, setMapControl] = useState(null);


    const
        { maxCircleRadius = 40, blobColour = "#367E93", zoom = { min: 1, max: 7 } } = props,
        parsedHash = utils.getParams(hash),
        rgb = utils.hexToRgb(blobColour),
        colour = isRate
            ? `rgba(${ rgb.r },${ rgb.g },${ rgb.b },.9)`
            : `rgba(${ rgb.r },${ rgb.g },${ rgb.b },1)`;

    // let map, layerGroup, centrePoint;

    // console.log(geoData)
    // console.log(shadeScale(data.filter(d => d[areaCode] === p.id)?.[0] ?? 0));

    useEffect(() => {
        if ( geoData )
            setMapControl(initialiseMap());
    }, [ geoData ]);

    useEffect(() => {

        // console.log(geoData);
        // const { map, layerGroup, centrePoint } = initialiseMap();
        // console.log(index)
        // console.log(data?.[index] ?? null)
        // console.log(map)
        if ( mapControl && data ) {
            const
                { map, layerGroup, centrePoint } = mapControl,
                areaCodeKey = `${ geoKey }cd`,
                maxValue = max(data, d => d[Rate]),
                // max(
                // data.values,
                // isRate ? (d => d.rateData.value) : (d => d.rawData.value)
                // ),
                radiusScale = scaleSqrt().range([0, maxCircleRadius]).domain([0, maxData]),
                shadeScale = scaleLinear().range([0, 1]).domain([minData, maxData]);

            layerGroup.clearLayers();

            const boundaryLayer = L.geoJSON(geoData, {
                style: ({ properties: p }) => ({
                    color: '#0b0c0c',
                    weight: isRate ? .2 : .6,
                    opacity: .7,
                    fillColor: colour,
                    fillOpacity: shadeScale(data.filter(d => d[areaCode] === p.id).pop()?.[Rate] ?? 0)
                    // fillOpacity: isRate
                    //     ? shadeScale(data.getByKey(p.id)?.rateData?.value ?? 0)
                    //     : (parsedHash?.area ?? -1) === p.id ? .2 : 0,
                }),
                // onEachFeature: (feature, layer) => {
                //     layer.on({
                //         click: () => {
                //             const
                //                 parent = document.getElementById(parsedHash.category),
                //                 id = utils.createHash({
                //                     category: parsedHash.category,
                //                     map: parsedHash.map,
                //                     area: feature.properties.id
                //                 }),
                //                 element = document.getElementById(id.substring(1));
                //
                //             if ( element && element.offsetParent )
                //                 parent.scrollTop = element.offsetParent.offsetTop - 80;
                //
                //             if ( element ) element.click();
                //
                //         },
                //     });
                // },
            });

            // if ( !isRate ) {
            //
            //     const
            //         blobOptions = getBlobOptions(data, geoData, areaCodeKey),
            //         blobs = L.geoJSON(blobOptions, {
            //                 pointToLayer:
            //                     (feature, latlng) => L.circleMarker(latlng, {
            //                         radius: feature.properties.count && radiusScale(feature.properties.count),
            //                         fillColor: blobColour,
            //                         fillOpacity: 0.4,
            //                         weight: 0,
            //                     }),
            //             }
            //         );
            //
            //     layerGroup.addLayer(blobs)
            //
            // }

            layerGroup.addLayer(boundaryLayer);

            if ( parsedHash.hasOwnProperty("area") ) {

                const
                    flyCoords = geoData
                        .filter(({ properties: { [areaCodeKey]: key = "" } }) =>
                            utils.prepAsKey(key) === parsedHash.area
                        )
                        .pop();

                try {
                    map.flyTo(
                        [flyCoords.properties.lat, flyCoords.properties.long],
                        zoom.max,
                        { animate: false }
                    );
                } catch (e) {
                    console.warn(`No "${ parsedHash.category }" with code "#${ parsedHash.area }".`)
                }

            } else {

                map.flyTo(centrePoint, 5.4, { animate: false })

            }
        }

    }, [ geoData, date, mapControl, data ]);

    // if ( !(map && layerGroup && data && geoData) )
    //     return <Loading/>;


    return <MapContainer id={ "map" }>{ children }</MapContainer>

};  // Map


export default Map;
