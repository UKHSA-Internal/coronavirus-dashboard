import React from "react";
import Plot from "react-plotly.js";


export const Plotter = ({ ...props }) => {

    return <Plot
        config={ {
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
                height: 989,
                width: 1600,
                scale: 4
            }
        } }
        useResizeHandler={ true }
        style={{ display: 'flex' }}
        layout={ {
            barmode: 'stack',
            height: 320,
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
            margin: {
                l: 60,
                r: 25,
                b: 40,
                t: 20,
                pad: 5
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                // tickangle: 30,
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 14,
                    color: "#6f777b"
                }
            },
            yaxis: {
                tickformat: 's',
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 14,
                    color: "#6f777b",
                }
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)"
        } }
        {...props}
    />

}; // Plotter
