// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { MainLoading } from "components/Loading";
import { getParams, hexToRgb, strFormat } from "common/utils";
import { movingAverage } from "common/stats";

import useApi from "hooks/useApi";

import { Plotter } from "./plots";

import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import type {
    DailySummaryCardProps
} from "./DailySummary.types"


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
                heading={ "Number of COVID-19 associated deaths" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.newDeathsByPublishDate ?? "No data" }
                secondaryLabel={ 'Total' }
                secondaryValue={ groupBySpecimenDate[maxSpecimenDate]?.cumDeathsByPublishDate ?? "No data" }
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
                heading={ "Patients in hospital" }
                primaryValue={  groupBySpecimenDate[maxSpecimenDate]?.hospitalCases ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                heading={ "Patients in mechanical ventilation beds" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.covidOccupiedMVBeds ?? "No data"  }
                colourValue={ '#6F777B' }
            />
            <ValueItem
                heading={ "Patients admitted" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.newAdmissions ?? "No data" }
                secondaryLabel={ 'Total' }
                secondaryValue={ groupBySpecimenDate[maxSpecimenDate]?.cumAdmissions ?? "No data" }
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
                heading={ "Number of tests" }
                // value={ groupBySpecimenDate[maxSpecimenDate]?.cases ?? 0 }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.newTestsByPublishDate ?? "No data" }
                primaryDescription={ "Daily number of tests reported on {date}" }
                secondaryLabel={ 'Total' }
                secondaryValue={ groupBySpecimenDate[maxSpecimenDate]?.cumTestsByPublishDate ?? "No data" }
                secondaryDescription={ 'Total number of tests reported up to {date}' }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                heading={ "Testing capacity" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.plannedCapacityByPublishDate ?? "No data" }
                primaryDescription={ 'Estimated total lab capacity on {date}' }
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
                heading={ "Number of lab-confirmed cases" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.newCasesByPublishDate ?? "No data" }
                secondaryLabel={ 'Total' }
                secondaryValue={ groupBySpecimenDate[maxSpecimenDate]?.cumCasesByPublishDate ?? "No data" }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                heading={ "Number of people tested" }
                primaryValue={ groupBySpecimenDate[maxSpecimenDate]?.newPeopleTestedByPublishDate ?? "No data" }
                secondaryLabel={ 'Total' }
                secondaryValue={ groupBySpecimenDate[maxSpecimenDate]?.cumPeopleTestedByPublishDate ?? "No data" }
                colourValue={ '#6F777B' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // TestingCard


/**
 *
 * @param data - Must always be sorted by date (descending).
 * @param valueKey
 */
const getMaxDateValuePair = ( data: Array<{ [string]: string | number | null }>, valueKey: string ): { date: string | null, value: string | number | null } =>  {

    if ( !valueKey ) return { date: null, value: null };

    for ( const { [valueKey]: value, date } of data ) {

        if ( value )
            return { date: moment(date).format("dddd, D MMMM YYYY"), value: value };

    }

    return { date: null, value: null }

};


const DailySummaryCard = ({ params, layout, heading }: DailySummaryCardProps) => {

    const structure = { date: "date" };

    for ( const { primaryValue, secondaryValue=null, ...rest } of layout )  {

        structure[primaryValue] = primaryValue;

        if ( secondaryValue )
            structure[secondaryValue] = secondaryValue;

        if ( rest?.chart ?? null )
            structure[rest.chart.variableName] = rest.chart.variableName;

    }

    const  data = useApi({
        conjunctiveFilters: params,
        structure: structure
    });

    const
        date = data.map(item => item?.date ?? null),
        groupedByDate = groupByUniqueKey(data, 'date'),
        maxDate = max(Object.keys(groupedByDate));

    return <HalfWidthCard heading={ heading }>
        <VisualSection>
            <Plotter
                data={
                    layout
                        .filter(item => item.hasOwnProperty("chart"))
                        .map(item => {
                            const yData =
                                    data.map(variable => variable?.[item.chart.variableName] ?? null),
                                    { r, g, b } = hexToRgb(item.chart.colour);

                            return {
                                x: date,
                                y: item.chart.rollingAverage ? movingAverage(yData, 7) : yData,
                                type: 'line',
                                mode: 'lines',
                                fill: 'tozeroy',
                                fillcolor: `rgba(${r},${g},${b},0.1)`,
                                line: {
                                    color: item.chart.colour
                                }
                            }
                        })
                }
            />
        </VisualSection>
        <ValueItemsSection>{
            layout.map(({ primaryValue, secondaryValue=null, primaryTooltip="", secondaryTooltip="", ...rest }, index) => {

                const
                    primaryData = getMaxDateValuePair(data, primaryValue),
                    secondaryData = getMaxDateValuePair(data, secondaryValue),
                    primaryReplacements = { kwargs: primaryData },
                    secondaryReplacements = { kwargs: primaryData };

                return <ValueItem
                    key={ index }
                    primaryValue={ primaryData.value }
                    primaryTooltip={ strFormat(primaryTooltip, primaryReplacements) }
                    primaryModal={ primaryValue }
                    primaryModalReplacements={ primaryReplacements }
                    secondaryValue={ secondaryData.value }
                    secondaryTooltip={ strFormat(secondaryTooltip, secondaryReplacements) }
                    secondaryModal={ secondaryValue }
                    secondaryModalReplacements={ secondaryReplacements }

                    { ...rest }
                />
            })
        }</ValueItemsSection>
    </HalfWidthCard>

};  // DailySummaryCard


const DailySummary = ({ location: { search: query } }) => {

    const
        pageLayout = usePageLayout(URLs.pageLayouts.UKSummary),
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !pageLayout ) return <MainLoading/>;

    return <Container className={ "util-flex util-flex-wrap" }>{
        pageLayout.summary.map(item =>
            <DailySummaryCard
                key={ item.heading }
                params={ params }
                heading={ item.heading }
                layout={ item.fields }/>
        )
    }</Container>

};  // DailySummary

export default withRouter(DailySummary)
