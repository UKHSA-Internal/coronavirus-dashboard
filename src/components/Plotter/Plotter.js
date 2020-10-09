import React from "react";
import Plot from "react-plotly.js";
import URLs from "common/urls";
import { PlotContainer } from "./Plotter.styles";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { hexToRgb } from "../../common/utils";

// export const Plotter = ({ layout={}, xaxis={}, yaxis={}, ...props }) => {
//
//     return <Plot
//         config={ {
//             showLink: false,
//             responsive: true,
//             displaylogo: false,
//             modeBarButtonsToRemove: [
//                 "autoScale2d",
//                 "zoomIn2d",
//                 "zoomOut2d",
//                 "toggleSpikelines",
//                 "hoverClosestCartesian",
//                 "zoom2d"
//             ],
//             toImageButtonOptions: {
//                 format: 'png',
//                 filename: 'export',
//                 height: 989,
//                 width: 1600,
//                 scale: 4
//             }
//         } }
//         useResizeHandler={ true }
//         style={{ display: 'flex' }}
//         layout={ {
//             barmode: 'stack',
//             height: 320,
//             legend: {
//                 orientation: 'h',
//                 font: {
//                     family: `"GDS Transport", Arial, sans-serif`,
//                     size: 16,
//                 },
//                 xanchor: 'auto',
//                 y: -.2
//             },
//             showlegend: true,
//             margin: {
//                 l: 60,
//                 r: 25,
//                 b: 40,
//                 t: 20,
//                 pad: 5
//             },
//             xaxis: {
//                 showgrid: false,
//                 zeroline: false,
//                 showline: false,
//                 // tickangle: 30,
//                 type: "date",
//                 tickfont:{
//                     family: `"GDS Transport", Arial, sans-serif`,
//                     size : 14,
//                     color: "#6f777b"
//                 },
//                 ...xaxis
//             },
//             yaxis: {
//                 tickformat: 's',
//                 tickfont:{
//                     family: `"GDS Transport", Arial, sans-serif`,
//                     size : 14,
//                     color: "#6f777b",
//                 },
//                 ...yaxis
//             },
//             plot_bgcolor: "rgba(231,231,231,0)",
//             paper_bgcolor: "rgba(255,255,255,0)",
//             ...layout
//         } }
//         {...props}
//     />
//
// }; // Plotter


export const Plotter = ({ data, layout = {}, xaxis = {}, yaxis = {}, config = {}, margin = {}, style = {}, isTimeSeries = true, SrOnly = "", ...props }) => {

    const width = useResponsiveLayout(640);

    return <PlotContainer className={ "govuk-grid-row" }
                          aria-label={ "Displaying a graph of the data" }>
        <p className={ "govuk-visually-hidden" }>
            The data that is visualised in the chart is that which is tabulated
            under the "Data" tab. The tables do not include the rolling average metric
            (where the metric is included).
            { SrOnly }
        </p>
        <Plot
            data={ data }
            config={ {
                showLink: false,
                responsive: true,
                displaylogo: false,
                // displayModeBar: true,
                modeBarButtonsToRemove: [
                    "autoScale2d",
                    // "zoomIn2d",
                    // "zoomOut2d",
                    "toggleSpikelines",
                    "hoverClosestCartesian",
                    // "zoom2d",
                    // "pan2d",
                    "select2d",
                    "lasso2d"
                ],
                toImageButtonOptions: {
                    format: 'png',
                    filename: 'export',
                    height: 989,
                    width: 1600,
                    scale: 4
                },
                ...config
                // onLegendItem
            } }
            useResizeHandler={ true }
            style={ { display: "block", height: 350, ...style } }
            layout={ {
                hovermode: "x unified",
                // barmode: "overlay",
                // barmode: "stack",
                // height: 320,
                legend: {
                    orientation: 'h',
                    font: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 16,
                    },
                    xanchor: 'auto',
                    // yanchor: 'auto'
                    y: -.2
                },
                showlegend: true,
                margin: {
                    l: width === "desktop" ? 80 : 40,
                    r: 15,
                    b: 25,
                    t: 10,
                    pad: 0,
                    ...margin
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    tickslen: 10,
                    ticks: "outside",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    type: isTimeSeries ? "date" : "category",
                    tickformat: '%d %b',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 14,
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
                    ...xaxis
                },
                yaxis: {
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
                    ...yaxis
                },
                plot_bgcolor: "rgba(231,231,231,0)",
                paper_bgcolor: "rgba(255,255,255,.9)",
                ...layout
            } }
            { ...props }
        />
    </PlotContainer>

}; // Plotter


export const Choropleth = ({ data, layout, config, ...props }) => {

    return <Plotter
        data={ [
            {
                type: 'choroplethmapbox',
                hoverinfo: 'text+z',
                colorscale: [
                    [0, '#F47738'],
                    [0.5, '#005EA5'],
                    [1, '#9DDAE8'],
                ],
                autocolorscale: false,
                reversescale: true,
                colorbar: {
                    thickness: 10,
                    thickfont: {
                        family: `"GDS Transport", Arial, sans-serif`
                    },
                },
                hoverlabel: {
                    font: {
                        family: `"GDS Transport", Arial, sans-serif`
                    },
                },
                center: {
                    'lat': 53.5,
                    'lon': -2
                },
                marker: {
                    line: {
                        color: '#2f2f2f',
                        width: 0.1
                    }
                },
                ...data
            }
        ] }
        config={ {
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
            geo: {
                fitbounds: "geojson",
                resolution: 50,
                scope: "europe",
                projection: {
                    lon: 2,
                    lat: 2,
                    roll: 130,
                }
            },
            mapbox: {
                style: URLs.mapStyle,
                center: {
                    lat: 55.5,
                    lon: -2.5
                },
                zoom: 4.2,
                layers: [
                    {
                        sourcetype: 'geojson',
                        source: `${ URLs.baseGeo }countries_v1.geojson`,
                        type: 'line',
                        color: '#a3a3a3',
                        line: {
                            width: 0.1
                        }
                    },
                ]
            },
            ...layout
        } }
        margin={ {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
        } }
        xaxis={ {
            showgrid: false,
            zeroline: false,
            showline: false,
        } }
        { ...props }
    />

}; // Mapper


export const ScatterPlotWithTrendLine = ({ scatterData, trendLineData, layout, config, ...props }) => {

    return <Plotter
        data={ [
            {
                type: 'scatter',
                mode: 'markers',
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


export const IndicatorLine = ({ data, currentLocation }) => {

    const width = useResponsiveLayout(640);

    let range = [];

    const toRgba = (hex) => {
        const rgb = hexToRgb(hex);
        return `rgba(${rgb.r},${rgb.g},${rgb.b},1)`
    };

    const
        sum = data.reduce((acc, val) => acc + val, 0),
        mean = Math.round(sum / data.length),
        [min, max] = [Math.min(...data), Math.max(...data)];

    for ( let ind = -max; ind <= max; ind = ind + 10 ) {
        range.push(ind)
    }

    console.log(mean)
    console.log(sum)
    console.log(mean / max)
    return <Plot
        data={ [
            {
                z: [range],
                type: "heatmap",
                zsmooth: "best",
                autocolorscale: false,
                x: [0 - max, max ],
                y: [0, 1],
                cmin: 0,
                // colorscale: "Viridis",
                colorscale: [
                    [0, 'rgb(0,89,195)'],
                    [.5, 'rgba(255,255,255,1)'],
                    [1, 'rgba(214,39,40,1)'],
                //     [0 / max, toRgba("#e0e543")],
                //     [1 / max, toRgba("#74bb68")],
                //     [1500 / max, toRgba("#399384")],
                //     [3000 / max, toRgba("#12407F")],
                //     [5000 / max, toRgba("#0b2c5c")],
                //     [10000 / max, toRgba("#610256")],
                //     [1, toRgba("#610256")],
                ],
                // reversescale: true,
                showscale: false,
            },
            {
                x: [currentLocation - mean],
                y: [.5],
                type: "scatter",
                mode: "markers",
                marker: {
                    color: "#000000",
                    size: 8,
                    symbol: "diamond"
                }
            },
            {
                x: [0, 0],
                y: [-.5, 1.5],
                // type: "lines",
                mode: "lines",
                line: {
                    color: "#626262",
                    width: 4,
                }
            }
        ] }
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true
        } }
        useResizeHandler={ true }
        style={{
            display: "block",
            height: 20,
            line: {
                color: '#ffffff',
                width: 6
            }
        }}
        layout={{
            // shapes: [{
            //     type: 'line',
            //     x0: mean,
            //     xref: 'x',
            //     y0: -.15,
            //     x1: mean,
            //     yref: 'paper',
            //     y1: .5,
            //     line: {
            //         color: '#000000',
            //         width: 1,
            //     }
            // }],
            showlegend: false,
            margin: {
                l: 4,
                r: 4,
                b: 0,
                t: 0,
                pad: 0,
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                ticks: "",
                showticklabels: false,
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                ticks: "",
                showticklabels: false,
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
        }}
    />

}; // Histogram
