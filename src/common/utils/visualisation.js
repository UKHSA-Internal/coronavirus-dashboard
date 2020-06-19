// @flow

import { dropLeadingZeros, hexToRgb } from "./utils";
import { movingAverage } from "../stats";
import numeral from "numeral";
import moment from "moment";


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
                { r, g, b } = hexToRgb(colours[field.colour]),
                xData = data?.map(item => item?.date ?? null) ?? [];

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
                text: yData.map((value, index) => `${field.label}: ${ numeral(value).format("0,0") }<br>${ moment(xData[index]).format("DD MMM YYYY") }`),
                hoverinfo: "text",
                ...plotFeatures
            }

        });

};  // getYAxisData
