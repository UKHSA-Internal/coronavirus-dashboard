// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import axios from 'axios';

import PageTitle from 'components/PageTitle';
import BigNumber from 'components/BigNumber';
import SeriousnessBarChart from 'components/SeriousnessBarChart';
import RecoveryBarChart from 'components/RecoveryBarChart';
import HighRiskGroups from 'components/HighRiskGroups';
import Disclaimer from 'components/Disclaimer';

import type { Props } from './Overview.types';
import * as Styles from './Overview.styles';

const bigNumberSubtext = 'from previous 7 days';

const blobUrl = 'https://c19pub.azureedge.net/overview.json';
const Overview: ComponentType<Props> = ({}: Props) => {
  const [data, setData] = useState<?OverviewData>(null);

  useEffect(() => {
    const getData = async () => {
      const { data: d } = await axios.get(blobUrl);
      setData(d);
    };
    getData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        caption="Overview"
        title="UK cases of coronavirus (COVID-19)"
        subtitle={`Last updated ${new Date(data.lastUpdatedAt).toGMTString()}`}
      />
      <div />
      <BigNumber
        caption="Total number of cases"
        number={data['United Kingdom'].totalCases.value}
        percentageChange={5}
        subtext={bigNumberSubtext}
      />
      <BigNumber
        caption="Number of people who have coronavirus now"
        number={data['United Kingdom'].activeCases.value}
        percentageChange={0}
        subtext={bigNumberSubtext}
      />
      <BigNumber
        caption="Number of people tested"
        number={data['United Kingdom'].tested.value}
        percentageChange={124}
        subtext={bigNumberSubtext}
      />
      <BigNumber
        caption="Number of people in hospital"
        number={data['United Kingdom'].hospital.value}
        percentageChange={-23}
        subtext={bigNumberSubtext}
      />
      <BigNumber
        caption="Number of people who have recovered"
        number={data['United Kingdom'].recovered.value}
        percentageChange={0}
        subtext={bigNumberSubtext}
      />
      <BigNumber
        caption="Number of people who have died"
        number={data['United Kingdom'].deaths.value}
        percentageChange={20}
        subtext={bigNumberSubtext}
      />
      <SeriousnessBarChart
        mild={data['United Kingdom'].seriousness.mild}
        severe={data['United Kingdom'].seriousness.severe}
        critical={data['United Kingdom'].seriousness.critical}
      />
      <RecoveryBarChart
        recovered={data['United Kingdom'].recovery.recovered}
        ill={data['United Kingdom'].recovery.ill}
        dead={data['United Kingdom'].recovery.deaths}
      />
      <HighRiskGroups
        deathRate={data['United Kingdom'].highRisk.deathRate}
        severeOrCriticalRate={data['United Kingdom'].highRisk.seriousIllness}
      />
      <Disclaimer />
    </Styles.Container>
  );
};

export default Overview;
