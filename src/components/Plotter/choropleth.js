import URLs from "../../common/urls";
import React from "react";
import Plotter from "./Plotter";

import type { ComponentType } from "react";


export const Choropleth: ComponentType<*> = ({ data, layout, config, ...props }) => {

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
