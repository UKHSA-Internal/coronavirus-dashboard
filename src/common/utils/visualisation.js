// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";


export const
    // yellow, cornFlowerBlue, darkBlue, red, gray
    colours = [
        '#FFBF47',  // yellow
        '#2B8CC4',  // corn flower blue
        '#2E358B',  // dark blue
        '#DF3034',  // red
        "#7f7f7f"   // gray
    ];


export const getPlotData = (fields: Array<{}>, rawData, xKey="date" ) => {

    return fields.map(field => {

        const
            data = dropLeadingZeros(rawData, field.value),
            { r, g, b } = hexToRgb(colours[field.colour]),
            xData = data?.map(item => item?.[xKey] ?? null) ?? [];

        let
            yData = data?.map(variable => variable?.[field.value] ?? null) ?? [],
            plotFeatures;

        switch ( field.type ) {
            case "bar":
                plotFeatures = {
                    type: field.type,
                    marker: {
                        color: colours[field.colour]
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
                        color: colours[field.colour]
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
