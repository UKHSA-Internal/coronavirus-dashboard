// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";


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


export const getPlotData = (fields: Array<{}>, rawData, xKey="date" ) => {

    return fields.map((field, index) => {

        const
            data = dropLeadingZeros(rawData, field.value),
            { r, g, b } = hexToRgb(colours[field?.colour ??  index]),
            xData = data?.map(item => item?.[xKey] ?? null) ?? [];

        let
            yData = data?.map(variable => variable?.[field.value] ?? null) ?? [],
            plotFeatures;

        switch ( field.type ) {
            case "bar":
                plotFeatures = {
                    type: field.type,
                    marker: {
                        color: colours[field?.colour ?? index]
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
                            fillcolor: `rgba(${ r },${ g },${ b },0.1)`
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

        yData = field.rollingAverage
            ? [
                ...new Array(trimLength).fill(null),
                ...movingAverage(yData, field.rollingAverage.window)
                    .slice(trimLength, yData.length),
            ]
            : yData

        return {
            name: field.label,
            x: xData,
            y: yData,
            hovertemplate: "%{y}",
            ...plotFeatures
        }

    });

};  // getYAxisData
