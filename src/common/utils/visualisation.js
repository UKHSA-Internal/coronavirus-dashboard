// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";


export const getPlotData = (fields: Array<{}>, rawData) => {

    const
        // yellow, cornFlowerBlue, darkBlue, red, gray
        colours = [
            '#FFBF47', '#2B8CC4',
            '#2E358B', '#DF3034',
            "#7f7f7f"
        ];

    return fields.map(field => {

            const
                data = dropLeadingZeros(rawData, field.value),
                yData = data?.map(variable => variable?.[field.value] ?? null) ?? [],
                { r, g, b } = hexToRgb(colours[field.colour]);

            let plotFeatures;

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

            return {
                name: field.label,
                x: data?.map(item => item?.date ?? null) ?? [],
                y: field.rollingAverage ? movingAverage(yData, 7) : yData,
                ...plotFeatures
            }

        });

};  // getYAxisData
