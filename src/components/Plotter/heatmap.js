// @flow

import React from "react";

import useResponsiveLayout from "hooks/useResponsiveLayout";
import { BasePlotter } from "./BasePlot";
import { hexToRgb } from "common/utils";
import { scaleColours } from "common/utils";
import { zip } from "d3-array";

import type { ComponentType } from "react";


const scaleLevels = [
    0,
    10 / 400,
    50 / 400,
    100 / 400,
    200 / 400,
    1
];

const asCssRgb = ( hex ) => {

    const { r, g, b } = hexToRgb(hex);

    return `rgb(${r},${g},${b})`

};  // asCssRgb


export const Heatmap: ComponentType<*> = ({ data, layout, config, ...props }) => {

    const width = useResponsiveLayout(680);

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
                ygap: 1,
                fixedrange: true,
                zauto: false,
                zmin: 0,
                zmax: 400,
                hoverinfo: "text",
                hovertemplate: (
                    `<b>Date</b>: %{x}<br>` +
                    `<b>${dataset.metricLabel}</b>: %{y}<br>` +
                    `<b>${dataset.amplitudeLabel}</b>: %{z}`
                ),
                name: dataset.label,
                colorbar: {
                    tickvals: [0, 10, 50, 100, 200, 400],
                    ticktext: ["0", "10", "50", "100", "200", "400+"],
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
        xaxis={{
            fixedrange: false,
        }}
        { ...props }
    />

};  // ScatterPlot


export default Heatmap;
