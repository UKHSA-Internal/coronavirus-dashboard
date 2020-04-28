// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';
import moment from "moment";

import useLoadData from 'hooks/useLoadData';
import useResponsiveLayout from 'hooks/useResponsiveLayout';
import BigNumber from 'components/BigNumber';
import PageTitle from 'components/PageTitle';
import RegionTable from 'components/RegionTable';
import Map from 'components/Map';
import Disclaimer from 'components/Disclaimer';
import ExportLinks from "components/Export";

import type { Props } from './Regional.types';
import * as Styles from './Regional.styles';
import ChartTable from "components/ChartTable";
import Announcement from "../../components/Announcement/Announcement";


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
        )[0]?.value ?? 0
    } catch (e) {
        return 0
    }

}; // getLatestDailyDeaths


const timestamp = (data): string =>
    data.hasOwnProperty("lastUpdatedAt")
        ? moment(data.lastUpdatedAt).format("D MMM YYYY, h:mma")
        : "";


const Regional: ComponentType<Props> = ({}: Props) => {
    const [country, setCountry] = useState(null);
    const [region, setRegion] = useState(null);
    const [utla, setUtla] = useState(null);
    const data = useLoadData();
    const layout = useResponsiveLayout(768);

    if ( !data ) {
        return <Styles.Container className="govuk-width-container">
            <Styles.P className={ "govuk-body govuk-!-font-size-24" }>
                The website is loading. Please wait&hellip;
            </Styles.P>
        </Styles.Container>
    }

    return (
        <Styles.Container className="govuk-width-container">

            <Announcement firstDisplayDate={ { year: 2020, month: 4, day: 27 } }
                          lastDisplayDate={ { year: 2020, month: 5, day: 1 } }>
                <p className={ "govuk-body" }>
                    The way COVID-19 deaths are reported is changing.
                    For details see the&nbsp;
                    <a href={ 'https://www.ons.gov.uk/news/statementsandletters/thedifferentusesoffiguresondeathsfromcovid19publishedbydhscandtheons' }
                       className={ "govuk-link govuk-link--no-visited-state" }
                       rel={ "noopener noreferrer" }
                       target={ "_blank" }>
                        ONS website
                    </a>.
                </p>
            </Announcement>

            <PageTitle
                title="Coronavirus (COVID-19) in the UK"
                subtitle={ `Last updated ${ timestamp(data) }` }
            />
            <BigNumber
                caption="Total number of lab-confirmed UK cases"
                number={ data?.overview?.K02000001?.totalCases?.value ?? 0 }
                description={ 'Includes tests carried out by commercial partners which are not included in the 4 National totals' }
            />
            <BigNumber
                caption="Daily number of lab-confirmed UK cases"
                number={ data?.overview?.K02000001?.newCases?.value ?? 0 }
                description={ "Number of new cases reported today" }
            />
            <BigNumber
                caption="Total number of COVID-19 associated UK deaths in hospital"
                number={ data?.overview?.K02000001?.deaths.value ?? 0 }
                description={ "Deaths of patients in hospitals who have tested positive for COVID-19" }
            />
            <BigNumber
                caption="Daily number of COVID-19 associated UK deaths in hospital"
                number={ getLatestDailyDeaths(data) }
                description={ "Number of new deaths reported today" }
            />
            { layout === 'desktop' && (
                <>
                    <RegionTable
                        country={ country }
                        setCountry={ setCountry }
                        countryData={ data?.countries }
                        region={ region }
                        setRegion={ setRegion }
                        regionData={ data?.regions }
                        utla={ utla }
                        setUtla={ setUtla }
                        utlaData={ data?.utlas }
                    />
                    <Map
                        country={ country }
                        setCountry={ setCountry }
                        countryData={ data?.countries }
                        region={ region }
                        setRegion={ setRegion }
                        regionData={ data?.regions }
                        utla={ utla }
                        setUtla={ setUtla }
                        utlaData={ data?.utlas }
                    />
                </>
            ) }
            {/* FixMe: Change URL to relative before deployment to production. */ }
            <ExportLinks data={ {
                cases: {
                    csv: "https://coronavirus.data.gov.uk/downloads/csv/coronavirus-cases_latest.csv",
                    json: "https://coronavirus.data.gov.uk/downloads/json/coronavirus-cases_latest.json",
                    shouldBeTracked: true,
                    dataType: "cases"
                },
                deaths: {
                    csv: "https://coronavirus.data.gov.uk/downloads/csv/coronavirus-deaths_latest.csv",
                    json: "https://coronavirus.data.gov.uk/downloads/json/coronavirus-deaths_latest.json",
                    shouldBeTracked: true,
                    dataType: "deaths"
                }
            } }/>

            <ChartTable data={ data }/>

            <Disclaimer text={ data?.disclaimer }/>
        </Styles.Container>
    );
};

export default Regional;
