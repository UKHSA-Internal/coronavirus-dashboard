import React, { Component, Fragment } from 'react';
import ReactDomServer from 'react-dom/server'

import axios from "axios";
import 'mapbox-gl-leaflet';
import L from "leaflet";
import { max } from "d3-array";
import { scaleLinear, scaleSqrt } from "d3-scale";

import URLs from "common/urls";

import 'leaflet/dist/leaflet.css';
import * as Styles from "./MapTable.styles";

import * as utils from "./utils";
import { OverrideCoordinates } from "./constants";

import type {
    MapState,
    MapProps
} from "MapTable.types"


const getBlobOptions =  (data, geoData, areaCodeKey) => {

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


const OpenStreetMapAttrib = () => {

    return <a
        href={ "http://www.openstreetmap.org/about/" }
        target={ "_blank" }
        rel={ "noopener noreferrer" }
    >
        &copy; OpenStreetMap contributors
    </a>

}; // OpenStreetMapAttrib


export class Map extends Component<MapProps, {}> {

    #baseUrl = URLs.baseGeo;
    #mapStyleUrl = URLs.mapStyle;
    #areaCodeSuffix = "cd";

    state: MapState = {

        layerGroup: null,
        map: null,
        // canvas: null,
        loading: true,
        geoData: null,
        glStatus: utils.glAvailable(),
        centrePoint: null

    }; // state

    initializeMap = () => {

        const
            mapbox = L.mapboxGL({
                attribution: ReactDomServer.renderToStaticMarkup(<OpenStreetMapAttrib/>),
                style: this.#mapStyleUrl
            }),
            bounds = new L.LatLngBounds(new L.LatLng(52.5, -6.5), new L.LatLng(58.8, 1)),
            maxBounds = new L.LatLngBounds(new L.LatLng(49.8, -8.5), new L.LatLng(61, 2)),
            centrePoint =  bounds.getCenter(),
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
                'Map showing number of COVID-19 cases by nation, region, or local authority in the UK'
            );

        map.zoomControl.setPosition('bottomright');

        return {
            map: map,
            layerGroup: L.layerGroup().addTo(map),
            canvas: canvas,
            centrePoint: centrePoint
        }

    }; // initializeMap

    getGeoData = async () => {

        const
            { geo, geoKey, geoDataSetter, geoData } = this.props,
            areaCodeKey = `${geoKey}${this.#areaCodeSuffix}`,
            getLatLong = ( key, { lat, long } ) =>
                OverrideCoordinates?.[key] ?? { lat: lat, long: long };

        let data = geoData;

        if ( !geoData ) {
            const response = await axios.get(geo, { baseURL: this.#baseUrl });

            data = response.data.features.map(f => ({
                ...f,
                properties: {
                    ...f.properties,
                    ...getLatLong(f.properties?.[areaCodeKey] ?? {}, f.properties),
                    id: f.properties?.[areaCodeKey] ?? "",
                },
            }));

        }

        this.setState({
            geoData: data,
            loading: false
        }, () => geoDataSetter(data) )

    }; // getGeoData

    componentDidUpdate(prevProps: Readonly<MapProps>, prevState: Readonly<MapState>, snapshot: any): void {

        const currentProps = this.props;

        if ( prevProps.geoKey !== currentProps.geoKey && !currentProps.geoData) {
            this.setState({
                    loading: true,
                    ...prevState.glStatus && !prevState.map
                        ? this.initializeMap()
                        : {}
                },
                this.getGeoData
            );

        } else if ( prevProps.geoKey !== currentProps.geoKey && currentProps.geoData) {
            this.setState((pState, props) => ({ geoData: props.geoData }))
        }

    } // componentDidUpdate

    componentDidMount(): void {

        this.setState(prevState => ({
                loading: true,
                ...prevState.glStatus && !prevState.map
                    ? this.initializeMap()
                    : {}
            }),
            this.getGeoData
        );

    } // componentDidMount

    display() {

        const { loading, glStatus } = this.state;

        if ( loading ) return <Styles.P>Loading...</Styles.P>

        if ( !glStatus )
            return  <Styles.P>
                Your browser does not support WebGL or it has been disabled.
                You must install WebGL and ensure that it is enabled
                in the browser to see the map.
            </Styles.P>

        return null

    } // display

    render(): React.ReactNode {

        const
            { hash, maxCircleRadius, blobColour, geoKey, zoom, data, isRate, children } = this.props,
            { geoData, loading, map, layerGroup, glStatus, centrePoint } = this.state,
            parsedHash = utils.getParams(hash),
            rgb = utils.hexToRgb(blobColour),
            colour = isRate
                ? `rgba(${rgb.r},${rgb.g},${rgb.b},.9)`
                : `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;

        if ( data && !loading && map && layerGroup && glStatus ) {

            const
                areaCodeKey = `${geoKey}${this.#areaCodeSuffix}`,
                maxValue = max(
                    data.values,
                    isRate ? (d => d.rateData.value) : (d => d.rawData.value)
                ),
                radiusScale = scaleSqrt().range([0, maxCircleRadius]).domain([0, maxValue]),
                shadeScale = scaleLinear().range([0, 1]).domain([0, maxValue]);

            layerGroup.clearLayers();

            const boundaryLayer = L.geoJSON(geoData, {
                style: ({ properties: p }) => ({
                    color: '#0b0c0c',
                    weight: isRate ? .2 : .6,
                    opacity: .7,
                    fillColor: colour,
                    fillOpacity: isRate
                        ? shadeScale(data.getByKey(p.id)?.rateData?.value ?? 0)
                        : (parsedHash?.area ?? -1) === p.id ? .2 : 0,
                }),
                onEachFeature: (feature, layer) => {
                    layer.on({
                        click: () => {
                            const
                                parent = document.getElementById(parsedHash.category),
                                id = utils.createHash({
                                    category: parsedHash.category,
                                    map: parsedHash.map,
                                    area: feature.properties.id
                                }),
                                element = document.getElementById(id.substring(1));

                            if (element && element.offsetParent)
                                parent.scrollTop = element.offsetParent.offsetTop - 80;

                            if (element) element.click();

                        },
                    });
                },
            });

            if (!isRate) {
                const
                    blobOptions = getBlobOptions(data, geoData, areaCodeKey),
                    blobs = L.geoJSON(blobOptions, {
                        pointToLayer:
                            (feature, latlng) => L.circleMarker(latlng, {
                                radius: feature.properties.count && radiusScale(feature.properties.count),
                                fillColor: blobColour,
                                fillOpacity: 0.4,
                                weight: 0,
                            }),
                    }
                );

                layerGroup.addLayer(blobs)
            }

            layerGroup.addLayer(boundaryLayer)

            if ( parsedHash.hasOwnProperty("area") ) {

                const
                    flyCoords = geoData
                        .filter(({ properties: { [areaCodeKey]: key = "" }}) =>
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
                    console.warn(`No "${parsedHash.category}" with code "#${parsedHash.area}".`)
                }

            } else {

                map.flyTo(centrePoint, 5.4, { animate: false })

            }

        }

        return <Fragment>
            { this.display() }
            <Styles.Map id={ "map" }>{ children }</Styles.Map>
        </Fragment>


    } // render

} // Map
