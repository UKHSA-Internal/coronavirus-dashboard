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
import ExportAsCSV from "components/Export";

import isIE from 'isIE';

import type { Props } from './Regional.types';
import * as Styles from './Regional.styles';

const formatAMPM = date => {

  let
      hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      ampm = hours >= 12 ? 'pm' : 'am';

  hours = (hours % 12) || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`

};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (d: string="") => {

    if (d === "") return "";

    const date = new Date(d.toLowerCase().endsWith("z") ? d : `${d}Z`);

    return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${formatAMPM(date)} GMT`;

};

const Regional: ComponentType<Props> = ({}: Props) => {
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [utla, setUtla] = useState(null);
  const [view, setView] = useState('chart');
  const data = useLoadData();
  const layout = useResponsiveLayout(768);

  if (!data) {
    return null;
  }

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        title="Coronavirus (COVID-19) in the UK"
        subtitle={`Last updated ${formatDate(data?.lastUpdatedAt)}`}
      />
      <BigNumber
        caption="Total number of lab-confirmed UK cases"
        number={data?.overview?.K02000001?.totalCases?.value ?? 0}
      />
      <BigNumber
        caption="Latest daily number of lab-confirmed UK cases"
        number={data?.overview?.K02000001?.newCases?.value ?? 0}
      />
      <BigNumber
        caption="Total number of COVID-19 associated UK deaths in hospital"
        number={data?.overview?.K02000001?.deaths.value ?? 0}
      />
      <BigNumber
        caption="Latest daily number of COVID-19 associated UK deaths in hospital"
        number={data?.overview?.K02000001?.dailyDeaths?.slice(-1)[0]?.value ?? 0}
      />
      {isIE() && <div style={{ width: '68%' }} />}
      {layout === 'desktop' && (
        <>
          <RegionTable
            country={country}
            setCountry={setCountry}
            countryData={data?.countries}
            region={region}
            setRegion={setRegion}
            regionData={data?.regions}
            utla={utla}
            setUtla={setUtla}
            utlaData={data?.utlas}
          />
          <Map
            country={country}
            setCountry={setCountry}
            countryData={data?.countries}
            region={region}
            setRegion={setRegion}
            regionData={data?.regions}
            utla={utla}
            setUtla={setUtla}
            utlaData={data?.utlas}
          />
        </>
      )}
      <ExportAsCSV data={ data }/>
      <ViewAs view={view} setView={setView} />
      {view === 'chart' && (
        <>
          <LineChart data={data?.countries?.E92000001?.dailyTotalConfirmedCases ?? []} header="Total number of lab-confirmed England cases" tooltipText="cases" />
          <BarChart data={data?.countries?.E92000001?.dailyConfirmedCases ?? []} header="Daily number of lab-confirmed England cases" tooltipText="cases" />
          <LineChart data={data?.overview?.K02000001?.dailyTotalDeaths ?? []} header="Total number of COVID-19 associated UK deaths in hospital" tooltipText="deaths" />
          <BarChart data={data?.overview?.K02000001?.dailyDeaths ?? []} header="Daily number of COVID-19 associated UK deaths in hospital" tooltipText="deaths" />
        </>
      )}
      {view === 'table' && (
        <>
          <AltChartTable data={data?.countries?.E92000001?.dailyTotalConfirmedCases ?? []} header="Total number of lab-confirmed England cases" valueName="Total cases" />
          <AltChartTable data={data?.countries?.E92000001?.dailyConfirmedCases ?? []} header="Daily number of lab-confirmed England cases" valueName="Daily cases" />
          <AltChartTable data={data?.overview?.K02000001?.dailyTotalDeaths ?? []} header="Total number of COVID-19 associated UK deaths in hospital" valueName="Total deaths" />
          <AltChartTable data={data?.overview?.K02000001?.dailyDeaths ?? []} header="Daily number of COVID-19 associated UK deaths in hospital" valueName="Daily deaths" />
        </>
      )}
      <Disclaimer text={data?.disclaimer} />
    </Styles.Container>
  );
};

export default Regional;
