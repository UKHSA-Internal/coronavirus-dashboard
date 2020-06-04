// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { MainLoading } from "components/Loading";
import { getParams, sum } from "common/utils";

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

    if ( !data ) return <MainLoading/>;

    const
        groupByDeathReportDate = groupByUniqueKey(data, 'deathReportDate'),
        maxDeathReportDate = max(Object.keys(groupByDeathReportDate));

    return <HalfWidthCard caption={ "Deaths" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Total lab-confirmed cases",
                        x: data.map(item => item?.deathReportDate ?? ""),
                        y: data.map(item => item?.deaths ?? 0),
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
                description={ 'Total all time' }
                descriptionValue={ sum(data, item => item?.deaths ?? 0) }
                colourName={ 'blue' }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // DeathsCard


const HealthcareCard = ({ data }) => {

    if ( !data ) return <MainLoading/>;

    return <HalfWidthCard caption={ "Healthcare" }>
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
                description={ 'Total all time' }
                descriptionValue={ sum(data, item => item?.discharged ?? 0) }
                colourName={ 'blue' }
            />
            <ValueItem
                label={ "In hospital" }
                value={ max(data, item => item?.inHospitalDate ?? 0)?.inHospital ?? 0 }
                description={ 'Occupancy' }
                descriptionValue={ 0 }
                descriptionSign={ "%" }
            />
            <ValueItem
                label={ "Hospital breakdown" }
                value={ 0 }
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


    return <HalfWidthCard caption={ "Cases" }>
        <VisualSection>
            <Plotter
                data={ [
                    {
                        name: "Cases",
                        x: data.map(item => item?.specimenDate ?? ""),
                        y: data.map(item => item?.cases ?? 0),
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
                description={ 'Total all time' }
                descriptionValue={ sum(data, item => item?.cases ?? 0) }
                colourName={ 'blue' }
            />
            <ValueItem
                label={ "No. of people tested" }
                value={ groupByTestDate[testDate]?.tests ?? 0 }
                description={ 'Total all time' }
                descriptionValue={ sum(data, item => item?.tests ?? 0) }
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


    return <HalfWidthCard caption={ "Testing" }>
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
                description={ 'Total all time' }
                descriptionValue={ sum(data, item => item?.tests ?? 0) }
                colourName={ 'blue' }
            />
            <ValueItem
                label={ "Planned lab capacity" }
                value={ labCapacityDate[maxLabCapacityDate]?.labCapacity ?? 0 }
            />
        </ValueItemsSection>
    </HalfWidthCard>

};  // TestingCard


const DailySummary = ({ location: { search: query } }) => {

    const
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        data = useApi(params, Structures.data);

    return <Container className={ "util-flex util-flex-wrap" }>
        <TestingCard data={ data }/>
        <CasesCard data={ data }/>
        <HealthcareCard data={ data }/>
        <DeathsCard data={ data }/>
    </Container>

};  // DailySummary

export default withRouter(DailySummary)
