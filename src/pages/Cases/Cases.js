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


const API_URL = 'https://uks-covid19-pubdash-dev.azure-api.net/fn-coronavirus-dashboard-pipeline-etl-dev/v1/data';


const GetDailyData = ( params=[] ) => {

    const
        [ data, setData ] = useState(null),
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
            setData(dt)
        }

        getData()

    }, [])

    return data

}; // GetData



const GetTotalData = (params=[]) => {

    const
        [data, setData] = useState(null),
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
            setData(dt)
        }

        getData()

    }, [])

    return data

}; // GetTotalData


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        params = getParams(query),
        data = GetDailyData(params),
        totalData = GetTotalData(params);


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
            <FullWidthCard caption={ `Cases in ${ getParamValueFor(params, "areaName") } by date` }/>
            <FullWidthCard caption={ 'Confirmed cases rate by location' }/>
        </Styles.FlexContainer>
    </Fragment>

};


export default withRouter(Cases);
