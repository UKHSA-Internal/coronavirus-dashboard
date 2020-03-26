// @flow

import React, { useEffect } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Tabs, Table } from 'govuk-react-jsx';

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './RegionTable.types';
import * as Styles from './RegionTable.styles';

const RegionTable: ComponentType<Props> = ({
  country,
  setCountry,
  countryData,
  nhsRegion,
  setNhsRegion,
  nhsRegionData,
  localAuthority,
  setLocalAuthority,
  localAuthorityData,
  history: { push },
  location: { hash },
}: Props) => {
  const layout = useResponsiveLayout(768);

  useEffect(() => {
    const element = document.getElementById(`tab_${hash.replace('#', '')}`);
    if (element) {
      element.click();
    }
  }, [hash]);

  const handleOnLocalAuthorityClick = (r: string) => () => {
    if (layout === 'desktop') {
      setLocalAuthority(r);
      setCountry(null);
    }
  };

  const handleOnCountryClick = (r: string) => () => {
    if (layout === 'desktop') {
      setCountry(r);
      setLocalAuthority(null);
    }
  };

  const handleOnNhsRegionClick = (r: string) => () => {
    if (layout === 'desktop') {
      setCountry(null);
      setNhsRegion(r);
      setLocalAuthority(null);
    }
  };

  const href = (r: string, page: string) => {
    if (layout === 'mobile') {
      return `/${page}/${r}`;
    }
  };

  const { lastUpdatedAt: _, ...countries } = countryData;
  const countryKeys = Object.keys(countries);

  const { lastUpdatedAt: __, ...nhsRegions } = nhsRegionData;
  const nhsRegionKeys = Object.keys(nhsRegions);

  const { lastUpdatedAt: ___, ...localAuthories } = localAuthorityData;
  const localAuthorityKeys = Object.keys(localAuthories);

  const sortFunc = d => (a, b) => {
    const aValue = d?.[a]?.name?.value;
    const bValue = d?.[b]?.name?.value;

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  };


  return (
    <Styles.Container>
      <Tabs
        items={[
          {
            id: 'countries',
            label: 'Countries',
            panel: {
              children: [
                <Table
                  head={[{ children: ['Country']}, { children: ['Total cases'], format: 'numeric' }]}
                  rows={countryKeys.sort(sortFunc(countryData)).map(r => [
                    { children: [<Styles.Link onClick={handleOnCountryClick(r)} active={country === r} to={href(r, 'country')} className="govuk-link">{countryData[r].name.value}</Styles.Link>] },
                    { children: [countryData[r].totalCases.value], format: 'numeric' },
                  ])}
                />
              ],
            }
          },
          {
            id: 'nhs-regions',
            label: 'NHS regions',
            panel: {
              children: [
                <Table
                  head={[{ children: ['NHS region']}, { children: ['Total cases'], format: 'numeric' }]}
                  rows={nhsRegionKeys.sort(sortFunc(nhsRegionData)).map(r => [
                    { children: [<Styles.Link onClick={handleOnNhsRegionClick(r)} active={nhsRegion === r} to={href(r, 'nhs-region')} className="govuk-link">{nhsRegionData[r].name.value}</Styles.Link>] },
                    { children: [nhsRegionData[r].totalCases.value], format: 'numeric' },
                  ])}
                />
              ],
            }
          },
          {
            id: 'local-authorities',
            label: 'Local authorities',
            panel: {
              children: [
                <Table
                  head={[{ children: ['Local authority'] }, { children: ['Total cases'], format: 'numeric' }]}
                  rows={localAuthorityKeys.sort(sortFunc(localAuthorityData)).map(r => [
                    { children: [<Styles.Link onClick={handleOnLocalAuthorityClick(r)} active={localAuthority === r} to={href(r, 'local-authority')} className="govuk-link">{localAuthorityData[r].name.value}</Styles.Link>] },
                    { children: [localAuthorityData[r].totalCases.value], format: 'numeric' },
                  ])}
                />
              ],
            }
          },
        ]}
      />
    </Styles.Container>
  );
};

export default withRouter(RegionTable);
