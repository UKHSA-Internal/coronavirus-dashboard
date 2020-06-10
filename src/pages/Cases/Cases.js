// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard, FullWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import { Table } from "components/GovUk/Table"
import { getParams, getParamValueFor, firstObjWithMax } from "common/utils";
import { movingAverage, leastSquareRegression } from "common/stats";
import { Plotter, Choropleth, ScatterPlotWithTrendLine } from "./plots";
import { MainLoading } from "components/Loading";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { zip } from "d3-array";
import URLs from "common/urls";

import {
    VisContainer,
    VisItem
} from "./Cases.styles";



const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ],
    Structures = {
        totalData: {
            cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate",
            cumCasesByPublishDate: "cumCasesByPublishDate",
            date: "date",
        },
        dailyData: {
            newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
            newCasesByPublishDate: "newCasesByPublishDate",
            date: "date",
        },
        // dailyCollective:  {
        //     rate: "dailyTotalLabConfirmedCasesRate",
        //     cases: "totalLabConfirmedCases",
        //     code: "areaCode",
        //     name: "areaName",
        //     date: "specimenDate"
        // }
    };


const TotalPlot = ({ data }) => {

    if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "Number of people tested",
                x: data.map(item => item?.date ?? null),
                y: data.map(item => item?.cumPeopleTestedByPublishDate ?? null),
                fill: 'tozeroy',
                line: {
                    color: 'rgb(108,108,108)'
                },
                fillcolor: 'rgba(108,108,108,0.2)'
            },
            {
                name: "Number of cases",
                x: data.map(item => item?.date ?? null),
                y: data.map(item => item?.cumCasesByPublishDate ?? null),
                fill: 'tozeroy',
                fillcolor: 'rgba(43,140,196,0.2)',
                line: {
                    color: 'rgb(43,140,196)'
                }
            }
        ] }
    />

}; // TotalPlot


const DailyPlot = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const
        date = data.map(item => item?.date ?? ""),
        tested = data.map(item => item?.newPeopleTestedByPublishDate ?? null),
        cases = data.map(item => item?.newCasesByPublishDate ?? null),
        testedRollingAve = movingAverage(data.map(item => item?.newPeopleTestedByPublishDate ?? 0), 7),
        casesRollingAve = movingAverage(data.map(item => item?.newPeopleTestedByPublishDate ?? 0), 7);

    for (let index = 0; index < 7; index ++) {
        testedRollingAve[index] = NaN;
        casesRollingAve[index] = NaN;
    }

    return <Plotter
        data={ [
            {
                name: "Number of people tested",
                x: date,
                y: tested,
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#2B8CC4'
                }
            },
            {
                name: "Number of cases",
                x: date,
                y: cases,
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#F47738',
                }
            },
            {
                name: "People tested (7-day average)",
                x: date,
                y: testedRollingAve,
                type: "line",
                line: {
                    width: 3,
                    dash: "dash",
                    color: 'rgb(106,106,106)'
                }
            },
            {
                name: "Cases (7-day average)",
                x: date,
                y: casesRollingAve,
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

    return null
    return <Table
        head={[
            [
                { value: "", colSpan: 1 },
                { value: "Daily", colSpan: 3 },
                { value: "Cumulative", colSpan: 3 },
            ],
            [
                { value: "Specimen date", type: "date" },
                { value: "Previously reported", type: "numeric" },
                { value: "Change", type: "numeric" },
                { value: "Total confirmed", type: "numeric" },
                { value: "Previously reported", type: "numeric" },
                { value: "Change", type: "numeric" },
                { value: "Total confirmed", type: "numeric" },
            ]
        ]}
        body={
            zip(...args).map(([ daily, total ]) => [
                daily.date,
                daily.casesPrev, daily.casesChange, daily.cases,
                total.casesPrev, total.casesChange, total.cases,
            ])
        }
    />

};  // DataTable


const CasesMap = ({ data, ...props }) => {

    const GeoJSONPath = `${ URLs.baseGeo }ltlas_v1.geojson`;

    if ( !data ) return <MainLoading/>

    const
        sortedData = data.sort(({ code: a }, { code: b }) => (a < b) || -((a > b) || 0)),
        rates = sortedData.map(item => item.rate || 0),
        cases = sortedData.map(item => item.cases || 0),
        codes = sortedData.map(item => item.code),
        names = sortedData.map(item => item.name),
        trendDomain = [Math.min(...rates) - 10, Math.max(...rates) + 10],
        [trend_X, trend_Y] = leastSquareRegression(cases, rates, trendDomain);

    return <VisContainer { ...props }>

        <VisItem>
            <div>
                <ScatterPlotWithTrendLine
                    scatterData={ {
                        x: rates,
                        y: cases,
                        text: names,
                        // xaxis: {
                        //     // title: { text: "Incident rate"  }
                        //         },
                        // yaxis: {
                        //     // title: { text: "Total cases" }
                        //     },
                    } }
                    trendLineData={ { x: trend_X, y: trend_Y } }
                />
            </div>
        </VisItem>

        <VisItem>
            <div>
                <Choropleth data={ {
                    geojson: GeoJSONPath,
                    locations: codes,
                    featureidkey: 'properties.lad19cd',
                    text: names,
                    z: rates,
                    zmin: trendDomain[0],
                    zmax: trendDomain[1],
                } }/>
            </div>
        </VisItem>

    </VisContainer>

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
            conjunctiveFilters: [
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

        <FullWidthCard caption={ `Cases in ${ getParamValueFor(params, "areaName") } by date` }>

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
        <FullWidthCard caption={ 'Confirmed cases rate by location' }>
            {/*<FlexContainer>*/}
                <CasesMap data={ dailyCollectiveData }/>
                {/*<CasesMap data={ dailyCollectiveData }/>*/}
            {/*</FlexContainer>*/}
        </FullWidthCard>
    </Fragment>

};  // Cases


export default withRouter(Cases);
