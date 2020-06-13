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
import { Plotter } from "./plots";
import { movingAverage } from "common/stats";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];



const RadioButtons = () => {

    return <div>
        <form>
            <fieldset className={ "govuk-fieldset" }>
                <div className={ "govuk-radios govuk-radios--small govuk-radios--inline" }>
                    <div className={ "govuk-radios__item" }>
                        <input className={ "govuk-radios__input" } id="changed-name" name="changed-name" type="radio" value="month" />
                        <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name">By specimen date
                        </label>
                    </div>
                    <div className={ "govuk-radios__item" }>
                        <input className={ "govuk-radios__input" } id="changed-name-2" name="changed-name" type="radio" value="year" />
                        <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name-2">By reported date
                        </label>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>

}


const TotalPlot = ({ params }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: {
            cumTestsByPublishDate: "cumTestsByPublishDate",
            date: "date"
        },
        defaultResponse: []
    });

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
            }
        ] }
    />

}; // TotalPlot

const TotalPlotSecondCard = ({ params }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: {
            cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate",
            date: "date"
        },
        defaultResponse: []
    });

    return <Plotter
        data={ [
            {
                name: "People tested",
                x: data.map(item => item?.date ?? null),
                y: data.map(item => item?.cumPeopleTestedByPublishDate ?? null),
                fill: 'tozeroy',
                fillcolor: 'rgba(43,140,196,0.2)',
                line: {
                    color: 'rgb(43,140,196)'
                }
            }
        ] }
    />

}; // TotalPlot


const DailyPlot = ({ params }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                newTestsByPublishDate: "newTestsByPublishDate",
                plannedCapacityByPublishDate: "plannedCapacityByPublishDate",
                date: "date"
            },
            defaultResponse: []
        }),
        date = data.map(item => item?.date ?? ""),
        tested = data.map(item => item?.newTestsByPublishDate ?? null);

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
            }
        ] }
    />

}; // TotalPlot


const DailyPlotSecondCard = ({ params }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
                date: "date"
            },
            defaultResponse: []
        }),
        date = data.map(item => item?.date ?? ""),
        tested = data.map(item => item?.newPeopleTestedByPublishDate ?? null);

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
            }
        ] }
    />

}; // TotalPlot


const OneTheseStacks = ({ params }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                newPillarOneTestsByPublishDate: "newPillarOneTestsByPublishDate",
                newPillarTwoTestsByPublishDate: "newPillarTwoTestsByPublishDate",
                newPillarThreeTestsByPublishDate: "newPillarThreeTestsByPublishDate",
                newPillarFourTestsByPublishDate: "newPillarFourTestsByPublishDate",
                date: "date"
            },
            defaultResponse: []
        }),
        date = data.map(item => item?.date ?? ""),
        tested = data.map(item => item?.newPeopleTestedByPublishDate ?? null);

    // if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "NHS and PHE testing",
                x: date,
                y: data.map(item => item?.newPillarOneTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#6F777B'
                }
            },
            {
                name: "Commercial partner testing",
                x: date,
                y: data.map(item => item?.newPillarTwoTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#005EA5'
                }
            },
            {
                name: "Antibody testing",
                x: date,
                y: data.map(item => item?.newPillarThreeTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#29A197'
                }
            },
            {
                name: "Surveillance testing",
                x: date,
                y: data.map(item => item?.newPillarFourTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#B58840'
                }
            },
        ] }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


const CumOneTheseStacks = ({ params }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                cumPillarOneTestsByPublishDate: "cumPillarOneTestsByPublishDate",
                cumPillarTwoTestsByPublishDate: "cumPillarTwoTestsByPublishDate",
                cumPillarThreeTestsByPublishDate: "cumPillarThreeTestsByPublishDate",
                cumPillarFourTestsByPublishDate: "cumPillarFourTestsByPublishDate",
                date: "date"
            },
            defaultResponse: []
        }),
        date = data.map(item => item?.date ?? "");

    // if (!data) return <MainLoading/>

    return <Plotter
        data={ [
            {
                name: "NHS and PHE testing",
                x: date,
                y: data.map(item => item?.cumPillarOneTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#6F777B'
                }
            },
            {
                name: "Commercial partner testing",
                x: date,
                y: data.map(item => item?.cumPillarTwoTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#005EA5'
                }
            },
            {
                name: "Antibody testing",
                x: date,
                y: data.map(item => item?.cumPillarThreeTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#29A197'
                }
            },
            {
                name: "Surveillance testing",
                x: date,
                y: data.map(item => item?.newPillarFourTestsByPublishDate ?? null ),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: '#B58840'
                }
            },
        ] }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams;
        // totalData = useApi({conjunctiveFilters: params, structure: Structures.totalData});

    return <Fragment>
        <BigNumberContainer>
            <BigNumber
                caption={ "All time total" }
                title={ "Number of tests" }
                number={ "N/A" }
            />
            <BigNumber
                caption={ "Current daily" }
                title={ "Planned lab-capacity" }
                number={ "N/A" }
            />
        </BigNumberContainer>

        <FullWidthCard heading={ "Testing and capacity" }>
            {/*<RadioButtons/>*/}
            <TabLinkContainer>
                <TabLink label={ "Daily" }>
                    <DailyPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <TotalPlot params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                    {/*<DataTable args={ [dailyData, dailyData] }/>*/}
                </TabLink>
            </TabLinkContainer>
        </FullWidthCard>

        <FullWidthCard heading={ "People tested" }>
            <TabLinkContainer>
                <TabLink label={ "Daily" }>
                    <DailyPlotSecondCard params={ params }/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <TotalPlotSecondCard params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                    {/*<DataTable args={ [dailyData, dailyData] }/>*/}
                </TabLink>
            </TabLinkContainer>
        </FullWidthCard>

        <FullWidthCard heading={ "Type of testing" }>
            <TabLinkContainer>
                <TabLink label={ "Daily" }>
                    <OneTheseStacks params={ params }/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <CumOneTheseStacks params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                     Placeholder
                </TabLink>

            </TabLinkContainer>
        </FullWidthCard>

        <FullWidthCard heading={ "Testing by nation" }>
            <TabLinkContainer>
                <TabLink label={ "Daily" }>
                    <OneTheseStacks params={ params }/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <OneTheseStacks params={ params }/>
                </TabLink>
                <TabLink label={ "Data" }>
                     Placeholder
                </TabLink>

            </TabLinkContainer>
        </FullWidthCard>
    </Fragment>
};

export default withRouter(Testing);
