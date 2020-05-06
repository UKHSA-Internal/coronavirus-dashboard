import React, { Fragment } from "react";

import numeral from "numeral";

import type { MainContentType } from "./MapTable.types";


export const RatePerPopulation = 100000;


export const Content: MainContentType = [
    {
        headings: [
            {
                label: 'Nation',
                format: 'string', getter: ({ name }) => name,
                keyGetter: ({ key }) => key.replace('#', '')
            },
            {
                label: <Fragment>Total&nbsp;cases</Fragment>,
                format: 'numeric',
                getter: item => numeral(item.rawData.value).format("0,0")
            },
            {
                label: 'Rate',
                format: 'numeric',
                getter: (item) => numeral(item.rateData.value).format("0,0.0")
            }
        ],
        label: "Nations",
        textLabel: "nations",
        url: "countries_latest.json",
        geo: "countries_v1.geojson",
        geoKey: "ctry19",
        maxCircleRadius: 40,
        blobColour: "#367E93",
        zoom: {
            min: 1, // Default min
            max: 7,
        }
    },
    {
        headings: [
            {
                label: 'Region',
                format: 'string',
                getter: ({ name }) => name,
                keyGetter: ({ key }) => key.replace('#', '')
            },
            {
                label: <Fragment>Total&nbsp;cases</Fragment>,
                format: 'numeric',
                getter: item => numeral(item.rawData.value).format("0,0")
            },
            {
                label: 'Rate',
                format: 'numeric',
                getter: (item) => numeral(item.rateData.value).format("0,0.0")
            }
        ],
        sortFunc: '',
        label: "Regions",
        textLabel: "regions",
        url: "regions_latest.json",
        geo: "regions_v1.geojson",
        geoKey: "rgn18",
        maxCircleRadius: 30,
        blobColour: "#367E93",
        zoom: {
            min: 6, // Default min
            max: 8,
        }
    },
    {
        headings: [
            {
                label: "Upper tier local authority",
                format: 'string', getter: ({ name }) => name,
                keyGetter: ({ key }) => key.replace('#', '')
            },
            {
                label: <Fragment>Total&nbsp;cases</Fragment>,
                format: 'numeric',
                getter: item => numeral(item.rawData.value).format("0,0")
            },
            {
                label: 'Rate',
                format: 'numeric',
                getter: (item) => numeral(item.rateData.value).format("0,0.0")
            }
        ],
        sortFunc: '',
        label: 'UTLA',
        textLabel: "utlas",
        url: "utlas_latest.json",
        geo: "utlas_v1.geojson",
        geoKey: "ctyua19",
        maxCircleRadius: 18,
        blobColour: "#367E93",
        zoom: {
            min: 10, // Default min
            max: 22,
        }
    },
    {
        headings: [
            {
                label: "Lower tier local authority",
                format: 'string',
                getter: ({ name }) => name,
                keyGetter: ({ key }) => key.replace('#', '')
            },
            {
                label: <Fragment>Total&nbsp;cases</Fragment>,
                format: 'numeric',
                getter: item => numeral(item.rawData.value).format("0,0")
            },
            {
                label: 'Rate',
                format: 'numeric',
                getter: (item) => numeral(item.rateData.value).format("0,0.0")
            }
        ],
        sortFunc: '',
        label: 'LTLA',
        textLabel: "ltlas",
        url: "ltlas_latest.json",
        geo: 'ltlas_v1.geojson',
        geoKey: "lad19",
        maxCircleRadius: 15,
        blobColour: "#367E93",
        zoom: {
            min: 10, // Default min
            max: 26,
        }
    }
]; // Content


// Some of the central coordinates are not correctly positioned in the
// GeoJSON data. In such cases, this object is used to override them.
export const OverrideCoordinates = {
    // England
    E92000001: {lat: 52.3555, long: -1.1743},
    // Scotland
    S92000003: {lat: 56.4907, long: -4.2026},
    // Wales
    W92000004: {lat: 52.1307, long: -3.7837},
    // NI
    N92000002: {lat: 54.7877, long: -6.4923},
    // West midlands
    E12000005: {lat: 52.556969, long: -2.20358},
    // East of england
    E12000006: {lat: 52.24073, long: 0.504207},
    // North west
    E12000002: {lat: 54.44944, long: -2.77239},
    // East midlands
    E12000004: {lat: 52.795719, long: -0.84969},
    // South west
    E12000009: {lat: 50.811192, long: -3.63346},
    // London
    E12000007: {lat: 51.492271, long: -0.30866},
    // Yorkshire and the humber
    E12000003: {lat: 53.93264, long: -1.28714},
    // North east
    E12000001: {lat: 55.297009, long: -1.72888},
    // South east
    E12000008: {lat: 51.45097, long: -0.99311},
};
