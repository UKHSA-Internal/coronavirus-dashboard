// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";
import cloneDeep from "lodash.clonedeep";


const asCssRgb = ( hex ) => {

    const { r, g, b } = hexToRgb(hex);

    return `rgb(${r},${g},${b})`

};  // asCssRgb

export const
    colours = [
        '#5694CA',  // Base blue
        '#ABCBE5',  // Base blue tint 1
        '#DEEAF4',  // Base blue tint 2
        '#003078',  // Dark blue
        '#8098BC',  // Dark blue tint 1
        '#CCD6E4',  // Dark blue tint 2
        '#B1B4B6',  // Grey
        '#D8DADB',  // Grey tint 1
        '#EFF0F0',  // Grey tint 2
        '#FFDD00',  // Yellow
        '#d4351c',  // Red
        // New colours
        // '#206BC9',  // blue
        // '#90C1FE',  // blue (tint 3)
        // '#4691EC',  // blue (tint 2)
        // '#002A7F',  // dark blue
        // '#134D96',  // blue (tint 1)
        // '#000C24',  // dark blue (tint1)
        // '#8B8E92',  // grey
        // '#4065B0',  // dark blue (tint2)
        // '#84A3E4',  // dark blue (tint3)
        // '#E0E543',  // yellow
        // '#40A080',  // teal
        // '#6B7276',  // grey (tint1)
        // '#B9BCBD',  // grey (tint2)
        // '#E0E1E2',  // grey (tint3)
        // '#DB4325',  // red
        // '#00703C'   // green
];


export const scaleColours = [
    "#e0e543",
    "#74bb68",
    "#399384",
    "#2067AB",
    "#12407F",
    "#53084A",
    "#2B0226"
];


const processArrayField = ({ field, rawData, xKey }) => {

    const filterKey = field?.filters?.parameter;
    const filterPassValue = field?.filters?.value;
    const baseValue = field?.value;
    const outputMetric = field?.metric;

    if ( !Array.isArray(rawData) ) return [];

    return rawData
        ?.filter(row => (row?.[baseValue]?.length ?? 0) > 0)
        ?.map(row => ({
                [xKey]: row?.[xKey],
                [baseValue]: row?.[baseValue]
                    ?.filter(nestedRow => nestedRow?.[filterKey] === filterPassValue)
            })
        )
        ?.reduce((acc, row) =>
            [
                ...acc,
                {
                    [baseValue]: row?.[baseValue]?.[0]?.[outputMetric] ?? null,
                    [xKey]: row?.[xKey]
                }
            ],
            []
        )
        ?? []

};  // processArrayField


const processHighlightedField = ({ field, index, xData, yData }) => {

    let {
        from: hlFrom = NaN,
        to: hlTo = NaN,
        colour: hlColour = index,
        label: hlLabel = field.label
    } = field?.highlight ?? {};

    hlFrom = hlFrom < 0 ? yData.length + hlFrom : hlFrom;
    hlTo = hlTo < 0
        ? yData.length - hlTo
        : hlTo === 0 ? yData.length : hlTo;

    let highlightedY = [...yData].reverse().slice(hlFrom, hlTo);
    let highlightedX = [...xData].reverse().slice(hlFrom, hlTo);

    const highlightedSection = {
        name: hlLabel,
        x: highlightedX,
        y: highlightedY,
        hovertemplate: "%{y}",
        type: field?.type ?? "bar",
        marker: {
            color: colours[hlColour]
        }
    };

    yData = yData.reverse().filter((val, ind) => ind < hlFrom || ind >= hlTo);
    xData = xData.reverse().filter((val, ind) => ind < hlFrom || ind >= hlTo);

    return {
        xData,
        yData,
        highlightedSection
    }

};  // processHighlightedField


const processGenericField = ({ field, index, xData, yData }) => {

    const baseColour = colours[field?.colour ?? index];
    const { r, g, b } = hexToRgb(colours[field?.colour ?? index]);

    // `hl` represents the `highlight` field.
    let plotFeatures;

    switch ( field.type ) {
        case "bar":
            plotFeatures = {
                type: field.type,
                marker: {
                    color: baseColour
                }
            }
            break;

        case "line":
            plotFeatures = {
                type: field.type,
                mode: 'lines',
                ...(field?.fill ?? true)
                    ? {
                        fill: 'tozeroy',
                        fillcolor: `rgba(${ r },${ g },${ b },${ field?.solidFill ? 1 : 0.1})`
                    }:
                    {},
                line: {
                    width: 3,
                    color: colours[field?.colour ?? index]
                }
            };
            break;

    }

    const trimLength = (field?.rollingAverage?.clipEnd ?? 0) + 3;

    yData = (field.rollingAverage && (typeof field.rollingAverage === 'object'))
        ? [
            ...new Array(trimLength).fill(null),
            ...movingAverage(yData, field?.rollingAverage?.window ?? 7)
                .slice(trimLength, yData.length),
        ]
        : field.rollingAverage === true
            ? movingAverage(yData, 7)
            : yData

    return {
        name: field.label,
        x: xData,
        y: yData,
        hovertemplate: "%{y}",
        ...(field?.overlaying)
            ? {
                yaxis: "y2",
                overlaying: field.overlaying,
                side: field.side,
            }
            : {},
        ...plotFeatures
    }

};  // processGenericField


export const getPlotData = ( fields: Array<{}>, rawData, xKey="date" ) => {

    const graphObjects = [];

    for ( let index = 0; index < fields.length; index ++ ) {

        const field = fields[index];

        let xData, yData, data;

        if ( field?.isArray ) {
            data = processArrayField({ field, rawData, xKey })
        }

        data = dropLeadingZeros(data || rawData, field.value);
        xData = data?.map(item => item?.[xKey] ?? null) ?? [];
        yData = data?.map(variable => variable?.[field.value] ?? null) ?? [];

        if ( field?.highlight ) {
            const highlightedData = processHighlightedField({ field, index, xData, yData });
            xData = highlightedData.xData;
            yData = highlightedData.yData;
            graphObjects.push(highlightedData.highlightedSection);
        }

        graphObjects.push(processGenericField({ field, index, xData, yData }));

    }

    return graphObjects

};  // getPlotData


export const getTwoWayLollipopData = ( fields: Array<{}>, rawData, xKey="date",
                                       markerColour: number, lineColour: number ) => {

    const data = [];

    for ( const { value, label } of fields ) {
        const trace = {
            name: label,
            x: [],
            y: [],
            mode: 'markers',
            type: "scatter",
            showlegend: false,
            marker: {
                color: asCssRgb(colours[markerColour]),
                size: 12
            },
        }

        for ( const row of rawData ) {
            trace.x.push(row?.[xKey] ?? null);
            trace.y.push(row?.[value] ?? null);
        }

        data.push(trace);
    }

    for ( const row of rawData ) {
        const trace = {
            x: [],
            y: [],
            type: "scatter",
            showlegend: false,
            hoverinfo: 'skip',
            line: {color: asCssRgb(colours[lineColour]), width: 1},
        };

        for ( const { value } of fields ) {
            trace.x.push(row?.[xKey] ?? null)
            trace.y.push(row?.[value] ?? null);
        }

        data.push(trace);
    }

    return data;

};  // twoWayLollipopData


export const getPercentageWaffleData = ( fields: Array<{}>, rawData, xKey="date" ) => {

    const BaseArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const yGridTicks = BaseArray.map((_, ind) => ind + 1);
    const xGridTicks = BaseArray[0].map((_, ind) => ind + 1);

    const genericSettings = {
        type: "heatmap",
        showscale: false,
        hoverongaps: false,
        ygap: 3,
        xgap: 3,
        hoverinfo: 'skip',
        x: xGridTicks,
        y: yGridTicks,
    };

    let responseData = [
        {
            ...genericSettings,
            z: BaseArray,
            showlegend: false,
            colorscale: [[0, asCssRgb('#e7e7e7')], [1, asCssRgb('#e7e7e7')]],
        }
    ];

    const fieldsLength = fields.length;

    for ( let fieldIndex = 0; fieldIndex < fieldsLength; fieldIndex ++ ) {

        const field = fields?.[fieldIndex];
        const value = field?.value;
        const label = field?.label;
        const colour = asCssRgb(colours[field?.colour ?? 1]);

        const maxValue = Math.floor(Math.max(...rawData.map(row => row?.[value])));
        const valueArray = cloneDeep(BaseArray);

        for ( let rowInd = 0; rowInd < BaseArray.length; rowInd ++ ) {
            for ( let colInd = 0; colInd < BaseArray[rowInd].length; colInd ++ ) {

                if ( ((rowInd * 10) + colInd) < maxValue ) {
                    valueArray[rowInd][colInd] = fieldIndex + 1;
                }
                else {
                    valueArray[rowInd][colInd] = null;
                }
            }
        }

        responseData.push({
            ...genericSettings,
            z: valueArray,
            name: label,
            showlegend: true,
            colorscale: fieldIndex ? [
                [0, colour],
                [1, colour],
            ] : [
                [0, colour],
                [1, colour],
            ],
        });

    }

    return responseData;

};  // getWaffleData


export const getHeatmapData = ( fields: Array<{}>, rawData, xKey="date" ) => {

    const graphObjects = [];

    for ( const { value, amplitude, parameter, metrics, ...rest } of fields ) {

        const result = {
            xData: [],
            yData: [],
            zData: [],
            ...rest,
        };

        for ( const { label } of metrics ) {
            result.yData.push(label)
        }

        for ( let index = 0; index < rawData.length; index++ ) {
            result.xData.push(rawData?.[index]?.[xKey])
        }

        for ( const { value: paramValue } of metrics ) {

            const zData = [];
            let tempData;

            for ( let index = 0; index < rawData.length; index++ ) {

                tempData = rawData
                        ?.[index]
                        ?.[value]
                        ?.filter(row => row?.[parameter] === paramValue);

                if ( (tempData?.length ?? 0) > 0 ) {
                    zData.push(
                        tempData
                            ?.[0]
                            ?.[amplitude]
                        ?? null
                    );
                }

            }

            result.zData.push(zData);

        }

        graphObjects.push(result);

    }

    return graphObjects

};  // getHeatmapData
