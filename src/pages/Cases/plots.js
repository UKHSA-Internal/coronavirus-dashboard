import React from "react";
import Plot from "react-plotly.js";
import URLs from "../../common/urls";


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


export const Mapper = ({ layers, ...props }) => {

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
                height: 600,
                width: 600,
                scale: 4
            }
        } }
        useResizeHandler={ true }
        style={{ display: 'flex' }}
        layout={ {
            barmode: 'stack',
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
                            width: 1
                        }
                    },
                ]
            },
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
                l: 0,
                r: 5,
                b: 0,
                t: 0,
                pad: 0
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

