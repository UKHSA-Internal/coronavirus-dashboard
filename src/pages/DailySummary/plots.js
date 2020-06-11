import React from "react";
import Plot from "react-plotly.js";


export const Plotter = ({ layout, ...props }) => {

    return <Plot
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true
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
                l: 25,
                r: 0,
                b: 15,
                t: 5,
                pad: 0
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                automargin: true,
                tickangle: -20,
                type: "date",
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
