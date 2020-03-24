// @flow

import React from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import BigNumberBlock from 'components/BigNumberBlock';
import BigNumber from 'components/BigNumber';
import DailyConfirmedCases from 'components/DailyConfirmedCases';
import CumulativeTotalCases from 'components/CumulativeTotalCases';
import Disclaimer from 'components/Disclaimer';

import type { Props } from './SingleRegion.types';
import * as Styles from './SingleRegion.styles';

const SingleRegion: ComponentType<Props> = ({ match: { params: { country, nhsRegion, localAuthority }}}: Props) => {
  const [overviewData, countryData, nhsRegionData, localAuthorityData] = useLoadData();

  if (!overviewData || !countryData || !nhsRegionData || !localAuthorityData) {
    return null;
  }

  const data = (() => {
    if (country) {
      return countryData?.[country];
    }
    if (nhsRegion) {
      return nhsRegionData?.[nhsRegion];
    }
    if (localAuthority) {
      return localAuthorityData?.[localAuthority];
    }
    return null;
  })();

  const region = (() => {
    if (country) {
      return country;
    }
    if (nhsRegion) {
      return nhsRegion;
    }
    if (localAuthority) {
      return localAuthority;
    }
    return '';
  })();

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        caption="view"
        title={region}
        subtitle={`Last updated ${new Date(overviewData.lastUpdatedAt).toGMTString()}`}
        backUrl="/regional"
      />
      <div />
      {region && (
        <>
          {/* <BigNumberBlock data={data} /> */}
          <BigNumber
            caption="Total number of cases"
            number={data?.totalCases?.value ?? 0}
            percentageChange={5}
            subtext=""
          />
          <CumulativeTotalCases dailyData={data?.dailyConfirmedCases ?? []} />
          <DailyConfirmedCases region={region} data={data?.dailyConfirmedCases ?? []} />
        </>
      )}
      <Disclaimer />
    </Styles.Container>
  );
};

export default SingleRegion;

