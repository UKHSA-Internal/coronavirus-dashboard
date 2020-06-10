// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { MainLoading } from "components/Loading";
import { getParams } from "common/utils";
import { movingAverage } from "common/stats";

import useApi from "hooks/useApi";

import { Plotter } from "./plots";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' },
    ],
    Structures = {
        deaths: {
            date: "date",
            newDeathsByPublishDate: "newDeathsByPublishDate",
            cumDeathsByPublishDate: "cumDeathsByPublishDate"
        },
        healthcare: {
            date: "date",
            hospitalCases: "hospitalCases",
            covidOccupiedMVBeds: "covidOccupiedMVBeds",
            newAdmissions: "newAdmissions",
            cumAdmissions: "cumAdmissions"
        },
        cases: {
            date: "date",
            newCasesByPublishDate: "newCasesByPublishDate",
            cumCasesByPublishDate: "cumCasesByPublishDate",
            newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
            cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate",
        },
        testing: {
            date: "date",
            newTestsByPublishDate: "newTestsByPublishDate",
            cumTestsByPublishDate: "cumTestsByPublishDate",
            plannedCapacityByPublishDate: "plannedCapacityByPublishDate"
        }
        // data: {
        //     date: "date",
        //
        //     // Testing
        //     newTestsByPublishDate: "newTestsByPublishDate",
        //     cumTestsByPublishDate: "cumTestsByPublishDate",
        //     plannedCapacityByPublishDate: "plannedCapacityByPublishDate",
        //
        //     // Cases
        //     newCasesByPublishDate: "newCasesByPublishDate",
        //     cumCasesByPublishDate: "cumCasesByPublishDate",
        //     newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
        //     cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate",
        //
        //     // Healthcare
        //     hospitalCases: "hospitalCases",
        //     covidOccupiedMVBeds: "covidOccupiedMVBeds",
        //     newAdmissions: "newAdmissions",
        //     cumAdmissions: "cumAdmissions",
        //
        //     // // deaths
        //     // newDeathsByPublishDate: "newDeathsByPublishDate",
        //     // cumDeathsByPublishDate: "cumDeathsByPublishDate",
        // }
    };


export const timestamp = (data): string =>
    data.hasOwnProperty("metadata")
        ? moment(data?.metadata?.lastUpdatedAt).format("dddd D MMMM YYYY [at] h:mma")
        : "";


const groupByUniqueKey = (data, uniqueKeyName) => {

    try {
        return data
            .reduce((acc, { [uniqueKeyName]: grouper, ...rest }) =>
                grouper ? { ...acc, [grouper]: rest } : acc, {})
    } catch {
        return {}
    }

};  // groupByUniqueKey


const DeathsCard = ({ params, ...props }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: Structures.deaths
    });
    // const nationalData = useApi({
    //     conjunctiveFilters: [
    //         { key: "areaType", sign: "=", value: "nation" }
    //     ],
    //     structure: { name: "areaName", death: "dailyChangeInDeaths" },
    //     extraParams: [{ key: "latestBy", sign: "=", value: "deathReportingDate" }]
    // });

    if ( !data
        // !nationalData
    ) return <MainLoading/>;

    // const
    //     deathReportDate =  data.map(item => item?.deathReportDate ?? ""),
    //     deaths = data.map(item => (item?.deaths ?? 0) || 0),
    //     deathsMovingAverage = movingAverage(deaths, 7),
    //     groupByDeathReportDate = groupByUniqueKey(data, 'deathReportDate'),
    //     maxDeathReportDate = max(Object.keys(groupByDeathReportDate)),
    //     nationalDataDeaths = nationalData.map(item => item?.death ?? ""),
    //     maxDeath = max(nationalDataDeaths);

    const
        // nationalData = [],
        date = data.map(item => item?.date ?? null),
        groupBySpecimenDate = groupByUniqueKey(data, 'date'),
        maxSpecimenDate = max(Object.keys(groupBySpecimenDate)),
        groupByTestDate = groupBySpecimenDate,
        testDate = max(Object.keys(groupByTestDate));

    return <HalfWidthCard heading={ "Deaths" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "New deaths by publish date",
                        x: date,
                        y: movingAverage(data.map(item => item?.newDeathsByPublishDate ?? null), 7),
                        fill: 'tozeroy',
                        type: 'line',
                        mode: 'lines',
                        fillcolor: 'rgba(43,140,196,0.2)',
                        marker: { color: '#2B8CC4' }
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Number of COVID-19 associated deaths" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.newDeathsByPublishDate ?? "No data" }
                description={ 'Total' }
                descriptionValue={ groupBySpecimenDate[maxSpecimenDate]?.cumDeathsByPublishDate ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            {/*<div>*/}
            {/*    <Plotter*/}
            {/*        data={[*/}
            {/*            {*/}
            {/*                name: "Previously reported",*/}
            {/*                y: nationalData.map(({ name="" }) => name.replace(/Northern Ireland/g, "NI")),*/}
            {/*                x: nationalDataDeaths,*/}
            {/*                text: nationalDataDeaths,*/}
            {/*                type: "bar",*/}
            {/*                orientation: "h",*/}
            {/*                width: 0.7,*/}
            {/*                mode: 'marker+text',*/}
            {/*                marker: {*/}
            {/*                    color: '#005EA5'*/}
            {/*                },*/}
            {/*                texttemplate: '%{text:s}',*/}
            {/*                textposition: 'auto',*/}
            {/*                cliponaxis: true,*/}
            {/*                showlegend: false,*/}
            {/*                textfont: {*/}
            {/*                    color: nationalDataDeaths.map(item => item === maxDeath ? '#fff' :  '#005EA5'),*/}
            {/*                    family: `"GDS Transport", Arial, sans-serif`,*/}
            {/*                    size: 11*/}
            {/*                }*/}
            {/*            }*/}
            {/*        ]}*/}
            {/*        layout={{*/}
            {/*            margin: {*/}
            {/*                l: 57,*/}
            {/*                r: 0,*/}
            {/*                b: 0,*/}
            {/*                t: 0,*/}
            {/*                pad: 5*/}
            {/*            },*/}
            {/*            offset: .1,*/}
            {/*            yaxis: {*/}
            {/*                tickfont:{*/}
            {/*                    family: `"GDS Transport", Arial, sans-serif`,*/}
            {/*                    size : 13,*/}
            {/*                    color: "#6f777b",*/}
            {/*                },*/}
            {/*                layer: "below traces"*/}
            {/*            },*/}
            {/*            xaxis: {*/}
            {/*                visible: false,*/}
            {/*                layer: "below traces"*/}
            {/*            },*/}
            {/*            height: 110,*/}
            {/*            uniformtext: {*/}
            {/*                minsize: 8,*/}
            {/*                mode: 'hide'*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</div>*/}
        </ValueItemsSection>
    </HalfWidthCard>

};  // DeathsCard


const HealthcareCard = ({ params, ...props }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: Structures.healthcare
    });

    if ( !data ) return <MainLoading/>;

    const
        date = data.map(item => item?.date ?? null),
        groupBySpecimenDate = groupByUniqueKey(data, 'date'),
        maxSpecimenDate = max(Object.keys(groupBySpecimenDate)),
        groupByTestDate = groupBySpecimenDate,
        testDate = max(Object.keys(groupByTestDate));

    return <HalfWidthCard heading={ "Healthcare" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Patients in hospital",
                        x: date,
                        y: data.map(item => item?.hospitalCases ?? null),
                        fill: 'tozeroy',
                        type: 'line',
                        mode: 'lines',
                        fillcolor: 'rgba(43,140,196,0.2)',
                        marker: { color: '#2B8CC4' }
                    },
                    {
                        name: "Patients in mechanical ventilation beds",
                        x: date,
                        y: data.map(item => item?.covidOccupiedMVBeds ?? null),
                        fill: 'tozeroy',
                        fillcolor: 'rgba(111,119,123,0.1)',
                        line: {
                            color: 'rgb(111,119,123)'
                        }
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Patients in hospital" }
                value={  groupBySpecimenDate[maxSpecimenDate]?.hospitalCases ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "Patients in mechanical ventilation beds" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.covidOccupiedMVBeds ?? "No data"  }
                colourValue={ '#6F777B' }
            />
            <ValueItem
                label={ "Patients admitted" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.newAdmissions ?? "No data" }
                description={ 'Total' }
                descriptionValue={ groupBySpecimenDate[maxSpecimenDate]?.cumAdmissions ?? "No data" }
                // Orange colour
                // colourValue={ '#F47738' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // HealthcareCard


const TestingCard = ({ params, ...props }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: Structures.testing
    });

    if ( !data ) return <MainLoading/>;
            // newTestsByPublishDate: "newTestsByPublishDate",
            // cumTestsByPublishDate: "cumTestsByPublishDate",
            // plannedCapacityByPublishDate: "plannedCapacityByPublishDate"
    const
        date = data.map(item => item?.date ?? null),
        groupBySpecimenDate = groupByUniqueKey(data, 'date'),
        maxSpecimenDate = max(Object.keys(groupBySpecimenDate)),
        groupByTestDate = groupBySpecimenDate,
        testDate = max(Object.keys(groupByTestDate));


    return <HalfWidthCard heading={ "Testing" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Planned capacity by publish date",
                        x: date,
                        y: data.map(item => item?.plannedCapacityByPublishDate ?? null),
                        fill: 'tozeroy',
                        fillcolor: 'rgba(111,119,123,0.1)',
                        line: {
                            color: 'rgb(111,119,123)'
                        }
                    },
                    {
                        name: "New tests by publish date",
                        x: date,
                        y: movingAverage(data.map(item => item?.newTestsByPublishDate ?? null), 7),
                        fill: 'tozeroy',
                        fillcolor: 'rgba(43,140,196,0.2)',
                        line: {
                            color: 'rgb(43,140,196)'
                        }
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Number of tests" }
                // value={ groupBySpecimenDate[maxSpecimenDate]?.cases ?? 0 }
                value={ groupBySpecimenDate[maxSpecimenDate]?.newTestsByPublishDate ?? "No data" }
                description={ 'Total' }
                descriptionValue={ groupBySpecimenDate[maxSpecimenDate]?.cumTestsByPublishDate ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "Testing capacity" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.plannedCapacityByPublishDate ?? "No data" }
                colourValue={ '#6F777B' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};   // CasesCard


const CasesCard = ({ params, ...props }) => {

    const data = useApi({
        conjunctiveFilters: params,
        structure: Structures.cases
    });

    if ( !data ) return <MainLoading/>;

    const
        date = data.map(item => item?.date ?? null),
        groupBySpecimenDate = groupByUniqueKey(data, 'date'),
        maxSpecimenDate = max(Object.keys(groupBySpecimenDate)),
        groupByTestDate = groupBySpecimenDate,
        testDate = max(Object.keys(groupByTestDate));

    //             newCasesByPublishDate: "newCasesByPublishDate",
    //             cumCasesByPublishDate: "cumCasesByPublishDate",
    //             newPeopleTestedByPublishDate: "newPeopleTestedByPublishDate",
    //             cumPeopleTestedByPublishDate: "cumPeopleTestedByPublishDate"

    return <HalfWidthCard heading={ "Cases" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Number of people tested",
                        x: date,
                        y: movingAverage(data.map(item => item?.newPeopleTestedByPublishDate ?? null), 7),
                        type: 'line',
                        mode: 'lines',
                        fill: 'tozeroy',
                        fillcolor: 'rgba(111,119,123,0.1)',
                        line: {
                            color: 'rgb(111,119,123)'
                        }
                    },
                    {
                        name: "Number of lab-confirmed cases",
                        x: date,
                        y: movingAverage(data.map(item => item?.newCasesByPublishDate ?? null), 7),
                        type: 'line',
                        mode: 'lines',
                        fill: 'tozeroy',
                        fillcolor: 'rgba(43,140,196,0.2)',
                        line: {
                            color: 'rgb(43,140,196)'
                        }
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Number of lab-confirmed cases" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.newCasesByPublishDate ?? "No data" }
                description={ 'Total' }
                descriptionValue={ groupBySpecimenDate[maxSpecimenDate]?.cumCasesByPublishDate ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "Number of people tested" }
                value={ groupBySpecimenDate[maxSpecimenDate]?.newPeopleTestedByPublishDate ?? "No data" }
                description={ 'Total' }
                descriptionValue={ groupBySpecimenDate[maxSpecimenDate]?.cumPeopleTestedByPublishDate ?? "No data" }
                colourValue={ '#6F777B' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // TestingCard


const DailySummary = ({ location: { search: query } }) => {

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams;
        // data = useApi({ conjunctiveFilters: params, structure: Structures.data });

    return <Container className={ "util-flex util-flex-wrap" }>
        <TestingCard params={ params }/>
        <CasesCard params={ params }/>
        <HealthcareCard params={ params }/>
        <DeathsCard params={ params }/>
    </Container>

};  // DailySummary

export default withRouter(DailySummary)
