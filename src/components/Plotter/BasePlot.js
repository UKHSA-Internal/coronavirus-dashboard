// @flow

import React, { useState, useEffect } from "react";

import useResponsiveLayout from "hooks/useResponsiveLayout";
import { PlotContainer } from "./Plotter.styles";

import type { ComponentType } from "react";
import numeral from "numeral";
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import { Toggle, ToggleButton } from "components/ToggleButton/ToggleButton";
import { deviation, median } from "d3-array";
import cloneDeep from "lodash.clonedeep"
import { analytics } from "common/utils";
import Loading from "components/Loading";
const Plot = createPlotlyComponent(Plotly);


const getExtrema = ( data, barmode: string, yScale ) => {

    let minVal, maxVal;

    if ( barmode !== "stack" ) {

        [minVal, maxVal] = [
            Math.min(...data.map(item => Math.min(0, ...item.y)).filter(item => !isNaN(item))),
            Math.max(...data.map(item => Math.max(...item.y)).filter(item => !isNaN(item)))
        ];

    }
    else if ( yScale ) {

        const stackedSum = [];
        const longestLength = Math.max(...data.map(item => item?.y?.length));

        for ( let stackInd = 0; stackInd < longestLength; stackInd ++ ) {
            let currSum = 0
            for ( const item of data ) {
                currSum += item?.y?.[stackInd] ?? 0;
            }

            stackedSum.push(currSum);
        }

        [minVal, maxVal] = [
            Math.min(0, ...stackedSum.filter(item => !isNaN(item))),
            Math.max(...stackedSum.filter(item => !isNaN(item)))
        ];

    }

    const std = median(data.filter(item => item.y.length > 10).map(item => deviation(item.y)));
    const mid = median(data.filter(item => item.y.length > 10).map(item => median(item.y)));

    return {minVal, maxVal, std, mid}

};  // getExtrema


export const BasePlotter: ComponentType<*> = ({ data: payload, layout = {}, xaxis = {}, yaxis = {},
                                                  config = {}, margin = {}, style = {},
                                                  isTimeSeries = true, SrOnly = "",
                                                  noLogScale=false, ...props }) => {

    const width = useResponsiveLayout(640);
    const [ yScale, setYScale ] = useState(false);
    const data = cloneDeep(payload);
    let tickvals, ticktext, tickmode = undefined;
    const [finalTickvals, setFinalTickvals] = useState(undefined);
    const [finalTicktext, setFinalTicktext] = useState(undefined);
    const [finalTickmode, setFinalTickmode] = useState(undefined);
    const [ drawData, setDrawData ] = useState([]);

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

    const {minVal, maxVal, mid, std} = getExtrema(data, layout?.barmode, yScale);

    useEffect(() => {

        if ( yScale ) {

            tickmode = 'array';

            const thresholds = [
                -10_000, -1_000, -10, 1, 10, 100, 1_000, 10_000, 100_000,
                1_000_000, 10_000_000, 100_000_000, 1_000_000_000
            ];

            // Calculate major grids
            ticktext = [
                minVal,
                ...thresholds.filter(value => value > minVal && value < maxVal),
                maxVal
            ];

            if ( layout?.barmode !== "stack" ) {

                for ( let itemIndex = 0; itemIndex < data.length; itemIndex++ ) {
                    data[itemIndex].text = payload[itemIndex].y;

                    let value = 0;
                    for ( let ind = 0; ind < data[itemIndex].y.length; ind++ ) {
                        value = data[itemIndex].y?.[ind] ?? 0;
                        data[itemIndex].y[ind] = !value
                            ? NaN
                            : Math.log10(Math.abs(value)) * ((value >= 0) || -1);
                    }

                    data[itemIndex].hovertemplate = '%{text:.1f}';
                    data[itemIndex].textposition = 'none';
                }

                // Calculate minor grids
                tickvals = ticktext.reduce((acc, cur, ind, arr) => {
                    if ( cur >= -10 && cur <= 10 ) {
                        acc.push(cur)
                    } else {
                        const prevValue = Math.abs(arr[ind - 1]) * 2;

                        for ( let tick = arr[ind - 1] + prevValue; tick < cur; tick += prevValue ) {
                            acc.push(tick)
                        }

                        acc.push(cur);
                    }

                    return acc
                }, []);

                ticktext = tickvals.map(val => ticktext.includes(val) ? numeral(val).format("0,0.[0]") : "");
                tickvals = tickvals.map(val => !val ? 1 : Math.log10(Math.abs(val)) * ((val >= 0) || -1));

            } else {

                for ( let itemIndex = 0; itemIndex < data.length; itemIndex ++ ) {
                    data[itemIndex].text = data[itemIndex].y;
                    data[itemIndex].hovertemplate = '%{text:.1f}';
                    data[itemIndex].textposition = 'none';
                }

                tickvals = ticktext.filter(val => val > 0).map(val => !val ? val : val * ((val >= 0) || -1));
                ticktext = tickvals.map(val => ticktext.includes(val) ? numeral(val).format("0,0.[0]") : "");

            }

        }

        setDrawData(data);
        setFinalTickvals(tickvals);
        setFinalTickmode(tickmode);
        setFinalTicktext(ticktext);

    }, [yScale]);

    useEffect(() => {

        if ( yScale ) {
            analytics({
                category: "log-scale",
                action: "click",
                label: `${props?.heading} [${document.title}]`,
            })
        }

    }, [yScale]);


    for ( let index = 0; index < drawData.length; index++ ) {

        if ( "overlaying" in drawData[index] ) {
            yAxisRef = { ...yAxisRef, rangemode: "tozero" };

            layout = {
                yaxis2: {
                    ...yAxisRef,
                    overlaying: drawData[index].overlaying,
                    side: drawData[index].side,
                    rangemode: "tozero",
                    showgrid: false,

                }
            };

            margin = { r: 50 };

        }

        if ( !Array.isArray(drawData[index]?.hovertemplate) && drawData[index]?.type !== "heatmap" ) {
            drawData[index].hovertemplate = [];

            for ( const value of payload[index]?.y ?? [] ) {
                drawData[index].hovertemplate.push(
                    value > 0 ? numeral(value).format("0,0.[0]") : ""
                );
            }
        }

    }

    if ( !data?.length ) return <Loading/>;

    return <PlotContainer className={ "govuk-grid-row" }
                          aria-label={ "Displaying a graph of the data" }>
        {
            noLogScale || layout?.barmode === "stack" || std < mid
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
            data={ drawData }
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
                    tickmode: finalTickmode,
                    tickvals: finalTickvals,
                    ticktext: finalTicktext,
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
