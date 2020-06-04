import React from "react";
import Plot from "react-plotly.js";


export const Plotter = ({ layout, ...props }) => {

    return <Plot
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true,
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
                height: 1024,
                width: 768,
                scale: 4
            }
        } }
        useResizeHandler={ true }
        style={{ display: 'flex' }}
        layout={ {
            // width: 400,
            height: 240,
            // autosize: true,
            legend: {
                orientation: 'h'
            },
            showlegend: false,
            margin: {
                l: 20,
                r: 5,
                b: 25,
                t: 5,
                pad: 0
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                // tickangle: 30,
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 10,
                    color: "#6f777b"
                }
            },
            yaxis: {
                tickformat: 's',
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 10,
                    color: "#6f777b",
                }
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        {...props}
    />

}; // Plotter
