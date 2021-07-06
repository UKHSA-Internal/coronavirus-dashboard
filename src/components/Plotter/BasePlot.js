// @flow

import React, { useState, useEffect } from "react";

import useResponsiveLayout from "hooks/useResponsiveLayout";
import { PlotContainer } from "./Plotter.styles";

import type { ComponentType } from "react";
import numeral from "numeral";
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import { Toggle, ToggleButton } from "components/ToggleButton/ToggleButton";

const Plot = createPlotlyComponent(Plotly);



// const prepareScale = (data, yAxisRef, margin, yScale, layout) => {
//
//     let tickvals, ticktext, tickmode = undefined;
//
//     if ( layout?.barmode === "logy" || yScale === true ) {
//         tickmode = 'array';
//
//         const thresholds = [
//             -1000, -10, 0, 10, 100, 1_000, 10_000, 100_000,
//             1_000_000, 10_000_000, 100_000_000, 1_000_000_000
//         ];
//         const minVal = Math.min(...data[0].y);
//         const maxVal = Math.max(...data[0].y);
//
//         ticktext = [
//             minVal,
//             ...thresholds.filter(value => value > minVal && value < maxVal),
//             maxVal
//         ];
//
//         for ( const item of data ) {
//             item.text = item.y;
//
//             item.y = item.y.map(val =>
//                 val >= 0
//                     ? Math.log(val)
//                     : -Math.log(Math.abs(val))
//             );
//
//             item.hovertemplate = '%{text:.1f}';
//         }
//
//         tickvals = ticktext.map(val =>
//             val >= 0
//                 ? val === 0
//                 ? 0
//                 : Math.log(val)
//                 : -Math.log(Math.abs(val))
//         );
//
//     }
//
//     for ( const row of data ) {
//         if ( "overlaying" in row ) {
//             yAxisRef = {
//                 ...yAxisRef,
//                 rangemode: "tozero",
//             };
//
//             layout = {
//                 yaxis2: {
//                     ...yAxisRef,
//                     overlaying: row.overlaying,
//                     side: row.side,
//                     rangemode: "tozero",
//                     showgrid: false,
//
//                 }
//             };
//
//             margin = {
//                 r: 50,
//             };
//
//         }
//
//         for ( const value of row?.y ?? [] ) {
//
//             if ( row?.showlegend === false || row?.type === 'heatmap' ) continue;
//             if ( !row.hasOwnProperty("hovertemplate") || !Array.isArray(row.hovertemplate) ) {
//                 row.hovertemplate = [];
//             }
//
//             row.hovertemplate.push(numeral(value).format("0,0.[0]"));
//
//         }
//     }
//
//     return [data, yAxisRef, margin, layout, tickvals, ticktext, tickmode];
//
// };

export const BasePlotter: ComponentType<*> = ({ data: payload, layout = {}, xaxis = {}, yaxis = {},
                                                  config = {}, margin = {}, style = {},
                                                  isTimeSeries = true, SrOnly = "",
                                                  noLogScale=false, ...props }) => {

    const width = useResponsiveLayout(640);
    const [ yScale, setYScale ] = useState(false);
    const data = JSON.parse(JSON.stringify(payload));
    let tickvals, ticktext, tickmode = undefined;

    let yAxisRef = {
        fixedragne: false,
        tickslen: 0,
        ticks: width === "desktop" ? "outside" : "inside",
        tickson: "boundaries",
        ticklen: 'labels',
        tickcolor: "#f1f1f1",
        tickfont: {
            family: `"GDS Transport", Arial, sans-serif`,
            size: width === "desktop" ? 13 : 10,
            color: "#6B7276",
        },
        ...(yScale && layout?.barmode === "stack") && !noLogScale
            ? {type: 'log'}
            : {tickformat: width === "desktop" ? ',.2r' : '3s'},

    };

    if ( yScale ) {

        tickmode = 'array';

        const thresholds = [
            -10_000, -1_000, -10, 0, 10, 100, 1_000, 10_000, 100_000,
            1_000_000, 10_000_000, 100_000_000, 1_000_000_000
        ];

        let minVal, maxVal;

        if ( layout?.barmode !== "stack" ) {
            [minVal, maxVal] = [
                Math.min(...data.map(item => Math.min(0, ...item.y)).filter(item => !isNaN(item))),
                Math.max(...data.map(item => Math.max(...item.y)).filter(item => !isNaN(item)))
            ];
        }
        else {
            const stackedSum = [];

            for ( let stackInd = 0; stackInd < Math.max(...data.map(item => item?.y?.length)); stackInd ++ ) {
                let currSum = 0
                for ( const item of data ) {
                    currSum += item?.y?.[stackInd] ?? 0;
                }
                stackedSum.push(currSum);
            }

            console.log(data)
            console.log(data[0]?.y?.length);
            console.log(stackedSum);

            [minVal, maxVal] = [
                Math.min(...stackedSum.filter(item => !isNaN(item))),
                Math.max(...stackedSum.filter(item => !isNaN(item)))
            ];
        }

        ticktext = [
            minVal,
            ...thresholds.filter(value => value > minVal && value < maxVal),
            maxVal
        ];

        if ( layout?.barmode !== "stack" ) {
            for ( const item of data ) {
                item.text = item.y;

                item.y = item.y.map(val =>
                    val >= 0
                        ? Math.log(val)
                        : -Math.log(Math.abs(val))
                );

                item.hovertemplate = '%{text:.1f}';
                item.textposition = 'none';
            }

            tickvals = ticktext.map(val =>
                val >= 0
                    ? val === 0
                    ? 0
                    : Math.log(val)
                    : -Math.log(Math.abs(val))
            );
        }
        else {
            tickvals = ticktext;
        }
        ticktext = ticktext.map(value => numeral(value).format("0,0.[0]"));

    }

    for ( let index = 0; index < data.length; index ++ ) {
        if ( "overlaying" in data[index] ) {
            yAxisRef = {
                ...yAxisRef,
                rangemode: "tozero",
            };

            layout = {
                yaxis2: {
                    ...yAxisRef,
                    overlaying: data[index].overlaying,
                    side: data[index].side,
                    rangemode: "tozero",
                    showgrid: false,

                }
            };

            margin = {
                r: 50,
            };

        }

        for ( const value of payload[index]?.y ?? [] ) {

            if ( data[index]?.showlegend === false || data[index]?.type === 'heatmap' ) continue;
            if ( !data[index].hasOwnProperty("hovertemplate") || !Array.isArray(data[index].hovertemplate) ) {
                data[index].hovertemplate = [];
            }

            data[index].hovertemplate.push(numeral(value).format("0,0.[0]"));

        }

        // console.log(row.hovertemplate)
    }

    // useEffect(() => {
    //     revision += 1;
    //     [data, yAxisRef, margin, layout, tickvals, ticktext, tickmode] = prepareScale(payload, yAxisRef, margin, yScale, layout);
    //
    // }, [yScale]);

    // useEffect(() => {
    //
    //
    // }, [ data, yScale ]);
    // console.log(layout?.barmode)

    return <PlotContainer className={ "govuk-grid-row" }
                          aria-label={ "Displaying a graph of the data" }>
        {
            noLogScale
                ? null
                : <Toggle style={{ marginTop: "-25px", float: "right" }}>
                    <ToggleButton onClick={ () => setYScale(false) }
                                  className={ "govuk-!-font-size-14" }
                                  active={ yScale === false }>
                        Linear
                    </ToggleButton>
                    <ToggleButton onClick={ () => setYScale(true) }
                                  className={ "govuk-!-font-size-14" }
                                  active={ yScale === true }>
                        Log
                    </ToggleButton>
                </Toggle>
        }
        <p className={ "govuk-visually-hidden" }>
            The data that is visualised in the chart is that which is tabulated
            under the "Data" tab. The tables do not include the rolling average metric
            (where the metric is included).
            { SrOnly }
        </p>
        <Plot
            data={ data }
            config={ {
                showLink: false,
                responsive: true,
                displaylogo: false,
                // displayModeBar: true,
                modeBarButtonsToRemove: [
                    "autoScale2d",
                    "toggleSpikelines",
                    "hoverClosestCartesian",
                    "pan2d",
                    "select2d",
                    "lasso2d",
                ],
                toImageButtonOptions: {
                    format: 'png',
                    filename: 'export',
                    height: 989,
                    width: 1600,
                    scale: 4
                },
                ...config
                // onLegendItem
            } }
            useResizeHandler={ true }
            style={ { display: "block", height: 350, ...style } }
            layout={ {
                hovermode: "x unified",
                hoverdistance: 1,
                // datarevision: yScale ? 1 : 0,
                // barmode: "overlay",
                // barmode: "stack",
                // height: 320,
                legend: {
                    orientation: 'h',
                    font: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: width === "desktop" ? 15 : 12,
                    },
                    xanchor: 'auto',
                    // yanchor: 'auto'
                    y: -.2
                },
                showlegend: true,
                margin: {
                    l: width === "desktop" ? 85 : 30,
                    r: width === "desktop" ? 10 : 5,
                    b: 25,
                    t: 10,
                    pad: 0,
                    ...margin
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    // fixedrange: width !== "desktop",
                    fixedrange: false,
                    tickslen: 10,
                    ticks: "outside",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    type: isTimeSeries ? "date" : "category",
                    tickformat: '%d %b',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: width === "desktop" ? 14 : 10,
                        color: "#6B7276"
                    },
                    // rangeslider: {range: ['20202-01-01', new Date().toString()]},
                    // rangeselector: {buttons: [
                    //     {
                    //       count: 7,
                    //       label: '7d',
                    //       step: 'day',
                    //       stepmode: 'backward'
                    //     },
                    //         {
                    //       count: 1,
                    //       label: '1m',
                    //       step: 'month',
                    //       stepmode: 'backward'
                    //     },
                    //         {
                    //       count: 3,
                    //       label: '3m',
                    //       step: 'month',
                    //       stepmode: 'backward'
                    //     },
                    //     {step: 'all'}
                    //   ]},
                    ...xaxis
                },
                yaxis: {
                    tickmode,
                    tickvals,
                    ticktext,
                    ...yAxisRef,
                    ...yaxis
                },
                plot_bgcolor: "rgba(231,231,231,0)",
                paper_bgcolor: "rgba(255,255,255,0)",
                ...layout
            } }
            { ...props }
        />
    </PlotContainer>;

}; // Plotter
