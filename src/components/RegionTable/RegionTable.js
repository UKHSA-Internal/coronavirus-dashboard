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

  const { lastUpdatedAt: _, ...localAuthories } = localAuthorityData;
  const localAuthorityNames = Object.keys(localAuthories);

  const { lastUpdatedAt: __, ...nhsRegions } = nhsRegionData;
  const nhsRegionNames = Object.keys(nhsRegions);

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
                  rows={['England', 'Scotland', 'Wales', 'Northern Ireland'].sort().map(r => [
                    { children: [<Styles.Link onClick={handleOnCountryClick(r)} active={country === r} to={href(r, 'country')} className="govuk-link">{r}</Styles.Link>] },
                    { children: [countryData[r].totalCases.value], format: 'numeric' },
                    // { children: [countryData[r].deaths.value], format: 'numeric' }
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
                  rows={nhsRegionNames.sort().map(r => [
                    { children: [<Styles.Link onClick={handleOnNhsRegionClick(r)} active={nhsRegion === r} to={href(r, 'nhs-region')} className="govuk-link">{r}</Styles.Link>] },
                    { children: [nhsRegionData[r].totalCases.value], format: 'numeric' },
                    // { children: [nhsRegionData[r].deaths.value], format: 'numeric' }
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
                  rows={localAuthorityNames.sort().map(r => [
                    { children: [<Styles.Link onClick={handleOnLocalAuthorityClick(r)} active={localAuthority === r} to={href(r, 'local-authority')} className="govuk-link">{r}</Styles.Link>] },
                    { children: [localAuthorityData[r].totalCases.value], format: 'numeric' },
                    // { children: [localAuthorityData[r].deaths.value], format: 'numeric' }
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
