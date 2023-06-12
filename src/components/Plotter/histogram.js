import React from "react";

import useResponsiveLayout from "hooks/useResponsiveLayout";
import Plot from "react-plotly.js";


export const Histogram = ({ data, currentLocation }) => {

    const width = useResponsiveLayout(640);

    return <Plot
        data={ [{
            x: data, type: "histogram",
            autobinx: true,
            histnorm: "percent"
        }] }
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true
        } }
        useResizeHandler={ true }
        style={ { display: "block", height: 150 } }
        layout={ {
            // hovermode: "x unified",
            // barmode: "overlay",
            // barmode: "stack",
            // height: 320,
            shapes: [{
                type: 'line',
                x0: currentLocation,
                xref: 'x',
                y0: 0,
                x1: currentLocation,
                yref: 'paper',
                y1: 1,
                line: {
                    color: '#cb0000',
                    width: 3,
                    // dash: 'dot'
                }
            }],
            legend: {
                orientation: 'h',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 8,
                },
                xanchor: 'auto',
                // yanchor: 'auto'
                // y: -.2
            },
            showlegend: false,
            margin: {
                l: 0,
                r: 0,
                b: 20,
                t: 0,
                pad: 0,
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                tickslen: 10,
                ticks: "outside",
                tickson: "boundaries",
                ticklen: 'labels',
                // type: "histogram",
                tickfont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 10,
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
            },
            yaxis: {
                automargin: true,
                tickslen: 5,
                ticks: "outside",
                tickson: "boundaries",
                ticklen: 'labels',
                tickcolor: "#f1f1f1",
                tickformat: width === "desktop" ? ',r' : '.2s',
                tickfont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 14,
                    color: "#6B7276",
                },
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
        } }
    />

}; // Histogram
