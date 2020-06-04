// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { MainLoading } from "components/Loading";
import { getParams, sum, movingAverage } from "common/utils";

import useApi from "hooks/useApi";

import { Plotter } from "./plots";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ],
    Structures = {
        data: {
            dailyLabCases: "changeInDailyCases",
            deathReportDate: "deathReportingDate",
            specimenDate: "specimenDate",
            deaths: "dailyChangeInDeaths",
            cases: "dailyLabConfirmedCases"
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


const DeathsCard = ({ data }) => {

    const nationalData = useApi({
        conjunctiveFilters: [
            { key: "areaType", sign: "=", value: "nation" }
        ],
        structure: { name: "areaName", death: "dailyChangeInDeaths" },
        extraParams: [{ key: "latestBy", sign: "=", value: "deathReportingDate" }]
    });

    if ( !data || !nationalData ) return <MainLoading/>;

    const
        deathReportDate =  data.map(item => item?.deathReportDate ?? ""),
        deaths = data.map(item => (item?.deaths ?? 0) || 0),
        deathsMovingAverage = movingAverage(deaths, 7),
        groupByDeathReportDate = groupByUniqueKey(data, 'deathReportDate'),
        maxDeathReportDate = max(Object.keys(groupByDeathReportDate)),
        nationalDataDeaths = nationalData.map(item => item?.death ?? ""),
        maxDeath = max(nationalDataDeaths);

    return <HalfWidthCard heading={ "Deaths" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Total lab-confirmed cases",
                        x: deathReportDate,
                        y: deathsMovingAverage,
                        type: 'scatter',
                        fill: 'tozeroy',
                        fillcolor: 'rgba(43,140,196,0.2)'
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Confirmed COVID-19 associated deaths" }
                value={  groupByDeathReportDate[maxDeathReportDate]?.deaths ?? 0 }
                description={ 'Total' }
                descriptionValue={ sum(deaths) }
                colourValue={ '#2B8CC4' }
            />
            <div>
                <Plotter
                    data={[
                        {
                            name: "Previously reported",
                            y: nationalData.map(({ name="" }) => name.replace(/Northern Ireland/g, "NI")),
                            x: nationalDataDeaths,
                            text: nationalDataDeaths,
                            type: "bar",
                            orientation: "h",
                            width: 0.7,
                            mode: 'marker+text',
                            marker: {
                                color: '#005EA5'
                            },
                            texttemplate: '%{text:s}',
                            textposition: 'auto',
                            cliponaxis: true,
                            showlegend: false,
                            textfont: {
                                color: nationalDataDeaths.map(item => item === maxDeath ? '#fff' :  '#005EA5'),
                                family: `"GDS Transport", Arial, sans-serif`,
                                size: 11
                            }
                        }
                    ]}
                    layout={{
                        margin: {
                            l: 57,
                            r: 0,
                            b: 0,
                            t: 0,
                            pad: 5
                        },
                        offset: .1,
                        yaxis: {
                            tickfont:{
                                family: `"GDS Transport", Arial, sans-serif`,
                                size : 13,
                                color: "#6f777b",
                            },
                            layer: "below traces"
                        },
                        xaxis: {
                            visible: false,
                            layer: "below traces"
                        },
                        height: 110,
                        uniformtext: {
                            minsize: 8,
                            mode: 'hide'
                        }
                    }}
                />
            </div>
        </ValueItemsSection>
    </HalfWidthCard>

};  // DeathsCard


const HealthcareCard = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    return <HalfWidthCard heading={ "Healthcare" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "",
                        x: [],
                        y: [],
                        type: 'line',
                        mode: 'lines',
                        marker: { color: '#2B8CC4' },
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Discharged" }
                value={ max(data, item => item?.dischargeDate ?? 0)?.discharged ?? 0}
                description={ 'Total' }
                descriptionValue={ sum(data, item => item?.discharged ?? 0) }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "In hospital" }
                value={ max(data, item => item?.inHospitalDate ?? 0)?.inHospital ?? 0 }
                description={ 'Occupancy' }
                descriptionValue={ 0 }
                descriptionSign={ "%" }
                colourValue={ '#F47738' }

            />
            <ValueItem
                label={ "Hospital breakdown" }
                value={ 0 }
                colourValue={ '#6F777B' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // HealthcareCard


const CasesCard = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const
        groupBySpecimenDate = groupByUniqueKey(data, 'specimenDate'),
        maxSpecimenDate = max(Object.keys(groupBySpecimenDate)),
        groupByTestDate = groupByUniqueKey(data, 'testDate'),
        testDate = max(Object.keys(groupByTestDate));


    return <HalfWidthCard heading={ "Cases" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Cases",
                        x: data.map(item => item?.specimenDate ?? ""),
                        y: movingAverage(data.map(item => item?.cases ?? 0), 7),
                        fill: 'tozeroy',
                        fillcolor: 'rgba(43,140,196,0.2)'
                    },
                    {
                        name: "Tests",
                        x: data.map(item => item?.testDate ?? ""),
                        y: data.map(item => item?.cases ?? 0),
                        fill: 'tozeroy',
                        fillcolor: 'rgba(111,119,123,0.2)'
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "Lab-confirmed" }
                // value={ groupBySpecimenDate[maxSpecimenDate]?.cases ?? 0 }
                value={ sum(data, item => item?.dailyLabCases ?? 0) }
                description={ 'Total' }
                descriptionValue={ sum(data, item => item?.cases ?? 0) }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "No. of people tested" }
                value={ groupByTestDate[testDate]?.tests ?? 0 }
                description={ 'Total' }
                descriptionValue={ sum(data, item => item?.tests ?? 0) }
                colourValue={ '#6F777B' }
            />
            <ValueItem
                label={ "Patients recovered" }
                value={ sum(data, item => item?.recovered ?? 0) }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};   // CasesCard


const TestingCard = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    const
        testDate = groupByUniqueKey(data, 'testDate'),
        maxTestDate = max(Object.keys(testDate)),
        labCapacityDate = groupByUniqueKey(data, 'labCapacityDate'),
        maxLabCapacityDate = max(Object.keys(labCapacityDate));


    return <HalfWidthCard heading={ "Testing" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "",
                        x: [],
                        y: [],
                        type: 'line',
                        mode: 'lines',
                        marker: { color: 'red' },
                    }
                ] }
            />
        </VisualSection>
        <ValueItemsSection>
            <ValueItem
                label={ "No. of test" }
                value={ testDate[maxTestDate]?.tests ?? 0}
                description={ 'Total' }
                descriptionValue={ sum(data, item => item?.tests ?? 0) }
                colourValue={ '#2B8CC4' }
            />
            <ValueItem
                label={ "Planned lab capacity" }
                value={ labCapacityDate[maxLabCapacityDate]?.labCapacity ?? 0 }
                colourValue={ '#6F777B' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // TestingCard


const DailySummary = ({ location: { search: query } }) => {

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        data = useApi({ conjunctiveFilters: params, structure: Structures.data });

    return <Container className={ "util-flex util-flex-wrap" }>
        <TestingCard data={ data }/>
        <CasesCard data={ data }/>
        <HealthcareCard data={ data }/>
        <DeathsCard data={ data }/>
    </Container>

};  // DailySummary

export default withRouter(DailySummary)
