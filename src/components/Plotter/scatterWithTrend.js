import React from "react";
import Plotter from "./Plotter";

import type { ComponentType } from "react";


export const ScatterPlotWithTrendLine: ComponentType<*> = ({ scatterData, trendLineData, layout, config,
                                                               ...props }) => {

    return <Plotter
        data={ [
            {
                type: 'heatmap',
                // mode: 'markers',
                showlegend: false,
                marker: {
                    size: 8,
                },
                fillcolor: '#005EA5',
                ...scatterData
            },
            {
                showlegend: false,
                mode: "lines",
                fillcolor: '#F47738',
                line: {
                    width: 3,
                    dash: "dash",
                    color: 'rgba(109,109,109,0.7)'
                },
                ...trendLineData
            }
        ] }
        config={ {
            displayModeBar: true,
            showLink: false,
            responsive: true,
            displaylogo: false,
            modeBarButtonsToRemove: [
                "autoScale2d",
                "zoomIn2d",
                "zoomOut2d",
                "toggleSpikelines",
                "hoverClosestCartesian",
                "zoom2d"
            ],
            toImageButtonOptions: {
                format: 'png',
                filename: 'export',
                height: 600,
                width: 1200,
                scale: 4
            },
            ...config
        } }
        layout={ {
            height: 500,
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
            // margin: {
            //     l: 40,
            //     r: 10,
            //     b: 20,
            //     t: 0,
            //     pad: 0
            // },
            // xaxis: {
            //     showgrid: false,
            //     zeroline: false,
            //     showline: false,
            //     tickfont:{
            //         family: `"GDS Transport", Arial, sans-serif`,
            //         size : 14,
            //         color: "#6f777b"
            //     }
            // },
            // yaxis: {
            //     // tickformat: 's',
            //     tickfont:{
            //         family: `"GDS Transport", Arial, sans-serif`,
            //         size : 14,
            //         color: "#6f777b",
            //     }
            // },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        { ...props }
    />

};  // ScatterPlot
