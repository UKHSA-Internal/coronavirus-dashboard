// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";


export const
    colours = [
        // Base blue
        '#5694CA',
        // Base blue tint 1
        '#ABCBE5',
        // Base blue tint 2
        '#DEEAF4',
        // Dark blue
        '#003078',
        // Dark blue tint 1
        '#8098BC',
        // Dark blue tint 2
        '#CCD6E4',
        // Grey
        '#B1B4B6',
        // Grey tint 1
        '#D8DADB',
        // Grey tint 2
        '#EFF0F0',
        // Yellow:
        '#FFDD00',
        // Red:
        '#d4351c',
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

        yData = field.rollingAverage ? movingAverage(yData, 7) : yData

        return {
            name: field.label,
            x: xData,
            y: yData,
            hovertemplate: "%{y}",
            ...plotFeatures
        }

    });

};  // getYAxisData
