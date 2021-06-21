// @flow

import React from "react";

import { BasePlotter } from "./BasePlot";

import type { ComponentType } from "react";
import { hexToRgb } from "common/utils";
import { zip } from "d3-array";


const scaleLevels = [
    0,
    .05,
    .1,
    .2,
    .3,
    .6,
    .7,
    .95,
    1
];

export const scaleColours = [
    "#1f0f23",
    "#391d40",
    "#6d31c2",
    "#865ad7",
    "#946FFF",
    "#a7a7fa",
    "#B2BCFF",
    "#e2e5ff",
    "#eff1ff",
];


const asCssRgb = ( hex ) => {

    const { r, g, b } = hexToRgb(hex);

    return `rgb(${r},${g},${b})`

};  // asCssRgb


export const PercentageHeatmap: ComponentType<*> = ({ data, layout, config, ...props }) => {

    const colorscale = zip(
        scaleLevels,
        scaleColours.map(asCssRgb)
    );

    return <BasePlotter
        data={
            data.map(dataset => ({
                x: dataset.xData,
                y: dataset.yData,
                z: dataset.zData,
                type: "heatmap",
                colorscale,
                reversescale: true,
                ygap: 1,
                fixedrange: true,
                zauto: false,
                zmin: 0,
                zmax: 100,
                hoverinfo: "text",
                hovertemplate: (
                    `<b>Date</b>: %{x}<br>` +
                    `<b>${dataset.metricLabel}</b>: %{y}<br>` +
                    `<b>${dataset.amplitudeLabel}</b>: %{z}%`
                ),
                name: dataset.label,
                colorbar: {
                    tickvals: [0, 25, 50, 75, 100],
                    // ticktext: ["0", "10", "50", "100", "200", "400", "800+"],
                    tickmode: "array",
                    ticks: "outside",
                    tickson: "boundaries",
                    tickslen: 5,
                    ticklen: 'labels',
                    thickness: 20,
                    x: 1,
                    len: .8,
                    title: {
                        text: dataset.amplitudeLabel.split(/\s/).join("<br>"),
                        font: {
                            family: `"GDS Transport", Arial, sans-serif`,
                            size: 11
                        }
                    },
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 9
                    }
                }
            }))
        }
        margin={{
            l: 50,
            r: 0,
            t: 20
        }}
        layout={ {
            hovermode: "x+y",
            height: 350,
            legend: {
                orientation: 'h',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                },
                xanchor: 'auto',
                y: -.2
            },
            showlegend: true,
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        isTimeSeries={ true }
        xaxis={{
            fixedrange: false,
            type: "date",
        }}
        { ...props }
    />

};  // ScatterPlot


export default PercentageHeatmap;
