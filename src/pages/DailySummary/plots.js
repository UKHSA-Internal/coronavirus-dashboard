// @flow

import React, { lazy, Suspense } from "react";
import Plot from "react-plotly.js";
import Loading from "components/Loading";


export const Plotter = ({ ...props }) => {

    const Plotter = lazy(() => import("components/Plotter"))

    return <Suspense fallback={ <Loading/> }>
        <Plotter
            SrOnly={
                'Charts in the current (UK Summary) page do not have a "Data" tab. ' +
                'They are smaller, more abstract versions of the same ones that are ' +
                'included on each topic-specific page.'
            }
            config={ {
                showLink: false,
                responsive: true,
                displaylogo: false,
                staticPlot: true
            } }
            style={{ display: 'block', height: 240 }}
            layout={ {
                height: 240,
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
            } }
            {...props}
        />
    </Suspense>

}; // Plotter


// export const BarPlotter = ({ data, ...props }) => {
//
//     return <Plotter
//         data={ data }
//         style={{ display: 'block', height: 140 }}
//         layout={{
//             margin: {
//                 l: 57,
//                 r: 0,
//                 b: 0,
//                 t: 0,
//                 pad: 5
//             },
//             offset: .1,
//             yaxis: {
//                 tickfont:{
//                     family: `"GDS Transport", Arial, sans-serif`,
//                     size : 13,
//                     color: "#6f777b",
//                 },
//                 layer: "below traces"
//             },
//             xaxis: {
//                 visible: false,
//                 layer: "below traces"
//             },
//             height: 140,
//             uniformtext: {
//                 minsize: 8,
//                 mode: 'hide'
//             }
//         }}
//     />
//
// };  // BarPlotter
