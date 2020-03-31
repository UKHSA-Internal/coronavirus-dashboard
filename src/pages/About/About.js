// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './About.types';
import * as Styles from './About.styles';
import PageTitle from 'components/PageTitle';

const About: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle title="About the data" />
      <Styles.SectionHeader className="govuk-heading-m">Case count data</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        Tests for COVID-19 are performed by laboratories around the country. The results of these tests are submitted to PHE through the Second Generation Surveillance System (SGSS). Confirmed positive cases are matched to ONS geographical area codes using the home postcode of the person tested as supplied by the laboratory information systems. Cases are aggregated to Upper Tier Local Authority (UTLA) and NHS Region level and presented in the table and on the map. Some cases cannot be matched to a geographical area due to absence or delayed receipt of postcode information – hence the UTLA and NHS Region counts do not sum to the England total. Cumulative case counts include patients who are currently unwell, have recovered and those that have died. Counts for individual UTLAs can occasionally go down from one day to the next as data are further revised. Values shown on the charts represent those published each day and have not been revised or updated.
        <br/>
        <br/>
        Case counts for Northern Ireland, Scotland and Wales are published daily on the devolved administrations’ respective websites. The sum of the case counts for the four nations is cross-checked against the UK total published by the Department for Health and Social Care (DHSC).
        <br/>
        <br/>
        Any cases in people who have not been tested are not included in the confirmed case count.
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Death count data</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        The figures shown are deaths in NHS-commissioned services of patients who have had a positive test result for COVID-19. These are reported by the services to NHS England. NHS England extracts data at 5pm each day and are reported in the dashboard the following day. Following validation, the total number of deaths in England is published by NHS England. This is combined with death counts provided to DHSC by the devolved administrations to give a UK total which is published by DHSC. Deaths outside NHS services are not included. Deaths of people who have had a positive test for COVID-19 could in some cases be due to a different cause.
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Recovered patient data</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        The figure shown is the number of people discharged from NHS clinical services in England following a positive test result for COVID-19. Data have been provided by NHS services. A new process for collecting numbers of recovered patients is in development.
      </Styles.Body>
      <Styles.SectionHeader className="govuk-heading-m">Interpreting the maps</Styles.SectionHeader>
      <Styles.Body className="govuk-body">
        The maps show counts of cases in each Upper Tier Local Authority (UTLA) area. UTLAs include counties and unitary authorities and vary enormously in population, from under 100,000 to over 1.4 million. Areas with larger populations would naturally have higher numbers of cases, even if the cases were completely evenly distributed around the country. In order to compare the numbers of cases between areas meaningfully it is necessary to calculate rates, but the comparisons would not have been robust when the numbers of cases in each area were small – rates will be shown as soon as possible.
      </Styles.Body>
    </Styles.Container>
  );
};

export default About;
