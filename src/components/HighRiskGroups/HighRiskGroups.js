// @flow

import React from 'react';
import type { ComponentType } from 'react';

import StatisticWithContext from 'components/StatisticWithContext';

import type { Props } from './HighRiskGroups.types.js';
import * as Styles from './HighRiskGroups.styles.js';

const HighRiskGroups: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container>
      <Styles.Title className="govuk-heading-m">High risk groups</Styles.Title>
      <StatisticWithContext
        caption="Percentage of infectees who die"
        percentage={3.4}
        contextTitle="People 60+ are a high risk"
        contextText="Help over-60s by avoiding them if you have symptoms."
      />
      <StatisticWithContext
        caption="Percentage of people who contract ‘severe’ or ‘critical’ cases of COVID-19 who have other serious illness"
        percentage={72.4}
        contextTitle="People who are already ill are a high risk"
        contextText="Help people in who are already ill by avoiding them if you have symptoms."
      />
    </Styles.Container>
  );
};

export default HighRiskGroups;
