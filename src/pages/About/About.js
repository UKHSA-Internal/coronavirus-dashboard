// @flow

import React from 'react';
import type {ComponentType} from 'react';

import type {Props} from './About.types';
import * as Styles from './About.styles';
import PageTitle from 'components/PageTitle';

const About: ComponentType<Props> = ({}: Props) => {
    return (
        <Styles.Container className={"govuk-width-container"}>
            <PageTitle title={"About the data"}/>
            <Styles.SectionHeader className={"govuk-heading-m"}>
                Total and daily UK cases
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                COVID-19 cases are identified by taking specimens from people and sending these specimens to
                laboratories around the UK to be tested. If the test is positive, this is a referred to as a
                lab-confirmed case.
            </p>

            <p className={'govuk-body'}>
                There are separate reporting processes for England, Scotland, Wales and Northern Ireland. Each nation
                provides data based on tests carried out in NHS (and PHE) laboratories. These represent 'pillar 1' of
                the Government's mass testing programme. The Department for Health and Social Care (DHSC) combines the
                counts from the 4 nations, and adds data from tests carried out by commercial partners ('pillar 2' of
                the mass-testing programme) to give daily and total (cumulative) counts of lab-confirmed cases. These
                are submitted to Public Health England (PHE) to display on the dashboard. The 4 figures are not all
                taken from the same cut-off time: England and Scotland counts are as at 9am on the day of publication;
                Wales counts are as at 7am on the day of publication; Northern Ireland counts are from different times
                on the day of publication. The exact time of the Northern Ireland data extract is given on the&nbsp;
                <a href={"https://www.publichealth.hscni.net/news/covid-19-coronavirus#what-is-the-situation-in-northern-ireland"}
                   target={"_blank"}
                   className={"govuk-link"}
                   rel={"noopener noreferrer"}>Northern Ireland Public Health Agency</a>&nbsp;website.
            </p>
            <p className={'govuk-body'}>
                The UK total is not the sum of the 4 nation totals as the pillar 2 cases cannot currently be included in
                the
                nation totals. All other data on this website are based only on cases detected through pillar 1.
                Information
                about the different pillars is available on&nbsp;
                <a href={"https://www.gov.uk/government/publications/coronavirus-covid-19-scaling-up-testing-programmes/coronavirus-covid-19-scaling-up-our-testing-programmes"}
                   target={"_blank"}
                   className={"govuk-link"}
                   rel={"noopener noreferrer"}>GOV.UK</a>.
            </p>
            <p className={'govuk-body'}>
                Details of the processes for counting cases in the devolved administrations are available on their
                websites:
            </p>
            <p className={'govuk-body'}>
                <ul className="govuk-list">
                    <li>
                        <a href={"https://www.gov.scot/coronavirus-covid-19/"}
                           className={"govuk-link"}
                           target={"_blank"}
                           rel={"noopener noreferrer"}>Scottish Government coronavirus information</a>
                    </li>
                    <li>
                        <a href={"https://covid19-phwstatement.nhs.wales/"}
                           className={"govuk-link"}
                           target={"_blank"}
                           rel={"noopener noreferrer"}>Public Health Wales coronavirus information</a>
                    </li>
                    <li>
                        <a href={"https://www.publichealth.hscni.net/publications/covid-19-surveillance-reports"}
                           className={"govuk-link"}
                           target={"_blank"}
                           rel={"noopener noreferrer"}>Northern Ireland Public Health Agency coronavirus
                            information</a>
                    </li>
                </ul>
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                England cases
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                In England, laboratories submit test results to PHE through the Second Generation Surveillance System
                (SGSS). Cases received from laboratories by 12:30am are included in the counts published that day.
                Confirmed positive cases are matched to ONS geographical area codes using the home postcode of the
                person tested. Postcodes are supplied by the laboratory information systems.
            </p>
            <p className={'govuk-body'}>
                Duplicate tests for the same person are removed. The first positive specimen date is used as the
                specimen date for that person.
            </p>
            <p className={'govuk-body'}>
                Cases are aggregated to Upper Tier Local Authority (UTLA) and Region level and shown in the table and on
                the map. UTLAs include Counties, Unitary Authorities, Metropolitan Districts and London Boroughs. Some
                cases cannot be matched to a geographical area because postcode information is missing or received late.
                This is why the UTLA and Region counts do not add up to the England total. Data for Cornwall and Isles
                of Scilly are combined because Isles of Scilly has a population of less than 10,000 and fewer than 5
                cases.
            </p>
            <p className={'govuk-body'}>
                Cumulative case counts include patients who are currently unwell, those have recovered and those that
                have died.
            </p>
            <p className={'govuk-body'}>
                Total UTLA counts shown on this website can occasionally go down from one day to the next as data are
                revised.
            </p>
            <p className={'govuk-body govuk-body govuk-!-margin-bottom-8'}>
                Cases in people who have not been tested are not included in the confirmed case counts.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Interpreting the maps
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                The maps show counts of cases in each Country, Region and UTLA area. The areas of the circles on the map
                are proportional to the counts. UTLAs vary enormously in population size, from under 100,000 to over 1.4
                million. Areas with larger populations would naturally have higher numbers of cases, even if the cases
                were evenly distributed around the country.
            </p>
            <p className={'govuk-body govuk-body govuk-!-margin-bottom-8'}>
                To compare the numbers of cases between areas meaningfully it is necessary to calculate rates. These
                will be added to this website as soon as possible.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Cases over time
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                Daily case counts are shown in charts and tables, and can be downloaded for Regions and UTLAs as a csv
                file. They are currently only available for England on this website. Data for the rest of the UK will be
                included as soon as possible.
            </p>
            <p className={'govuk-body govuk-body govuk-!-margin-bottom-8'}>
                Lab-confirmed positive cases are attributed to the day the first specimen was taken from the person
                being tested (the specimen date). Each day new cases are reported, but the dates they originate from
                cover the previous few days. Because of this, there are few cases reported for the most recent date on
                the chart, but this does not mean the epidemic is tailing off. Data from around 5 days ago can be
                considered complete. Data for recent days are constantly being revised as more information becomes
                available.
            </p>

            <Styles.SectionHeader className="govuk-heading-m">
                Note on the change in the way the dates are attributed
            </Styles.SectionHeader>
            <p className="govuk-body">
                Data were previously shown by reporting date. The reporting date is the date that PHE published the
                data, which would normally be one day after the laboratory submitted the data to PHE. In many cases labs
                submit data in batches, so there may be no cases for a week and then a large number on one day. This is
                not helpful for analysing the incidence of COVID-19 over time.
            </p>
            <p className={ "govuk-body govuk-body govuk-!-margin-bottom-8" }>
                The data are now shown by the date the specimen was taken from the person being tested. This gives a
                much more useful analysis of the progression of cases over time. It does mean that the latest days’
                figures are always incomplete, and only data from five days or more ago can be considered complete.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Total and daily deaths in UK hospitals
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                There are separate reporting processes for England, Scotland, Wales and Northern Ireland. DHSC combines
                these 4 counts to give the overall UK daily and total (cumulative) counts. DHSC submits the counts to
                PHE to display on this website. The 4 figures are not all taken from the same cut-off time: England and
                Wales counts are as at 5pm on the day before publication; Scotland counts are as at 9am on the day
                before publication; Northern Ireland counts are as at 9:15am on the day before publication.
            </p>
            <p className={'govuk-body govuk-body govuk-!-margin-bottom-8'}>
                Details of the processes for counting deaths in the devolved administrations are available on their
                websites. Links provided in the 'Total and daily UK cases' section on this page.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                England deaths in hospitals
            </Styles.SectionHeader>
            <p className={'govuk-body'}>
                The figures currently shown for England are deaths in NHS-commissioned services of patients who have
                tested positively for COVID-19. These include private provides currently providing NHS services. Deaths
                are reported by the services to NHS England. NHS England extracts data at 5pm each day and these are the
                basis for the death counts reported on this website the following day. After validation, the total
                number of deaths in England is published by NHS England and sent to DHSC.
            </p>
            <p className={'govuk-body govuk-body govuk-!-margin-bottom-8'}>
                Deaths outside NHS services are not currently included in these counts. Deaths of people who have tested
                positively for COVID-19 could in some cases be due to a different cause.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Deaths over time
            </Styles.SectionHeader>
            <p className={"govuk-body"}>
                Deaths are shown in charts and tables according to the day they were reported, not the day they
                occurred. They can be downloaded as a csv file.
            </p>
            <hr className={"govuk-section-break govuk-section-break--l"}/>

            <p className={"govuk-body-s"}>
                Updated 6pm 16 April 2020
            </p>

            <p className={"govuk-body-s"}>
                Metadata developed with advice from the UK Statistics Authority
            </p>

        </Styles.Container>
    );
};

export default About;
