// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Radios } from 'govuk-react-jsx';

import type { Props } from './ViewAs.types.js';
import * as Styles from './ViewAs.styles.js';

const ViewAs: ComponentType<Props> = ({ view, setView }: Props) => {
  return (
    <Styles.Container>
      <Radios
        value={view}
        onChange={v => setView(v.target.value)}
        className="govuk-radios--inline"
        formGroup={{
          className: 'govuk-radios--small'
        }}
        fieldset={{
          legend: {
            children: [
              'View data as:'
            ]
          }
        }}
        items={[
          {
            children: [
              'Chart'
            ],
            value: 'chart'
          },
          {
            children: [
              'Table'
            ],
            value: 'table'
          },
        ]}
        name="view-as"
      />
    </Styles.Container>
  );
};

export default ViewAs;
