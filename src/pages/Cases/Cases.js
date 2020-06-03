// @flow

import React, { Fragment, useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard, FullWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import { Table } from './Cases.styles';

import { getParams, getParamValueFor, movingAverage, firstObjWithMax } from "common/utils";
import { Plotter, Mapper } from "./plots";
import { MainLoading } from "components/Loading";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { zip } from "d3-array";
import numeral from "numeral";
import axios from "axios";
import URLs from "../../common/urls";



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


const useGeoJSON = (type="countries") => {

    const [ data, setData ] = useState(null);

    useEffect(() => {

        (async () => {
            const { data } = await axios.get(
                `${ type }_v1.geojson`,
                { baseURL: URLs.baseGeo }
            );
            setData(data)
        })()

    }, [ type ]);

    return data

};

const CasesMap = ({ ...props }) => {

    const
        geoData = useGeoJSON("ltlas"),
        data = useApi(
            [
                {key: "areaType", sign: "=", value: "ltla"},
            ],
            Structures.dailyCollective,
            [],
            [
                {key: "latestBy", value: "specimenDate", sign: "="}
            ]
        );

    if ( !geoData || !data ) return <MainLoading/>

    const
        sortedData = data.sort(({ code: a }, { code: b }) => (a < b) || -((a > b) || 0)),
        rates = sortedData.map(item => item.rate),
        codes = sortedData.map(item => item.code),
        names = sortedData.map(item => item.name);

    return <Mapper
        data={ [
        {
            type: 'choroplethmapbox',
            geojson: 'https://c19pub.azureedge.net/assets/geo/ltlas_v1.geojson',
            locations: codes,
            featureidkey: 'properties.lad19cd',
            text: names,
            z: rates,
            hoverinfo: 'text+z',
            colorscale: [
                [0, 'rgb(5, 10, 172)'], [0.35, 'rgb(40, 60, 190)'],
                [0.5, 'rgb(70, 100, 245)'], [0.6, 'rgb(90, 120, 245)'],
                [0.7, 'rgb(106, 137, 247)'], [1, 'rgb(220, 220, 220)']],
            autocolorscale: false,
            reversescale: true,
            colorbar: {
                thickness: 10,
                thickfont: {
                    family: `"GDS Transport", Arial, sans-serif`
                },
                title: "Rate per 100,000 resident population"
            },
            hoverlabel: {
                font: {
                    family: `"GDS Transport", Arial, sans-serif`
                },
            },
            center: {'lat': 53.5, 'lon': -2},
            marker: {
                line: {
                    color: 'rgb(104,104,104)',
                    width: 1
                }
            }
        }
    ] }/>

};  // CasesMap


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        dailyData = useApi(params, Structures.dailyData),
        totalData = useApi(params, Structures.totalData);

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
            <CasesMap/>
        </FullWidthCard>
    </Fragment>

};  // Cases


export default withRouter(Cases);
