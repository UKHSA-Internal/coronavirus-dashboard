// @flow

import React from "react";

import { PlotContainer } from "./Plotter.styles";
import Plot from "react-plotly.js";

import type { ComponentType } from "react";


export const XAxis: ComponentType<*> = ({ data, layout = {}, xaxis = {}, yaxis = {},
                                            config = {}, margin = {}, style = {},
                                            isTimeSeries = true, SrOnly = "",
                                            ...props }) => {

    return <PlotContainer className={ "govuk-grid-row" }
                          height={ null }
                          aria-label={ "Displaying a graph of the data" }>
        <Plot
            data={ data }
            config={ {
                showLink: false,
                responsive: true,
                staticPlot: true,
                displaylogo: false,
                displayModeBar: false,
                ...config
                // onLegendItem
            } }
            useResizeHandler={ true }
            style={ { display: "block", height: 30, marginTop: -27, zIndex: 1, ...style } }
            layout={ {
                showlegend: false,
                margin: {
                    l: 6,
                    r: 3,
                    b: 25,
                    t: 0,
                    pad: 0,
                    ...margin
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    tickslen: 15,
                    ticks: "outside",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    type: isTimeSeries ? "date" : "category",
                    autorange: true,
                    tickformat: '%b',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 14,
                        color: "#6B7276"
                    },
                    ...xaxis
                },
                yaxis: {
                    automargin: true,
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    ticks: "",
                    showticklabels: false,
                    tickslen: 0,
                    ...yaxis
                },
                plot_bgcolor: "rgba(231,231,231,0)",
                paper_bgcolor: "rgba(255,255,255,0)",
                ...layout
            } }
            { ...props }
        />
    </PlotContainer>

}; // Plotter


