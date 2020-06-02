// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';
import type { Props } from './DailySummary.types';
import * as Styles from './DailySummary.styles';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { max } from "d3-array";

import { createQuery, getParams } from "common/utils";

import deepEqual from "deep-equal"


/**
 * Extracts the number of deaths from the latest date included in
 * the data, under: ``data.overview.K02000001.dailyDeaths``
 * @param data
 * @returns {number} Latest number of deaths or 0.
 */
const getLatestDailyDeaths = (data: any): number => {

    const defaultDate = '0000.00.00';

    try {
        return data?.overview?.K02000001?.dailyDeaths?.sort((a, b) =>
            new Date(b?.date ?? defaultDate) - new Date(a?.date ?? defaultDate)
        )[0] ?? {}
    } catch (e) {
        return {}
    }

}; // getLatestDailyDeaths

const formatStr = (s: string, replacements: ReplacementsType): string => {

    for ( const key in replacements ) {

        if ( !replacements.hasOwnProperty(key) ) continue

        s = s.replace(`{${ key }}`, replacements?.[key] ?? "")

    }

    return s

}; // formatStr

export const timestamp = (data): string =>
    data.hasOwnProperty("metadata")
        ? moment(data?.metadata?.lastUpdatedAt).format("dddd D MMMM YYYY [at] h:mma")
        : "";

export const MainLoading = () => {

    return <div className="govuk-width-container" role="main">
        <div className={ "govuk-body govuk-!-font-size-24" }>
            The website is loading. Please wait&hellip;
        </div>
    </div>

}; // MainLoading


const sum = (arr, key) => {

    return arr.reduce((acc, item) => {
        acc = acc + key(item)
        return acc
    }, 0)

}


const Plotter = ({ ...props }) => {

    return <Plot
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true,
            modeBarButtonsToRemove: [
                "autoScale2d",
                "zoomIn2d",
                "zoomOut2d",
                "toggleSpikelines",
                "hoverClosestCartesian",
                "zoom2d"
            ],
            toImageButtonOptions: {
                format: 'png',
                filename: 'export',
                height: 1024,
                width: 768,
                scale: 4
            }
        } }
        useResizeHandler={ true }
        style={{ display: 'flex' }}
        layout={ {
            // width: 400,
            height: 240,
            // autosize: true,
            legend: {
                orientation: 'h'
            },
            showlegend: false,
            margin: {
                l: 20,
                r: 5,
                b: 25,
                t: 5,
                pad: 0
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                // tickangle: 30,
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 10,
                    color: "#6f777b"
                }
            },
            yaxis: {
                tickformat: 's',
                tickfont:{
                    family: `"GDS Transport", Arial, sans-serif`,
                    size : 10,
                    color: "#6f777b",
                }
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)"
        } }
        {...props}
    />

}; // Plotter



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

}


const HealthcareCard = ({ data }) => {

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

}


const CasesCard = ({ data }) => {

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

}


const TestingCard = ({ data }) => {

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

}

export const objectsAreEqual = (...objects): boolean => {

    const
        keys = Object.keys(objects[0]),
        nItems = keys.length;

    // Check number of props
    if ( !objects.every(item => Object.keys(item).length === nItems) ) return false;

    // Check value equivalence
    for ( const key of keys )
        if ( !objects.every( item => item[key] === objects[0][key] ) )
            return false;

    return true

}; // objectsAreEqual


class DailySummary extends Component<{}, {}> {

    url = 'https://uks-covid19-pubdash-dev.azure-api.net/fn-coronavirus-dashboard-pipeline-etl-dev/v1/data';

    defaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];

    state = {
        data: null,
        params: this.defaultParams
    }

    getData = async () => {

        const
            { params } = this.state,
            urlParams = createQuery([
                {
                    key: 'filters',
                    sign: '=',
                    value: createQuery(params.length ? params : this.defaultParams, ";", "")
                },
                {
                    key: 'structure',
                    sign: '=',
                    value: JSON.stringify({
                        dailyLabCases: "changeInDailyCases",
                        deathReportDate: "deathReportingDate",
                        specimenDate: "specimenDate",
                        deaths: "dailyChangeInDeaths",
                        cases: "dailyLabConfirmedCases"
                    })
                }
            ]),
            { data: { data = [] } } = await axios.get(this.url + encodeURI(urlParams));

        this.setState({ data: data })

    };

    componentDidMount(): * {

        // ToDo: This should be done for every page in the "app.js".
        const base = document.querySelector("head>base");
        base.href = document.location.pathname;

        this.setState((prevState, prevProps) => ({
                params: [
                    ...prevState.params,
                    ...getParams(prevProps?.location?.search ?? "")
                ]
            }),
            this.getData
        )

    }

    componentDidUpdate(prevProps: Props, prevState: State, prevContext: *): * {

        const
            { location: { search: prevParams="" } } = prevProps,
            { location: { search: thisParams="" } } = this.props,
            prevParamsObj = getParams(prevParams),
            thisParamsObj = getParams(thisParams);

        if (!deepEqual(prevParamsObj, thisParamsObj))
            this.setState({ params: thisParamsObj }, this.getData)

    }

    render(): React$Node {

        const { data } = this.state;

        if ( !data ) return <MainLoading/>

        return<Styles.FlexContainer>
            <TestingCard data={ data }/>
            <CasesCard data={ data }/>
            <HealthcareCard data={ data }/>
            <DeathsCard data={ data }/>
        </Styles.FlexContainer>

    }

}

export default withRouter(DailySummary)
