// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Table } from 'govuk-react-jsx';
import numeral from 'numeral';

import type { Props } from './AltChartTable.types';
import * as Styles from './AltChartTable.styles';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (d: Date) => `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

const AltChartTable: ComponentType<Props> = ({ header, valueName, data }: Props) => {
  return (
    <Styles.Container>
      <span className="govuk-heading-s">{header}</span>
      <Styles.Table>
        <Table
          // caption={header}
          // captionClassName="govuk-heading-m"
          head={[{ children: ['Date']}, { children: [valueName], format: 'numeric' }]}
          rows={data.map(d => [
            { children: [formatDate(new Date(d.date))] },
            { children: [numeral(d.value).format('0,0')], format: 'numeric' },
          ])}
        />
      </Styles.Table>
    </Styles.Container>
  );
};

export default AltChartTable;
