// @flow

import React from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import RegionTable from 'components/RegionTable';

import type { Props } from './MobileRegionTable.types';
import * as Styles from './MobileRegionTable.styles';

const MobileRegionTable: ComponentType<Props> = ({}: Props) => {
  const [overviewData, countryData, nhsRegionData, localAuthorityData] = useLoadData();

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
      <RegionTable
        countryData={countryData}
        nhsRegionData={nhsRegionData}
        localAuthorityData={localAuthorityData}
      />
    </Styles.Container>
  );
};

export default MobileRegionTable;