// @flow

import React, { Fragment, useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard, FullWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import { Table, FlexContainer } from './Cases.styles';

import { getParams, getParamValueFor, movingAverage, firstObjWithMax } from "common/utils";
import { Plotter, Mapper } from "./plots";
import { MainLoading } from "components/Loading";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { zip } from "d3-array";
import numeral from "numeral";
import axios from "axios";
import URLs from "../../common/urls";
import Plot from "react-plotly.js";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ],
    Structures = {
        totalData: {
            cases: "totalLabConfirmedCases",
            casesChange: "changeInTotalCases",
            casesPrev: "previouslyReportedTotalCases",
            date: "specimenDate",
            code: "areaCode"
        },
        dailyData: {
            cases: "dailyLabConfirmedCases",
            casesChange: "changeInDailyCases",
            casesPrev: "previouslyReportedDailyCases",
            date: "specimenDate",
            code: "areaCode"
        },
        dailyCollective:  {
            rate: "dailyTotalLabConfirmedCasesRate",
            cases: "totalLabConfirmedCases",
            code: "areaCode",
            name: "areaName",
            date: "specimenDate"
        }
    };


const TotalPlot = ({ data }) => {

    if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "Cumulative cases",
                x: data.map(item => item?.date ?? ""),
                y: data.map(item => item?.cases ?? 0),
                fill: 'tozeroy',
                line: {
                    color: 'rgb(108,108,108)'
                },
                fillcolor: 'rgba(108,108,108,0.2)'
            }
        ] }
    />

}; // TotalPlot


const DailyPlot = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const average =  movingAverage(data.map(item => item?.cases ?? 0), 7)
        .map(item => Math.round(item ,1));

    for (let index = 0; index < 7; index ++)
        average[index] = NaN;

    return <Plotter
        data={ [
            {
                name: "Previously reported",
                x: data.map(item => item?.date ?? ""),
                y: data.map(item => Math.min(item?.casesPrev ?? 0, item?.casesPrev ?? 0 + item?.casesChange ?? 0)),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#5a9dd5'
                }
            },
            {
                name: "Newly reported",
                x: data.map(item => item?.date ?? ""),
                y: data.map(item => Math.max(item?.casesChange ?? 0, 0)),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#ff8033',
                }
            },
            {
                name: "Rolling average of the total",
                x: data.map(item => item?.date ?? ""),
                y: average,
                type: "line",
                line: {
                    width: 3,
                    dash: "dash",
                    color: 'rgb(106,106,106)'
                }
            }
        ] }
    />

}; // TotalPlot


const TotalCases = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const value = firstObjWithMax(data, item => item?.date ?? null)?.cases

    return <BigNumber
        caption={ "All time total" }
        title={ "Lab-confirmed positive cases" }
        number={  value || "No data" }
    />

};  // TotalCasesFigure


const TotalTested = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const value = firstObjWithMax(data, item => item?.date ?? null)?.tested

    return <BigNumber
        caption={ "All time total" }
        title={ "Number of people tested" }
        number={  value || "No data" }
    />

};  // TotalCasesFigure


const TotalRecovered = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const value = firstObjWithMax(data, item => item?.date ?? null)?.recovered

    return <BigNumber
        caption={ "All time total" }
        title={ "Patients recovered" }
        number={  value || "No data" }
    />

};  // TotalCasesFigure


const DataTable = ({ args }) => {

    return <Table className={ "govuk-table sticky-header" }>
        <thead className={ "govuk-table__head" }>
            <tr className={ "govuk-table__row" }>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header' }/>
                <th scope={ 'col' } colSpan={ 3 } className={ 'govuk-table__header' }>Daily</th>
                <th scope={ 'col' } colSpan={ 3 } className={ 'govuk-table__header' }>Cumulative</th>
            </tr>
            <tr className={ "govuk-table__row" }>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header' }>Specimen date</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Previously reported</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Change</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Total confirmed</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Previously reported</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Change</th>
                <th scope={ 'col' } colSpan={ 1 } className={ 'govuk-table__header govuk-table__header--numeric' }>Total confirmed</th>
            </tr>
        </thead>
        <tbody className={ "govuk-table__body" }>{
            zip(...args).map(([ daily, total ], index) =>
                <tr key={ `row-${index}` } className={ 'govuk-table__row' }>
                    <td className={ "govuk-table__cell" }>{ daily.date }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(daily.casesPrev).format("0,0") }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(daily.casesChange).format("0,0") }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(daily.cases).format("0,0") }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(total.casesPrev).format("0,0") }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(total.casesChange).format("0,0") }</td>
                    <td className={ "govuk-table__cell govuk-table__cell--numeric" }>{ numeral(total.cases).format("0,0") }</td>
                </tr>
            )
        }</tbody>
    </Table>

};  // DataTable


const calculateTrendLine =  (x, y, domain) => {

    const
        XY = zip(x, y),
        N = XY.length,
        sigmaXY = XY.reduce((acc,[x_i, y_i]) => acc + (x_i * y_i), 0),
        sigmaX =  x.reduce((acc, val) => acc + val, 0),
        sigmaY =  x.reduce((acc, val) => acc + val, 0),
        sigmaX2 =  x.reduce((acc, val) => acc + (val * val), 0);

    const
        numerator = (N * sigmaXY) - (sigmaX * sigmaY),
        denominator = (N * sigmaX2) - (sigmaX * sigmaX),
        m = numerator / denominator,
        b  =  (sigmaY - (m * sigmaX)) / N,
        Y  = [],
        X = domain;

    for ( let x_i of X )
        Y.push(Math.round(m * x_i + b))

    return [X, Y]

}


const CasesMap = ({ data, ...props }) => {

    const GeoJSONPath = `${ URLs.baseGeo }ltlas_v1.geojson`;

    if ( !data ) return <MainLoading/>

    const
        sortedData = data.sort(({ code: a }, { code: b }) => (a < b) || -((a > b) || 0)),
        rates = sortedData.map(item => item.rate || 0),
        cases = sortedData.map(item => item.cases || 0),
        codes = sortedData.map(item => item.code),
        names = sortedData.map(item => item.name),
        [X, Y] = calculateTrendLine(cases, rates, [Math.min(...rates) - 10, Math.max(...rates) + 10]);

    return <div style={{ display: "flex", flexFlow: "row-wrap", flex: "1 1 100%" }}>

        <div style={{  flex: "1 2 50%"  }}>
            <div>
                <Plotter
                    data={[
                        {
                            name: "b",
                            x: rates,
                            y: cases,
                            text: names,
                            type: 'scatter',
                            mode: 'markers',
                            showlegend: false,
                            marker: {
                                size: 8
                            },
                            fillcolor: 'rgb(0, 94, 165)',
                        },
                        {
                            name: "b",
                            x: X,
                            y: Y,
                            showlegend: false,
                            // type: "line",
                            mode: "lines",
                            line: {
                                width: 3,
                                dash: "dash",
                                color: 'rgba(109,109,109,0.7)'
                            },
                        }
                    ]}
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
                        }
                    } }
                    layout={ {
                        barmode: 'stack',
                        height: 500,
                        // width: 400,
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
                            l: 40,
                            r: 10,
                            b: 20,
                            t: 0,
                            pad: 0
                        },
                        xaxis: {
                            showgrid: false,
                            zeroline: false,
                            showline: false,
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
                />
            </div>
        </div>

        <div style={{ flex: "1 2 50%" }}>
            <div>
                <Plotter
                    data={ [
                        {
                            name: "a",
                            type: 'choroplethmapbox',
                            geojson: GeoJSONPath,
                            locations: codes,
                            featureidkey: 'properties.lad19cd',
                            text: names,
                            z: rates,
                            hoverinfo: 'text+z',
                            colorscale: [
                                [0, 'rgba(0, 94, 165, 1)'],
                                [1, 'rgba(0, 94, 165, 0)']
                            ],
                            autocolorscale: false,
                            reversescale: true,
                            colorbar: {
                                thickness: 10,
                                thickfont: {
                                    family: `"GDS Transport", Arial, sans-serif`
                                },
                                // title: "Rate per 100,000 resident population"
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
                                    color: '#fff',
                                    width: 1
                                }
                            },
                        }
                    ]}
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
                        }
                    } }
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
                            r: 0,
                            b: 0,
                            t: 0,
                            pad: 0
                        },
                        xaxis: {
                            // domain: [.5, 1],
                            showgrid: false,
                            zeroline: false,
                            showline: false,
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
                     }}
                />
            </div>
        </div>

    </div>

};  // CasesMap



const ScatterPlot = ({ data, ...props }) => {

    if ( !data ) return <MainLoading/>

    return <div>
        <Plotter
            data={[
                {
                    x: data.map(item => item?.death ?? 0),
                    y: data.map(item => item?.rate ?? 0),
                    text: data.map(item => item?.name ?? ""),
                    type: 'scatter',
                    mode: 'markers',
                    showlegend: false,
                    marker: {
                        size: 5
                    },
                    fillcolor: 'rgb(0, 94, 165)'
                }
            ]}
            xaxis={{
                title: "Death",
                titlefont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                    color: "#7f7f7f"
                }
            }}
            yaxis={{
                title: "Cases Rate",
                titlefont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                    color: "#7f7f7f"
                }
            }}
        />
    </div>

};  // ScatterPlot


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        dailyData = useApi({conjunctiveFilters: params, structure: Structures.dailyData}),
        totalData = useApi({conjunctiveFilters: params, structure: Structures.totalData}),
        dailyCollectiveData = useApi({
            conjunctiveParams: [
                { key: "areaType", sign: "=", value: "ltla" },
            ],
            structure: Structures.dailyCollective,
            extraParams: [
                { key: "latestBy", value: "specimenDate", sign: "=" }
            ]
        });

    return <Fragment>
        <BigNumberContainer>
            <TotalCases data={ totalData }/>
            <TotalTested data={ totalData }/>
            <TotalRecovered data={ totalData }/>
        </BigNumberContainer>

        <FullWidthCard heading={ `Cases in ${ getParamValueFor(params, "areaName") } by date` } caption={ "All time total" }>

            <TabLinkContainer>
                <TabLink label={ "Cumulative" }>
                    <TotalPlot data={ totalData }/>
                </TabLink>
                <TabLink label={ "Daily" }>
                    <DailyPlot data={ dailyData }/>
                </TabLink>
                <TabLink label={ "Data" }>
                    <DataTable args={ [dailyData, totalData] }/>
                </TabLink>

            </TabLinkContainer>
        </FullWidthCard>
        <FullWidthCard heading={ 'Confirmed cases rate by location' } caption={ "All time total" }>
            <CasesMap data={ dailyCollectiveData }/>
        </FullWidthCard>
    </Fragment>

};  // Cases


export default withRouter(Cases);
