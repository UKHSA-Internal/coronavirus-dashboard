// @flow

import React, { Fragment, useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard, FullWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import * as Styles from './Cases.styles';

import axios from 'axios';
import { createQuery, getParams, getParamValueFor, movingAverage } from "common/utils";
import { Plotter } from "./plots";
import { MainLoading } from "components/Loading";
import deepEqual from "deep-equal";
import URLs from "common/urls";
import { TabLink, TabLinkContainer } from "../../components/TabLink";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


const usePrevious = (value) => {

    const ref = useRef([]);

    useEffect(() => {
        ref.current = value
    })

    return ref.current

};  // usePrevious


const useDailyData = (params) => {

    const
        [ data, setData ] = useState([]),
        prevParams =  usePrevious(params);

    useEffect(() => {

        const urlParams = createQuery([
                {
                    key: 'filters',
                    sign: '=',
                    value: createQuery(params, ";", "")
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
            if ( !deepEqual(prevParams, params) )
                try {
                    const { data: dt } = await axios.get(URLs.api + urlParams);
                    setData(dt.data)
                } catch (e) {}
        }

        getData()

    }, [ params ])

    return data

}; // GetData


const useTotalData = (params) => {

    const
        [ data, setData ] = useState([]),
        prevParams =  usePrevious(params);

    useEffect(() => {

        const urlParams = createQuery([
            {
                key: 'filters',
                sign: '=',
                value: createQuery(params, ";", "")
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
            if ( !deepEqual(prevParams, params) )
                try {
                    const { data: dt } = await axios.get(URLs.api + urlParams);
                    setData(dt.data)
                } catch (e) {}
        }

        getData()

    }, [ params ])

    return data

}; // GetTotalData


const TotalPlot = ({ params }) => {

    const data = useTotalData(params);

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

}; // TotalPlot


const DailyPlot = ({ params }) => {

    const data = useDailyData(params);

    if (!data) return <MainLoading/>;

    const average =  movingAverage(data.map(item => item?.daily ?? 0), 7)
        .map(item => Math.round(item ,1));

    for (let index = 0; index < 7; index ++)
        average[index] = NaN;

    return <Plotter
        data={ [
            {
                name: "Daily cases",
                x: data.map(item => item?.date ?? ""),
                y: data.map(item => item?.daily ?? 0),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#5a9dd5'
                }
            },
            {
                name: "Rolling average",
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


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams;

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

        <FullWidthCard caption={ `Cases in ${ getParamValueFor(params, "areaName") } by date` }>
            <TabLinkContainer>
                <TabLink label={ "Cumulative" }>
                    <TotalPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Daily" }>
                    <DailyPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                    <p>Data content</p>
                </TabLink>
            </TabLinkContainer>
        </FullWidthCard>

        <FullWidthCard caption={ 'Confirmed cases rate by location' }/>

    </Fragment>

};  // Cases


export default withRouter(Cases);
