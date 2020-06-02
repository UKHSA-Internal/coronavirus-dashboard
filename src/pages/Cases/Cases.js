// @flow

import React, { Fragment, useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard, FullWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import * as Styles from './Cases.styles';

import axios from 'axios';
import { createQuery, getParams, getParamValueFor } from "common/utils";
import { Plotter } from "./plots";
import { MainLoading } from "components/Loading";


const API_URL = 'https://uks-covid19-pubdash-dev.azure-api.net/fn-coronavirus-dashboard-pipeline-etl-dev/v1/data';


const GetDailyData = ( params=[] ) => {

    const
        [ data, setData ] = useState([]),
        defaultParams = [
            { key: 'areaName', sign: '=', value: 'United Kingdom' },
            { key: 'areaType', sign: '=', value: 'overview' }
        ];


    useEffect(() => {

        const urlParams = createQuery([
                {
                    key: 'filters',
                    sign: '=',
                    value: createQuery(params.length ? params : defaultParams, ";", "")
                },
                {
                    key: 'structure',
                    sign: '=',
                    value: JSON.stringify({
                        daily: "dailyLabConfirmedCases",
                        dailyChange: "changeInDailyCases",
                        dailyPrev: "previouslyReportedDailyCases",
                        date: "specimenDate"
                    })
                }
            ]);

        const getData = async () => {
            const { data: dt } = await axios.get(API_URL + urlParams);
            setData(dt.data)
        }

        getData()

    }, [])

    return data

}; // GetData



const GetTotalData = (params=[]) => {

    const
        [data, setData] = useState([]),
        defaultParams = [
            { key: 'areaName', sign: '=', value: 'United Kingdom' },
            { key: 'areaType', sign: '=', value: 'overview' }
        ];


    useEffect(() => {

        const urlParams = createQuery([
            {
                key: 'filters',
                sign: '=',
                value: createQuery(params.length ? params : defaultParams, ";", "")
            },
            {
                key: 'structure',
                sign: '=',
                value: JSON.stringify({
                    total: "totalLabConfirmedCases",
                    totalChange: "changeInTotalCases",
                    totalPrev: "previouslyReportedTotalCases",
                    date: "specimenDate"
                })
            }
        ]);

        const getData = async () => {
            const { data: dt } = await axios.get(API_URL + urlParams);
            setData(dt.data)
        }

        getData()

    }, [])

    return data

}; // GetTotalData


const TotalPlot = ({ params }) => {

    const data = GetTotalData(params);

    if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "Cumulative cases",
                x: data.map(item => item?.date ?? ""),
                y: data.map(item => item?.total ?? 0),
                fill: 'tozeroy',
                line: {
                    color: 'rgb(108,108,108)'
                },
                fillcolor: 'rgba(108,108,108,0.2)'
            }
        ] }
    />

};

const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        params = getParams(query),
        data = GetDailyData(params);


    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return <Fragment>
        <BigNumberContainer>
            <BigNumber
                caption="All time total"
                title="Lab-confirmed positive cases"
                number="250,908"
            />
            <BigNumber
                caption="All time total"
                title="Number of people tested"
                number="2,064,329"
            />
            <BigNumber
                caption="All time total"
                title="Patients recovered"
                number="75,432"
            />
        </BigNumberContainer>

        <Styles.FlexContainer>
            <FullWidthCard caption={ `Cases in ${ getParamValueFor(params, "areaName") } by date` }>
                <ul className={ 'govuk-tabs__list govuk-!-margin-bottom-3' } role={ 'tablist' }>
                    <li className={ "govuk-tabs__list-item govuk-!-padding-left-1 govuk-tabs__list-item--selected" } role={ "presentation" }>
                        <a className={ "govuk-tabs__tab" } href={ "#past-day" } id={ "tab_past-day" } role={ "tab" }
                           aria-controls={ "past-day" } aria-selected={ "true" } tabIndex={ "0" }>
                            Cumulative
                        </a>
                    </li>
                    <li className={ "govuk-tabs__list-item govuk-!-padding-left-1 govuk-tabs__list-item--selected" }>Daily</li>
                    <li className={ "govuk-tabs__list-item govuk-!-padding-left-1 govuk-tabs__list-item--selected" }>Data table</li>
                </ul>
                <TotalPlot params={ params }/>
            </FullWidthCard>
            <FullWidthCard caption={ 'Confirmed cases rate by location' }/>
        </Styles.FlexContainer>
    </Fragment>

};


export default withRouter(Cases);
