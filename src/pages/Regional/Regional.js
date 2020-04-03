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
import LineChart from 'components/LineChart';
import BarChart from 'components/BarChart';
import ViewAs from 'components/ViewAs';
import AltChartTable from 'components/AltChartTable';
import isIE from 'isIE';

import type { Props } from './Regional.types';
import * as Styles from './Regional.styles';

const formatAMPM = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (d: Date) => `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} ${formatAMPM(d)}`;

const Regional: ComponentType<Props> = ({}: Props) => {
  const [country, setCountry] = useState(null);
  const [nhsRegion, setNhsRegion] = useState(null);
  const [localAuthority, setLocalAuthority] = useState(null);
  const [view, setView] = useState('chart');
  const [overviewData, countryData, nhsRegionData, localAuthorityData] = useLoadData();
  const layout = useResponsiveLayout(768);

  if (!overviewData || !countryData || !nhsRegionData || !localAuthorityData) {
    return null;
  }

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        title="Coronavirus (COVID-19) in the UK"
        subtitle={`Last updated ${formatDate(new Date(overviewData.lastUpdatedAt))}`}
      />
      <BigNumber
        caption="Total number of lab-confirmed UK cases"
        number={overviewData?.K02000001?.totalCases?.value ?? 0}
      />
      <BigNumber
        caption="Total number of COVID-19 associated UK deaths in hospital"
        number={overviewData?.K02000001?.deaths.value ?? 0}
      />
      <BigNumber
        caption="Latest daily number of lab-confirmed UK cases"
        number={overviewData?.K02000001?.dailyConfirmedCases.slice(-1)[0]?.value ?? 0}
      />
      <BigNumber
        caption="Latest daily number of COVID-19 associated UK deaths in hospital"
        number={overviewData?.K02000001?.dailyDeaths.slice(-1)[0]?.value ?? 0}
      />
      {isIE() && <div style={{ width: '68%' }} />}
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
      <ViewAs view={view} setView={setView} />
      {view === 'chart' && (
        <>
          <LineChart data={overviewData?.K02000001?.dailyTotalConfirmedCases ?? []} header="Total number of lab-confirmed UK cases" />
          <BarChart data={overviewData?.K02000001?.dailyConfirmedCases ?? []} header="Daily number of lab-confirmed cases" />
          <LineChart data={overviewData?.K02000001?.dailyTotalDeaths ?? []} header="Total number of COVID-19 associated UK deaths in hospital" />
          <BarChart data={overviewData?.K02000001?.dailyDeaths ?? []} header="Daily number of COVID-19 associated UK deaths in hospital" />
        </>
      )}
      {view === 'table' && (
        <>
          <AltChartTable data={overviewData?.K02000001?.dailyTotalConfirmedCases ?? []} header="Total number of lab-confirmed UK cases" valueName="Total cases" />
          <AltChartTable data={overviewData?.K02000001?.dailyConfirmedCases ?? []} header="Daily number of lab-confirmed cases" valueName="Daily cases" />
          <AltChartTable data={overviewData?.K02000001?.dailyTotalDeaths ?? []} header="Total number of COVID-19 associated UK deaths in hospital" valueName="Total deaths" />
          <AltChartTable data={overviewData?.K02000001?.dailyDeaths ?? []} header="Daily number of COVID-19 associated UK deaths in hospital" valueName="Daily deaths" />
        </>
      )}
      <Disclaimer text={overviewData?.disclaimer} />
    </Styles.Container>
  );
};

export default Regional;
