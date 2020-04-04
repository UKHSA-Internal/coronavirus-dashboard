// @flow

import React, { useEffect } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Tabs, Table } from 'govuk-react-jsx';
import numeral from 'numeral';

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './RegionTable.types';
import * as Styles from './RegionTable.styles';

const LinkOrText = ({ children, ...props }) => {
  const layout = useResponsiveLayout(768);
  if (layout === 'desktop') {
    return <Styles.Link {...props} role="button" tabIndex={0} href={null} className="govuk-link">{children}</Styles.Link>
  }
  return <span {...props}>{children}</span>;
};

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

  useEffect(() => {
    const containerId = (() => {
      if (country) {
        return 'country';
      }
      if (nhsRegion) {
        return 'regions';
      }
      if (localAuthority) {
        return 'local-authorities';
      }
      return '';
    })();

    const itemId = `table-link-${country || nhsRegion || localAuthority || null}`;

    const container = document.getElementById(containerId);
    const item = document.getElementById(itemId);
    if (container && item && item.offsetParent) {
      container.scrollTop = item.offsetParent.offsetTop - 10;
    }
  }, [country, nhsRegion, localAuthority]);

  const handleKeyDown = (type: 'countries' | 'regions' | 'utlas') => (r: string) => (event: SyntheticKeyboardEvent<*>) => {
    console.log(event.key)
    if (layout === 'desktop' && event.key === 'Enter') {
      setCountry(type === 'countries' ? r : null);
      setNhsRegion(type === 'regions' ? r : null);
      setLocalAuthority(type === 'utlas' ? r : null);
    }
  }

  const handleOnCountryKeyDown = handleKeyDown('countries');
  const handleOnNhsRegionKeyDown = handleKeyDown('regions');
  const handleOnLocalAuthorityKeyDown = handleKeyDown('utlas');

  const handleOnClick = (type: 'countries' | 'regions' | 'utlas') => (r: string) => () => {
    if (layout === 'desktop') {
      setCountry(type === 'countries' ? r : null);
      setNhsRegion(type === 'regions' ? r : null);
      setLocalAuthority(type === 'utlas' ? r : null);
    }
  }

  const handleOnCountryClick = handleOnClick('countries');
  const handleOnNhsRegionClick = handleOnClick('regions');
  const handleOnLocalAuthorityClick = handleOnClick('utlas');

  const { lastUpdatedAt: _, disclaimer: __, ...countries } = countryData;
  const countryKeys = Object.keys(countries);

  const { lastUpdatedAt: ___, disclaimer: ____, ...nhsRegions } = nhsRegionData;
  const nhsRegionKeys = Object.keys(nhsRegions);

  const { lastUpdatedAt: _____, disclaimer: ______, ...localAuthories } = localAuthorityData;
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
                  head={[{ children: ['Country']}, { children: ['Total cases'], format: 'numeric' }, { children: ['Deaths'], format: 'numeric' }]}
                  rows={countryKeys.sort(sortFunc(countryData)).map(r => [
                    { children: [<LinkOrText id={`table-link-${r}`} onClick={handleOnCountryClick(r)} onKeyPress={handleOnCountryKeyDown} active={country === r}>{countryData[r].name.value}</LinkOrText>] },
                    { children: [numeral(countryData[r].totalCases.value).format('0,0')], format: 'numeric' },
                    { children: [numeral(countryData[r].deaths.value).format('0,0')], format: 'numeric' },
                  ])}
                />
              ],
            }
          },
          {
            id: 'regions',
            label: 'Regions',
            panel: {
              children: [
                <Table
                  head={[{ children: ['Region']}, { children: ['Total cases'], format: 'numeric' }]}
                  rows={nhsRegionKeys.sort(sortFunc(nhsRegionData)).map(r => [
                    { children: [<LinkOrText id={`table-link-${r}`} onClick={handleOnNhsRegionClick(r)} onKeyPress={handleOnNhsRegionKeyDown} active={nhsRegion === r}>{nhsRegionData[r].name.value}</LinkOrText>] },
                    { children: [numeral(nhsRegionData[r].totalCases.value).format('0,0')], format: 'numeric' },
                  ])}
                />
              ],
            }
          },
          {
            id: 'local-authorities',
            label: 'Upper tier local authorities',
            panel: {
              children: [
                <Table
                  head={[{ children: ['UTLA'] }, { children: ['Total cases'], format: 'numeric' }]}
                  rows={localAuthorityKeys.sort(sortFunc(localAuthorityData)).map(r => [
                    { children: [<LinkOrText id={`table-link-${r}`} onClick={handleOnLocalAuthorityClick(r)} onKeyPress={handleOnLocalAuthorityKeyDown} active={localAuthority === r}>{localAuthorityData[r].name.value}</LinkOrText>] },
                    { children: [numeral(localAuthorityData[r].totalCases.value).format('0,0')], format: 'numeric' },
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
