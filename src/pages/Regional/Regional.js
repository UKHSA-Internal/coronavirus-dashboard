// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';

import moment from "moment";

import useLoadData from 'hooks/useLoadData';
import useResponsiveLayout from 'hooks/useResponsiveLayout';
import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import PageTitle from 'components/PageTitle';
import Disclaimer from 'components/Disclaimer';
import ExportLinks from "components/Export";
import Announcement from "components/Announcement";
import ChartTable from "components/ChartTable";
import MapTable from "components/MapTable";

import type { Props, ReplacementsType } from './Regional.types';
import * as Styles from './Regional.styles';
import { SmallNumber, SmallNumberContainer } from "components/SmallNumber";


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


const formatStr = (s: string,  replacements: ReplacementsType): string  => {

    for (const key in replacements) {

        if (!replacements.hasOwnProperty(key)) continue

        s = s.replace(`{${key}}`, replacements?.[key] ??  "")

    }

    return s

}; // formatStr


const BigNumberTitles = {
    ukCases: "Total number of lab-confirmed UK cases",
    dailyUkCases: "Daily number of lab-confirmed UK cases",
    ukDeaths: "Total number of COVID-19 associated UK deaths",
    dailyUkDeaths: "Daily number of COVID-19 associated UK deaths",
};

const BigNumberDescriptions = {
    ukCases: 'Includes tests carried out by commercial partners which are not included in the 4 National totals',
    dailyUkCases: "Number of additional cases on {date}",
    ukDeaths: "Deaths of people who have had a positive test result confirmed by a Public Health or NHS laboratory",
    dailyUkDeaths: "Number of additional deaths on {date}"
}


export const timestamp = (data): string =>
    data.hasOwnProperty("metadata")
        ? moment(data?.metadata?.lastUpdatedAt).format("dddd D MMMM YYYY [at] h:mma")
        : "";


export const MainLoading = () => {

    return <Styles.Container className="govuk-width-container" role="main">
        <Styles.P className={ "govuk-body govuk-!-font-size-24" }>
            The website is loading. Please wait&hellip;
        </Styles.P>
    </Styles.Container>

}; // MainLoading


const Regional: ComponentType<Props> = ({}: Props) => {
    const
        data = useLoadData(),
        layout = useResponsiveLayout(768);

    if ( !data ) return <MainLoading/>;

    const
        latestDeaths = getLatestDailyDeaths(data),
        lastDataUpdate = moment(latestDeaths?.date ?? "0000-00-00").format("dddd D  MMMM YYYY"),
        countryDeaths = Object
            .keys(data?.countries)
            .map(key => ({
                name: data?.countries?.[key]?.name?.value ?? "",
                value: data?.countries?.[key]?.deaths?.value ?? 0
            }));

    return (
        <Styles.Container className="govuk-width-container" role="main">

            <Announcement firstDisplayDate={ { year: 2020, month: 4, day: 27 } }
                          lastDisplayDate={ { year: 2020, month: 5, day: 1 } }>
                <p className={ "govuk-body" }>
                    The way COVID-19 deaths are reported has changed.
                    For details see the&nbsp;
                    <Link to={ '/about' }
                          className={ "govuk-link govuk-link--no-visited-state" }>
                    About the data
                    </Link>&nbsp;page.
                </p>
            </Announcement>

            <PageTitle
                title="Coronavirus (COVID-19) in the UK"
                subtitle={ `Last updated on ${ timestamp(data) }` }
            />

            <BigNumberContainer>
                <BigNumber
                    caption={ BigNumberTitles.ukCases }
                    number={ data?.overview?.K02000001?.totalCases?.value ?? 0 }
                    description={ BigNumberDescriptions.ukCases }
                />
                <BigNumber
                    caption={ BigNumberTitles.dailyUkCases  }
                    number={ data?.overview?.K02000001?.newCases?.value ?? 0 }
                    description={ formatStr(BigNumberDescriptions.dailyUkCases, {date: lastDataUpdate})  }
                />
                <BigNumber
                    caption={ BigNumberTitles.ukDeaths }
                    number={ data?.overview?.K02000001?.deaths.value ?? 0 }
                    description={BigNumberDescriptions.ukDeaths }
                />
                <BigNumber
                    caption={ BigNumberTitles.dailyUkDeaths  }
                    number={ latestDeaths?.value ?? 0 }
                    description={ formatStr(BigNumberDescriptions.dailyUkDeaths, {date: lastDataUpdate}) }
                />
            </BigNumberContainer>

            <SmallNumberContainer heading={ "Total number by nation" } caption={ "COVID-19 associated deaths" }>
                {
                    countryDeaths.map(({ name, value }) =>
                        <SmallNumber key={ `SmallNumber-${name}` }
                                     caption={ name }
                                     number={ value }/>
                    )
                }
            </SmallNumberContainer>

            { layout === 'desktop'
                ? <MapTable>
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
                </MapTable>
                : null
            }
            <ChartTable data={ data }/>

            <Disclaimer text={ data?.metadata?.disclaimer ?? "" }/>
        </Styles.Container>
    );
};

export default Regional;
