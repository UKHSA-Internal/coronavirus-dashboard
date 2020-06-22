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
        style={{ display: 'block', height: 240 }}
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
                b: 20,
                t: 5,
                pad: 0
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                automargin: true,
                tickslen: 5,
                ticks: "outside",
                tickson: "boundaries",
                ticklen: 'labels',
                type: "date",
                tickformat: '%b',
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


export const BarPlotter = ({ data, ...props }) => {

    return <Plotter
        data={ data }
        style={{ display: 'block', height: 140 }}
        layout={{
            margin: {
                l: 57,
                r: 0,
                b: 0,
                t: 0,
                pad: 5
            },
            offset: .1,
            yaxis: {
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 13,
                    color: "#6f777b",
                },
                layer: "below traces"
            },
            xaxis: {
                visible: false,
                layer: "below traces"
            },
            height: 140,
            uniformtext: {
                minsize: 8,
                mode: 'hide'
            }
        }}
    />

};  // BarPlotter
