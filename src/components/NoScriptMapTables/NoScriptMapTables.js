// @flow

import React from 'react';
import type { ComponentType } from 'react';
import numeral from 'numeral';
import { Table } from 'govuk-react-jsx/govuk/components/table';

import type { Props } from './NoScriptMapTables.types';
import * as Styles from './NoScriptMapTables.styles';

const sortFunc = (d: CountryData | RegionData | UtlaData) => (a, b) => {
  // $FlowFixMe
  const aValue = d?.[a]?.name?.value;
  // $FlowFixMe
  const bValue = d?.[b]?.name?.value;

  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
};

const NoScriptMapTables: ComponentType<Props> = ({
  countryData,
  regionData,
  utlaData,
}: Props) => {
  return (
    <Styles.Container>
      <Styles.TableWrapper>
        <Table
          head={[{ children: ['Country']}, { children: ['Total cases'], format: 'numeric' }, { children: ['Deaths'], format: 'numeric' }]}
          rows={Object.keys(countryData).sort(sortFunc(countryData)).map(r => [
            { children: [<span id={`table-link-${r}`}>{countryData[r].name.value}</span>] },
            { children: [numeral(countryData[r].totalCases.value).format('0,0')], format: 'numeric' },
            { children: [numeral(countryData[r].deaths.value).format('0,0')], format: 'numeric' },
          ])}
        />
      </Styles.TableWrapper>
      <Styles.TableWrapper>
        <Table
          head={[{ children: ['Region']}, { children: ['Total cases'], format: 'numeric' }]}
          rows={Object.keys(regionData).sort(sortFunc(regionData)).map(r => [
            { children: [<span id={`table-link-${r}`}>{regionData[r].name.value}</span>] },
            { children: [numeral(regionData[r].totalCases.value).format('0,0')], format: 'numeric' },
          ])}
        />
      </Styles.TableWrapper>
      <Styles.TableWrapper>
        <Table
          head={[{ children: ['UTLA'] }, { children: ['Total cases'], format: 'numeric' }]}
          rows={Object.keys(utlaData).sort(sortFunc(utlaData)).map(r => [
            { children: [<span id={`table-link-${r}`}>{utlaData[r].name.value}</span>] },
            { children: [numeral(utlaData[r].totalCases.value).format('0,0')], format: 'numeric' },
          ])}
        />
      </Styles.TableWrapper>
    </Styles.Container>
  );
};

export default NoScriptMapTables;
