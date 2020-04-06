// @flow

import React from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import RegionTable from 'components/RegionTable';

import type { Props } from './MobileRegionTable.types';
import * as Styles from './MobileRegionTable.styles';

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

const MobileRegionTable: ComponentType<Props> = ({}: Props) => {
  const data = useLoadData();

  if (!data) {
    return null;
  }

  return (
    <Styles.Container className="govuk-width-container">
      <PageTitle
        caption="Regional view"
        title="Coronavirus (COVID-19) in the UK"
        subtitle={`Last updated ${formatDate(new Date(data?.lastUpdatedAt))}`}
      />
      <RegionTable
        countryData={data?.countries}
        nhsRegionData={data?.regions}
        localAuthorityData={data?.utlas}
      />
    </Styles.Container>
  );
};

export default MobileRegionTable;