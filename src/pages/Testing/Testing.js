// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { FullWidthCard } from 'components/Card';
import type { Props } from './Testing.types';
import { Container } from './Testing.styles';
import { getParams } from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { MainLoading } from "components/Loading";
import { Plotter } from "./plots";
import { movingAverage } from "../../common/stats";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


const TotalPlot = ({ params }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: {
            cumTestsByPublishDate: "cumTestsByPublishDate",
            // cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate",
            date: "date"
        },
        defaultResponse: []
    });
    // if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "Tests",
                x: data.map(item => item?.date ?? null),
                y: data.map(item => item?.cumTestsByPublishDate ?? null),
                fill: 'tozeroy',
                line: {
                    color: 'rgb(108,108,108)'
                },
                fillcolor: 'rgba(108,108,108,0.2)'
            },
            // {
            //     name: "People tested",
            //     x: data.map(item => item?.date ?? null),
            //     y: data.map(item => item?.cumPeopleTestedByPublishDate ?? null),
            //     fill: 'tozeroy',
            //     fillcolor: 'rgba(43,140,196,0.2)',
            //     line: {
            //         color: 'rgb(43,140,196)'
            //     }
            // }
        ] }
    />

}; // TotalPlot


const DailyPlot = ({ params }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                newTestsByPublishDate: "newTestsByPublishDate",
                // newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
                plannedCapacityByPublishDate: "plannedCapacityByPublishDate",
                date: "date"
            },
            defaultResponse: []
        }),
        date = data.map(item => item?.date ?? ""),
        tested = data.map(item => item?.newTestsByPublishDate ?? null);
        // peopleTested = data.map(item => item?.newPeopleTestedByPublishDate ?? null);

    // if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "Tests",
                x: date,
                y: tested,
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#2B8CC4'
                }
            },
            // {
            //     name: "People tested",
            //     x: date,
            //     y: peopleTested,
            //     fill: 'tozeroy',
            //     type: "bar",
            //     marker: {
            //         color: '#F47738',
            //     }
            // },
            {
                name: "Lab capacity",
                x: date,
                y: data.map(item => item?.plannedCapacityByPublishDate ?? null),
                type: "line",
                line: {
                    width: 3,
                    // dash: "dash",
                    color: 'rgb(106,106,106)'
                }
            },
            {
                name: "Tests (7-day average)",
                x: date,
                y: movingAverage(tested, 7),
                type: "line",
                line: {
                    width: 3,
                    dash: "dash",
                    color: '#F47738'
                }
            },
            // {
            //     name: "People tested (7-day average)",
            //     x: date,
            //     y: movingAverage(peopleTested, 7),
            //     type: "line",
            //     line: {
            //         width: 3,
            //         dash: "dash",
            //         color: '#F47738'
            //     }
            // }
        ] }
    />

}; // TotalPlot



const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams;
        // totalData = useApi({conjunctiveFilters: params, structure: Structures.totalData});

    return <Fragment>
        {/*<BigNumberContainer>*/}
        {/*    <BigNumber*/}
        {/*        caption={ "All time total" }*/}
        {/*        title={ "Number of tests" }*/}
        {/*        number={ "3,090,566" }*/}
        {/*    />*/}
        {/*    <BigNumber*/}
        {/*        caption={ "Current daily" }*/}
        {/*        title={ "Planned lab-capacity" }*/}
        {/*        number={ "145,855" }*/}
        {/*    />*/}
        {/*</BigNumberContainer>*/}

        <FullWidthCard caption={ "Testing in the UK by date" }>
            <TabLinkContainer>
                <TabLink label={ "Cumulative" }>
                    <TotalPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Daily" }>
                    <DailyPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                    {/*<DataTable args={ [dailyData, dailyData] }/>*/}
                </TabLink>
            </TabLinkContainer>
        </FullWidthCard>
        <FullWidthCard caption={ "Daily breakdown by pillar" } />
    </Fragment>
};

export default withRouter(Testing);
