// @flow

import React, { Component, Fragment } from 'react';
import type { ComponentType } from 'react';

import ReactMarkdown from "react-markdown";

import type { AboutProps, AboutState } from './About.types';
import * as Styles from './About.styles';
import PageTitle from 'components/PageTitle';
import axios from "axios";


export default class About extends Component<AboutProps, {}> {

    #url = "https://c19pub.azureedge.net/about.md"

    state: AboutState = {
        loading: false,
        data: []
    };

    getData = async () => {

        const { data } = await axios.get(this.#url, {responseType: "text"});

        this.setState({ data: data, loading: false })

    };

    componentDidMount() {

        this.setState({ loading: true }, this.getData)

    } // componentDidMount

    display() {

        const { loading, data } = this.state;

        if ( loading ) return <p>Loading&hellip;</p>

        return <Fragment>
            <h2>
                Total and daily UK cases
            </h2>
            <p>
                COVID-19 cases are identified by taking specimens from people and sending these specimens to
                laboratories around the UK to be tested. If the test is positive, this is a referred to as a
                lab-confirmed case.
            </p>

            <p>
                There are separate reporting processes for England, Scotland, Wales and Northern Ireland. Each Nation
                provides data based on tests carried out in NHS (and PHE) laboratories. These represent 'pillar 1' of
                the Government's mass testing programme. The Department for Health and Social Care (DHSC) combines the
                counts from the 4 Nations, and adds data from tests carried out by commercial partners ('pillar 2' of
                the mass-testing programme) to give daily and total (cumulative) counts of lab-confirmed cases. These
                are submitted to Public Health England (PHE) to display on the dashboard. The 4 figures are not all
                taken from the same cut-off time: England and Scotland counts are as at 9am on the day of publication;
                Wales counts are as at 7am on the day of publication; Northern Ireland counts are from different times
                on the day of publication. The exact time of the Northern Ireland data extract is given on the&nbsp;
                <a href={"https://www.health-ni.gov.uk/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}>Northern Ireland Department of Health</a>&nbsp;website.
            </p>
            <p>
                The UK total is not the sum of the 4 National totals as the pillar 2 cases cannot currently be included in
                the
                National totals. All other data on this website are based only on cases detected through pillar 1.
                Information
                about the different pillars is available on&nbsp;
                <a href={"https://www.gov.uk/government/publications/coronavirus-covid-19-scaling-up-testing-programmes/coronavirus-covid-19-scaling-up-our-testing-programmes"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}>GOV.UK</a>.
            </p>
            <p>
                Details of the processes for counting cases in the devolved administrations are available on their
                websites:
            </p>
            <div>
                <ul>
                    <li>
                        <a href={"https://www.gov.scot/coronavirus-covid-19/"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}>Scottish Government coronavirus information</a>
                    </li>
                    <li>
                        <a href={"https://covid19-phwstatement.nhs.wales/"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}>Public Health Wales coronavirus information</a>
                    </li>
                    <li>
                        <a href={"https://www.health-ni.gov.uk/"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}>Northern Ireland Department of Health coronavirus
                            information</a>
                    </li>
                </ul>
            </div>

            <h2>
                England cases
            </h2>
            <p>
                In England, laboratories submit test results to PHE through the Second Generation Surveillance System
                (SGSS). Cases received from laboratories by 12:30am are included in the counts published that day.
                Confirmed positive cases are matched to ONS geographical area codes using the home postcode of the
                person tested. Postcodes are supplied by the laboratory information systems.
            </p>
            <p>
                Duplicate tests for the same person are removed. The first positive specimen date is used as the
                specimen date for that person.
            </p>
            <p>
                Cases are aggregated to Upper Tier Local Authority (UTLA) and Region level and shown in the table and on
                the map. UTLAs include Counties, Unitary Authorities, Metropolitan Districts and London Boroughs. Some
                cases cannot be matched to a geographical area because postcode information is missing or received late.
                This is why the UTLA and Region counts do not add up to the England total. Data for Cornwall and Isles
                of Scilly are combined because Isles of Scilly has a population of less than 10,000 and fewer than 5
                cases.
            </p>
            <p>
                The ages and sexes of the people who have tested positive are shown in a chart and table. Date of birth
                and/or sex are missing from some records.  This is why the age and sex counts do not add up to the
                England total. Clicking on 'Male' or 'Female' in the chart legend selects which data are shown.
            </p>
            <p>
                Cumulative case counts include patients who are currently unwell, those have recovered and those that
                have died.
            </p>
            <p>
                Total UTLA counts shown on this website can occasionally go down from one day to the next as data are
                revised.
            </p>
            <p>
                Cases in people who have not been tested are not included in the confirmed case counts.
            </p>

            <h2>
                Interpreting the maps
            </h2>
            <p>
                The maps show counts of cases in each Country, Region and UTLA area. The areas of the circles on the map
                are proportional to the counts. UTLAs vary enormously in population size, from under 100,000 to over 1.4
                million. Areas with larger populations would naturally have higher numbers of cases, even if the cases
                were evenly distributed around the country.
            </p>
            <p>
                To compare the numbers of cases between areas meaningfully it is necessary to calculate rates. These
                will be added to this website as soon as possible.
            </p>

            <h2>
                Cases over time
            </h2>
            <p>
                Daily case counts are shown in charts and tables, and can be downloaded for Regions and UTLAs as a csv
                file or in json format. They are currently only available for England on this website. Data for the rest
                of the UK will be included when supplied by the devolved administrations.
            </p>
            <p>
                Lab-confirmed positive cases are attributed to the day the first specimen was taken from the person
                being tested (the specimen date). Each day new cases are reported, but the dates they originate from
                cover the previous few days. Because of this, there are few cases reported for the most recent date on
                the chart, but this does not mean the epidemic is tailing off. Data from around 5 days ago can be
                considered complete. Data for recent days are constantly being revised as more information becomes
                available.
            </p>
            <p>
                The new cases reported in the most recent daily update are shown by the upper, dark section of the bars.
                The lower sections of the bars represent cases previously reported.  This shows how the new cases
                reported relate to specimens taken over the last few days, with the occasional tests coming in with
                longer delays. Clicking on 'Previously reported' or 'Newly reported' in the chart legend selects which
                data are shown.
            </p>
            <p>
                In the csv and json download files, the total daily cases and cumulative cases by specimen date are
                provided for England, each Region and UTLA.  A breakdown of both the daily cases and the cumulative
                cases is provided to show the previously reported figures (ie those that were published on the previous
                day) and the overnight change.  As in the England chart, this shows how the new cases reported relate to
                specimens taken over the last few days, with the occasional tests coming in with longer delays.
                Negative changes indicate cases being removed or corrected as the data are continually checked and
                cleaned.
            </p>

            <h2>
                Note on the change in the way the dates are attributed
            </h2>
            <p>
                Data were previously shown by reporting date. The reporting date is the date that PHE published the
                data, which would normally be one day after the laboratory submitted the data to PHE. In many cases labs
                submit data in batches, so there may be no cases for a week and then a large number on one day. This is
                not helpful for analysing the incidence of COVID-19 over time.
            </p>
            <p>
                The data are now shown by the date the specimen was taken from the person being tested. This gives a
                much more useful analysis of the progression of cases over time. It does mean that the latest days’
                figures are always incomplete, and only data from five days or more ago can be considered complete.
            </p>
            <ReactMarkdown source={ data }/>
        </Fragment>

    } // display

    render(): React$Node {

        return <Styles.Container className={"govuk-width-container about"}>
            <PageTitle title={"About the data"} />
            { this.display() }
        </Styles.Container>

    } // render

} // About
