// @flow

import React from "react";

import { BasePlotter } from "./BasePlot";
import { hexToRgb } from "common/utils";

import type { ComponentType } from "react";


export const Waffle: ComponentType<*> = ({ data, layout, config, ...props }) => {

    const tickvals = [];

    return <BasePlotter
        data={ data }
        margin={{
            l: 22,
            r: 0,
            t: 20
        }}
        style={{
            display: "block",
            margin: "auto auto",
            maxWidth: 400
        }}
        layout={ {
            hovermode: "x+y",
            height: 350,
            legend: {
                orientation: 'v',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                },
                xanchor: 'center',
                yachor: 'bottom',
                y: -.3,
                x: .5
            },
            showlegend: true,
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        xaxis={{
            range: [.5, 10.5],
            // fixedrange: true,
            type: 'linear',
            tickvals: tickvals.reverse(),
            tickformat: null,
            showgrid: false,
            tickslen: 0,
            ticks: null
        }}
        yaxis={{
            range: [.5, 10.5],
            tickvals: tickvals,
            ticktext: tickvals.map(val => `${val}`).reverse(),
            // showgrid: false,
            scaleratio: 1,
            scaleanchor: "x",
        }}
        config={{
            modeBarButtonsToRemove: [
                "autoScale2d",
                "zoomIn2d",
                "zoomOut2d",
                "toggleSpikelines",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
                "zoom2d",
                "pan2d",
                "select2d",
                "lasso2d",
            ]
        }}
        { ...props }
    />

};  // ScatterPlot


export default Waffle;
