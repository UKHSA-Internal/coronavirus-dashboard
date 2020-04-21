// @flow

import React from 'react';
import type { ComponentType } from 'react';

import AltChartTable from 'components/AltChartTable';

import type { Props } from './NoScriptChartTables.types.js';
import * as Styles from './NoScriptChartTables.styles.js';

const NoScriptChartTables: ComponentType<Props> = ({ data }: Props) => {
  return (
    <Styles.Container>
      <AltChartTable data={data?.countries?.E92000001?.dailyTotalConfirmedCases ?? []} header="Total number of lab-confirmed England cases" valueName="Total cases" />
      <AltChartTable data={data?.countries?.E92000001?.dailyConfirmedCases ?? []} header="Daily number of lab-confirmed England cases" valueName="Daily cases" />
      <AltChartTable data={data?.overview?.K02000001?.dailyTotalDeaths ?? []} header="Total number of COVID-19 associated UK deaths in hospital" valueName="Total deaths" />
      <AltChartTable data={data?.overview?.K02000001?.dailyDeaths ?? []} header="Daily number of COVID-19 associated UK deaths in hospital" valueName="Daily deaths" />
    </Styles.Container>
  );
};

export default NoScriptChartTables;
