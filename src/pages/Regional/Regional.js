// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import useResponsiveLayout from 'hooks/useResponsiveLayout';
import BigNumber from 'components/BigNumber';
import PageTitle from 'components/PageTitle';
import RegionTable from 'components/RegionTable';
import Map from 'components/Map';
import Disclaimer from 'components/Disclaimer';

import type { Props } from './Regional.types';
import * as Styles from './Regional.styles';
import LineChart from 'components/LineChart';
import BarChart from '../../components/BarChart';

const LocalAuthorityal: ComponentType<Props> = ({}: Props) => {
  const [country, setCountry] = useState(null);
  const [nhsRegion, setNhsRegion] = useState(null);
  const [localAuthority, setLocalAuthority] = useState(null);
  const [overviewData, countryData, nhsRegionData, localAuthorityData] = useLoadData();
  const layout = useResponsiveLayout(768);

  if (!overviewData || !countryData || !nhsRegionData || !localAuthorityData) {
    return null;
  }

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        caption="Regional view"
        title="Coronavirus (COVID-19) in the UK"
        subtitle={`Last updated ${new Date(overviewData.lastUpdatedAt).toGMTString()}`}
      />
      <BigNumber
        caption="Total number of UK cases"
        number={overviewData?.K02000001?.totalCases?.value ?? 0}
      />
      <BigNumber
        caption="Number of people who have died in the UK"
        number={overviewData?.K02000001?.deaths.value ?? 0}
      />
      <BigNumber
        caption="Number of people who have recovered"
        number={overviewData?.K02000001?.recovered.value ?? 0}
        asterisk
      />
      <BigNumber
        caption={`Number of UK cases from yesterday (${overviewData?.K02000001?.dailyConfirmedCases.slice(-1)[0]?.date})`}
        number={overviewData?.K02000001?.dailyConfirmedCases.slice(-1)[0]?.value ?? 0}
      />
      <BigNumber
        caption={`Number of UK deaths from yesterday (${overviewData?.K02000001?.dailyConfirmedCases.slice(-1)[0]?.date})`}
        number={overviewData?.K02000001?.dailyDeaths.slice(-1)[0]?.value ?? 0}
      />
      {layout === 'desktop' && (
        <>
          <RegionTable
            country={country}
            setCountry={setCountry}
            countryData={countryData}
            nhsRegion={nhsRegion}
            setNhsRegion={setNhsRegion}
            nhsRegionData={nhsRegionData}
            localAuthority={localAuthority}
            setLocalAuthority={setLocalAuthority}
            localAuthorityData={localAuthorityData}
          />
          <Map
            country={country}
            setCountry={setCountry}
            countryData={countryData}
            nhsRegion={nhsRegion}
            setNhsRegion={setNhsRegion}
            nhsRegionData={nhsRegionData}
            localAuthority={localAuthority}
            setLocalAuthority={setLocalAuthority}
            localAuthorityData={localAuthorityData}
          />
        </>
      )}
      <LineChart data={overviewData?.K02000001?.dailyTotalConfirmedCases ?? []} header="Total number of cases over time" />
      <BarChart data={overviewData?.K02000001?.dailyConfirmedCases ?? []} header="Number of new cases per day" />
      <LineChart data={overviewData?.K02000001?.dailyTotalDeaths ?? []} header="Total number of deaths over time" />
      <BarChart data={overviewData?.K02000001?.dailyDeaths ?? []} header="Number of new deaths per day" />
      <Disclaimer />
    </Styles.Container>
  );
};

export default LocalAuthorityal;
