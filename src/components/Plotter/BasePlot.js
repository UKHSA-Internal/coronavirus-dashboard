// @flow

import React, { useState, useEffect } from "react";

import useResponsiveLayout from "hooks/useResponsiveLayout";
import { PlotContainer } from "./Plotter.styles";

import numeral from "numeral";
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import { Toggle, ToggleButton } from "components/ToggleButton/ToggleButton";
import { deviation, median, min, max } from "d3-array";
import cloneDeep from "lodash.clonedeep"
import { analytics } from "common/utils";
import Loading from "components/Loading";

import type { ComponentType } from "react";
import moment from "moment";


const Plot = createPlotlyComponent(Plotly);


const axRef = {
    y: {
        fixedragne: false,
        tickslen: 0,
        tickson: "boundaries",
        ticklen: 'labels',
        tickcolor: "#f1f1f1",
        tickfont: {
            family: `"GDS Transport", Arial, sans-serif`,
            color: "#6B7276",
        }
    }
};


const logThresholds = [
    -10_000, -1_000, -10, 1, 10, 100, 1_000, 10_000, 100_000,
    1_000_000, 10_000_000, 100_000_000, 1_000_000_000
];


const rangeSelector =  [
    {
      count: null,
      step: 'all',
      label: 'all',
    },
    {
      count: 1,
      label: '1y',
      step: 'year',
    },
    {
      count: 6,
      label: '6m',
      step: 'months',
    },
    {
      count: 3,
      label: '3m',
      step: 'months',
    },
    {
      count: 1,
      label: '1m',
      step: 'month',
    },
];


const getAxisAttributes = ({ minVal, maxVal, width }) => {

    let ticktext = [
        minVal,
        ...logThresholds.filter(value => value > minVal && value < maxVal),
        maxVal
    ];

    // Calculate minor grids
    let tickvals = ticktext.reduce((acc, cur, ind, arr) => {
        if ( cur >= -10 && cur <= 10 ) {
            acc.push(cur)
        } else {
            const prevValue = Math.abs(arr[ind - 1]) * 2;

            for ( let tick = arr[ind - 1] + prevValue; tick < cur; tick += prevValue ) {
                acc.push(tick)
            }

            acc.push(cur);
        }

        return acc
    }, []);

    let tickFormat = "0,0.[0]";
    if ( width !== "desktop" ) tickFormat = "0.[0]a";

    ticktext = tickvals.map(val => ticktext.includes(val) ? numeral(val).format(tickFormat) : "");
    tickvals = tickvals.map(val => !val ? 1 : Math.log10(Math.abs(val)) * ((val >= 0) || -1));

    return { ticktext, tickvals, tickmode: 'array'};

};  // getAxisAttributes


const prepLogData = (data, { original }) => {

    for ( let itemIndex = 0; itemIndex < data.length; itemIndex++ ) {
        data[itemIndex].text = original[itemIndex].y;

        for ( let ind = 0; ind < data[itemIndex].y.length; ind++ ) {
            const value = data[itemIndex].y?.[ind] ?? 0;
            data[itemIndex].y[ind] = !value
                ? NaN
                : Math.log10(Math.abs(value)) * ((value >= 0) || -1);
        }

        data[itemIndex].hovertemplate = '%{text:.1f}';
        data[itemIndex].textposition = 'none';
    }

    return data

};  // prepLogData



const getExtrema = ( data, barmode: string, yScale ) => {

    let minVal, maxVal;

    if ( barmode !== "stack" ) {

        [minVal, maxVal] = [
            Math.min(...data.map(item => Math.min(0, ...item.y)).filter(item => !isNaN(item))),
            Math.max(...data.map(item => Math.max(...item.y)).filter(item => !isNaN(item)))
        ];

    }
    else if ( yScale ) {

        const stackedSum = [];
        const longestLength = Math.max(...data.map(item => item?.y?.length));

        for ( let stackInd = 0; stackInd < longestLength; stackInd ++ ) {
            stackedSum.push(data.reduce((acc, cur) => acc + (cur?.y?.[stackInd] ?? 0), 0));
        }

        [minVal, maxVal] = [
            Math.min(0, ...stackedSum.filter(item => !isNaN(item))),
            Math.max(...stackedSum.filter(item => !isNaN(item)))
        ];

    }

    const std = median(data.filter(item => item.y.length > 10).map(item => deviation(item.y)));
    const mid = median(data.filter(item => item.y.length > 10).map(item => median(item.y)));

    return { minVal, maxVal, std, mid };

};  // getExtrema


export const applyZoom = function (data, { zoomLevel, labelSuffix }) {

    const currentRange = rangeSelector.find(item => item.label === zoomLevel);
    const since =
        zoomLevel !== 'all'
            ? moment()
                .subtract(currentRange.count, currentRange.step)
                .format("YYYY-MM-DD")
            : "0";

    if ( since === "0" ) {
        return data;
    }

    for ( let ind = 0; ind < data.length; ind++ ) {

        if ( data[ind].x[0] < data[ind].x[data[ind].x.length - 1] ) {
            data[ind].x = data[ind].x.reverse();
            data[ind].y = data[ind].y.reverse();

            if ( data[ind].hasOwnProperty("z") )
                data[ind].z = data[ind].z.map(item => item.reverse());
        }

        const lenTs = data[ind].x.filter(v => v >= since).length;
        const repls = {
            x: new Array(lenTs).fill(NaN),
            y: new Array(lenTs).fill(NaN),
            hovertemplate: new Array(lenTs).fill("")
        };

        if ( data[ind].hasOwnProperty("z") ) {
            repls.z = new Array(data[ind].z.length);
            for ( let rowInd = 0; rowInd < data[ind].z.length; rowInd++ ) {
                repls.z[rowInd] = new Array(lenTs).fill(NaN);
            }
        }

        let counter = 0;
        for ( let valueInd = 0; valueInd < data[ind].x.length; valueInd++ ) {
            if ( data[ind].x[valueInd] >= since ) {
                repls.x[counter] = data[ind].x[valueInd];
                repls.y[counter] = data[ind].y[valueInd];
                repls.hovertemplate[counter] = numeral(data[ind].y[valueInd]).format("0,0.[0]") + labelSuffix;
                if ( data[ind].hasOwnProperty("z") ) {
                    for ( let rowInd = 0; rowInd < repls.z.length; rowInd++ ) {
                        repls.z[rowInd][counter] = data[ind].z[rowInd][valueInd];
                    }
                }
                counter++;
            }
        }

        data[ind].x = repls.x;
        data[ind].y = repls.y;

        if ( data[ind].hasOwnProperty("z") ) {
            data[ind].z = repls.z;
        }
        else {
            data[ind].hovertemplate = repls.hovertemplate;
        }
    }

    return data;

};  // applyZoom


const adjustAxes = (drawData, { payload, labelSuffix, zoom }) => {

    if ( zoom !== "all" ) return drawData;

    for ( let index = 0; index < drawData.data.length; index++ ) {

        if ( !Array.isArray(drawData.data[index]?.hovertemplate) &&
                drawData.data[index]?.type !== "heatmap" &&
                drawData.data[index]?.hoverinfo !== "none" ) {

            drawData.data[index].hovertemplate = [];

            let yValues = [...(payload[index].y ?? [])];

            drawData.data[index].hovertemplate = yValues
                .map(value => numeral(value).format("0,0.[0]") + labelSuffix);

        }

    }

    return drawData;

};  // adjustAxes


class Data {
    constructor(data) {
        this.data = data;
    }

    pipe(func, kwargs, cond = true) {
        if ( cond ) {
            this.data = func(this.data, kwargs)
        }

        return this
    }
} // Data



export const ZoomButtons: ComponentType<*> = ({ timeSeries, minDate, maxDate, setZoom, zoom }) => {

    if ( !timeSeries ) return null;

    return <Toggle style={ { marginTop: "-25px", position: "relative" } }>
        {
            rangeSelector.map(item =>
                moment(minDate) <= moment(maxDate).subtract(item.count, item.step)
                    ? <ToggleButton key={ item.label }
                              className={ "govuk-!-font-size-14" }
                              onClick={ () => setZoom(item.label) }
                              active={ zoom === item.label }>
                        { item.label }
                    </ToggleButton>
                    : null
            )
        }
    </Toggle>;

}; // ZoomButtons


export const LogButton: ComponentType<*> = ({ noLogScale, barmode, std, mid, chartMode, setIsLog, isLog  }) => {

    if (noLogScale || barmode === "stack" || chartMode === "percentage" || std < mid)
        return null;

    return <Toggle style={{ marginTop: "-25px", float: "right", position: "relative" }}>
        <ToggleButton onClick={ () => setIsLog(false) }
                      className={ "govuk-!-font-size-14" }
                      active={ isLog === false }>
            Linear
        </ToggleButton>
        <ToggleButton onClick={ () => setIsLog(true) }
                      className={ "govuk-!-font-size-14" }
                      active={ isLog === true }>
            Log
        </ToggleButton>
    </Toggle>;

}; // LogButton


export const BasePlotter: ComponentType<*> = ({ data: payload, layout = {}, xaxis = {}, yaxis = {},
                                                  config = {}, margin = {}, style = {},
                                                  isTimeSeries = true, SrOnly = "",
                                                  noLogScale=false, ...props }) => {

    const width = useResponsiveLayout(640);
    const [ isLog, setIsLog ] = useState(false);
    const [ zoom, setZoom ] = useState("all");
    const { barmode } = layout;
    const { chartMode } = props;
    const yAxisRef = Object.assign({}, axRef.y);
    let labelSuffix = "";
    let [mid, std] = [0, 0];
    const [ drawData, setDrawData ] = useState({
        data: [],
        ticktext: undefined,
        tickvals: undefined,
        tickmode: undefined,
        mid: mid,
        std: std
    });

    const minDate = isTimeSeries ? min(payload, item => min(item.x)) : null;
    const maxDate = isTimeSeries ? max(payload, item => max(item.x)) : null;

    const isLogScale = (isLog && barmode === "stack") && !noLogScale;
    yAxisRef.ticks = "outside";

    // Alternatives - Non-log: ",.2r" / mobile: 3s
    if ( width === "desktop" ) {
        yAxisRef.tickfont.size = 12;
        if ( isLogScale ) {
            yAxisRef.type = "log";
        }
    }
    else {
        yAxisRef.tickfont.size = 10;
        yAxisRef.ticks = "inside";
    }

    if ( chartMode === "percentage" ) labelSuffix += "%";

    useEffect(() => {

        const { minVal, maxVal, mid, std } = getExtrema(payload, barmode, isLog);

        let data = new Data(payload)
            .pipe(cloneDeep)
            .pipe(applyZoom, { zoomLevel: zoom, labelSuffix }, isTimeSeries && chartMode !== "waffle" )
            .pipe(prepLogData, { original: payload, barmode, minVal, maxVal, width }, isLog)
            .data;

        setDrawData(
            adjustAxes(
                {
                    data, mid, std,
                    ... isLog ? getAxisAttributes({ minVal, maxVal, width }) : {}
                },
                { payload, isTimeSeries, chartMode, labelSuffix, zoom }
            )
        );

    }, [ isLog, payload, zoom, barmode, width, isLog, labelSuffix, isTimeSeries, chartMode ]);

    for ( let index = 0; index < drawData.data.length; index++ ) {
        if ( "overlaying" in drawData.data[index] ) {
            yAxisRef.rangemode = "tozero";
            layout = {
                ...layout,
                yaxis2: {
                    ...yAxisRef,
                    overlaying: drawData.data[index].overlaying,
                    side: drawData.data[index].side,
                    rangemode: "tozero",
                    showgrid: false,

                }
            };

            margin = { ...margin, r: 50 };
        }
    }

    useEffect(() => {
        if ( isLog ) {
            analytics({
                category: "log-scale",
                action: "click",
                label: `${props?.heading} [${document.title}]`,
            })
        }
    }, [ isLog ]);

    useEffect(() => {
        if ( isLog ) {
            analytics({
                category: "preset-zoom",
                action: `${zoom}`,
                label: `${props?.heading} [${document.title}]`,
            })
        }
    }, [ zoom ]);

    if ( !drawData.data?.length ) return <Loading/>;

    // Shapes (specially lines) require custom range.
    if ( "shapes" in layout ) {
        const xMin = moment(min(drawData.data.map(v => min(v.x))))
            .subtract(2, 'day')
            .toDate();

        const xMax = moment(max(drawData.data.map(v => max(v.x))))
            .add(2, 'day')
            .toDate();

        xaxis.range = [xMin, xMax];
    }

    return <div className={ "govuk-!-margin-top-2" }>
        <p className={ "govuk-visually-hidden" }>
            The data that is visualised in the chart is that which is tabulated
            under the "Data" tab. The tables do not include the rolling average metric
            (where the metric is included).
            { SrOnly }
        </p>
        <PlotContainer className={ "govuk-grid-row" }
                          aria-label={ "Displaying a graph of the data" }>
            <ZoomButtons timeSeries={ isTimeSeries } minDate={ minDate }
                         maxDate={ maxDate } zoom={ zoom } setZoom={ setZoom }/>
            <LogButton noLogScale={ noLogScale } barmode={ barmode }
                       setIsLog={ setIsLog } isLog={ isLog }
                       { ...props } { ...drawData }/>
            <Plot
                ariaHidden={ "true" }
                data={ drawData.data }
                config={ {
                    showLink: false,
                    // responsive: true,
                    displaylogo: false,
                    // modeBarButtonsToAdd: ["drawline", "eraseshape"],
                    modeBarButtonsToRemove: [
                        "autoScale2d",
                        "toggleSpikelines",
                        "hoverClosestCartesian",
                        "pan2d",
                        "select2d",
                        "lasso2d",
                        "zoomIn2d",
                        "zoomOut2d",
                        ...width === "desktop" ? []: ["zoom"]
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
                style={ { display: "block", height: 360, ...style } }
                layout={ {
                    hovermode: "x unified",
                    hoverdistance: 1,
                    hoverlabel: {
                        namelength: 50
                    },
                    legend: {
                        orientation: 'h',
                        font: {
                            family: `"GDS Transport", Arial, sans-serif`,
                            size: width === "desktop" ? 14 : 12,
                        },
                        xanchor: 'auto',
                        // yanchor: 'auto'
                        y: -.2
                    },
                    showlegend: true,
                    margin: {
                        l: width === "desktop" ? 45 : 35,
                        r: width === "desktop" ? 10 : 5,
                        b: 35,
                        t: 5,
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
                        tickformat: '%-d %b %Y',
                        tickfont: {
                            family: `"GDS Transport", Arial, sans-serif`,
                            size: width === "desktop" ? 14 : 10,
                            color: "#6B7276"
                        },
                        // rangeslider: {range: ['20202-01-01', new Date().toString()]},
                        ...xaxis,
                        fixedrange: width !== "desktop"
                    },
                    yaxis: {
                        tickmode: drawData?.tickmode,
                        tickvals: drawData?.tickvals,
                        ticktext: drawData?.ticktext,
                        ...yAxisRef,
                        ...yaxis,
                        fixedrange: width !== "desktop"
                    },
                    plot_bgcolor: "rgba(231,231,231,0)",
                    paper_bgcolor: "rgba(255,255,255,0)",
                    ...layout
                } }
                { ...props }
            />
        </PlotContainer>
    </div>;

}; // Plotter
