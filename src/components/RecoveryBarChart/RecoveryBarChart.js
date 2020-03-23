// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './RecoveryBarChart.types.js';
import * as Styles from './RecoveryBarChart.styles.js';

const RecoveryBarChart: ComponentType<Props> = ({ recovered, ill, dead }: Props) => {
  // const total = recovered + ill + dead;
  const total = recovered + dead;
  return (
    <Styles.Container>
      <Styles.Title className="govuk-heading-m">The majority of people recover</Styles.Title>
      <Styles.Caption className="govuk-caption-s">Recovery</Styles.Caption>
      <Styles.Chart>

        <Styles.BarContainer count={recovered} total={total}>
          <Styles.Bar color="#1D70B8" />
          <Styles.Count>{recovered}</Styles.Count>
          <Styles.Label>Recovered</Styles.Label>
        </Styles.BarContainer>

        {/* <Styles.BarContainer count={ill} total={total}>
          <Styles.Bar color="#D8D8D8" />
          <Styles.Count>{ill}</Styles.Count>
          <Styles.Label>Currently ill</Styles.Label>
        </Styles.BarContainer> */}

        <Styles.BarContainer count={dead} total={total}>
          <Styles.Bar color="#0B0C0C" />
          <Styles.Count>{dead}</Styles.Count>
          <Styles.Label>Deaths</Styles.Label>
        </Styles.BarContainer>

      </Styles.Chart>
    </Styles.Container>
  );
};

export default RecoveryBarChart;
