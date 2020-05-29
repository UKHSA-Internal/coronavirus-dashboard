// @flow

import React, { useState, Component } from 'react';
import type { ComponentType } from 'react';

import moment from "moment";

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import SideNavigation from 'components/SideNavigation';
import DashboardHeader from 'components/DashboardHeader';
import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';
import type { Props } from './DailySummary.types';
import * as Styles from './DailySummary.styles';
import axios from 'axios';
import Plot from 'react-plotly.js';

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


class DailySummary extends Component<Props, {}> {

    #url = 'https://uks-covid19-pubdash-dev.azure-api.net/fn-coronavirus-dashboard-pipeline-etl-dev/v1/data';
    state = {
        data: null,
        loading: true
    }; // state

    getData = async () => {

        const { data: { data=[] } } = await axios.get(this.#url, {
            params: {
                areaName: "united kingdom",
                areaType: "overview",
                structure: JSON.stringify({
                    deathDate: "deathReportingDate",
                    specimenDate: "specimenDate",
                    deaths: "dailyChangeInDeaths",
                    cases: "dailyLabConfirmedCases"
                })
            }
        })

        this.setState({ data: data, loading: false })

    }; // getData

    componentDidMount(): * {

        return this.setState({loading: true}, this.getData)

    } // componentDidMount

    render(): React$Node {

        const { data, loading } = this.state;

        if ( loading ) return <MainLoading/>;
        console.log(data);
        // ToDo: This should be done for every page in the "app.js".
        const base = document.querySelector("head>base");
        base.href = document.location.pathname;


        return <div className={ "govuk-grid-row" }>
            <div className={ "govuk-grid-column-full" }>
                <p className={ "govuk-body" }>Last updated on { }</p>
                <div className={ "govuk-grid-column-menu" }>
                    <SideNavigation/>
                </div>
                <div className={ "govuk-grid-column-dashboard" }>
                    <DashboardHeader title={ "Daily Summary" }/>
                    <Styles.FlexContainer>

                        <HalfWidthCard caption={ "Testing" }>
                            <VisualSection>
                                <Plot
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
                                    config={ {
                                        showLink: false,
                                        responsive: true,
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
                                        margin: {
                                            l: 20,
                                            r: 5,
                                            b: 20,
                                            t: 5,
                                            pad: 0
                                        },
                                        plot_bgcolor: "rgba(231,231,231,0)",
                                        paper_bgcolor: "rgba(255,255,255,0)"
                                    } }
                                />
                            </VisualSection>
                            <ValueItemsSection>
                                <ValueItem
                                    label={ "No. of test" }
                                    value={ 128340 }
                                    description={ 'Total all time: 3,090,566' }
                                    colourName={ 'blue' }
                                />
                                <ValueItem
                                    label={ "Planned lab capacity" }
                                    value={ 145855 }
                                />
                            </ValueItemsSection>
                        </HalfWidthCard>

                        <HalfWidthCard caption={ "Cases" }>
                            <VisualSection>
                                <Plot
                                    data={ [
                                        {
                                            name: "",
                                            x: data.map(item => item.specimenDate),
                                            y: data.map(item => item.cases),
                                            type: 'line',
                                            mode: 'lines',
                                            marker: { color: 'red' },
                                        }
                                    ] }
                                    config={ {
                                        showLink: false,
                                        responsive: true,
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
                                        margin: {
                                            l: 20,
                                            r: 5,
                                            b: 20,
                                            t: 5,
                                            pad: 0
                                        },
                                        plot_bgcolor: "rgba(231,231,231,0)",
                                        paper_bgcolor: "rgba(255,255,255,0)"
                                    } }
                                />
                            </VisualSection>
                            <ValueItemsSection>
                                <ValueItem
                                    label={ "Lab-confirmed" }
                                    value={ 2615 }
                                    description={ 'Total all time: 250,908' }
                                    colourName={ 'blue' }
                                />
                                <ValueItem
                                    label={ "No. of people tested" }
                                    value={ 67681 }
                                    description={ 'Total all time: 2,064,329' }
                                />
                                <ValueItem
                                    label={ "Patients recovered" }
                                    value={ 75432 }
                                />
                            </ValueItemsSection>
                        </HalfWidthCard>

                        <HalfWidthCard caption={ "Healthcare" }>
                            <VisualSection>
                                <Plot
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
                                    config={ {
                                        showLink: false,
                                        responsive: true,
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
                                        margin: {
                                            l: 20,
                                            r: 5,
                                            b: 20,
                                            t: 5,
                                            pad: 0
                                        },
                                        plot_bgcolor: "rgba(231,231,231,0)",
                                        paper_bgcolor: "rgba(255,255,255,0)"
                                    } }
                                />
                            </VisualSection>
                            <ValueItemsSection>
                                <ValueItem
                                    label={ "Discharged" }
                                    value={ 3306 }
                                    description={ 'Total all time: 248,127' }
                                    colourName={ 'blue' }
                                />
                                <ValueItem
                                    label={ "In hospital" }
                                    value={ 36842 }
                                    description={ '47% occupancy' }
                                />
                                <ValueItem
                                    label={ "Hospital breakdown" }
                                    value={ 0 }
                                />
                            </ValueItemsSection>
                        </HalfWidthCard>

                        <HalfWidthCard caption={ "Deaths" }>
                            <VisualSection>
                                <Plot
                                    data={ [
                                        {
                                            name: "Total lab-confirmed cases",
                                            x: data.map(item => item.deathDate),
                                            y: data.map(item => item.deaths),
                                            type: 'scatter',
                                            // mode: 'none',
                                            fill: 'tozeroy',
                                            fillcolor: 'rgba(43,140,196,0.2)'
                                            // marker: { color: '#2B8CC4' },
                                        }
                                    ] }
                                    config={ {
                                        showLink: false,
                                        responsive: true,
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
                                        margin: {
                                            l: 30,
                                            r: 5,
                                            b: 20,
                                            t: 5,
                                            pad: 0
                                        },
                                        plot_bgcolor: "rgba(231,231,231,0)",
                                        paper_bgcolor: "rgba(255,255,255,0)"
                                    } }
                                />
                            </VisualSection>
                            <ValueItemsSection>
                                <ValueItem
                                    label={ "Confirmed COVID-19 associated deaths" }
                                    value={ 338 }
                                    description={ 'Total all time: 36,042' }
                                    colourName={ 'blue' }
                                />
                            </ValueItemsSection>
                        </HalfWidthCard>

                    </Styles.FlexContainer>
                </div>
            </div>
        </div>

    }

}

export default DailySummary
