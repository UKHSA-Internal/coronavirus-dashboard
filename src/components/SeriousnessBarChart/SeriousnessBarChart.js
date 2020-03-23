// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './SeriousnessBarChart.types.js';
import * as Styles from './SeriousnessBarChart.styles.js';

const SeriousnessBarChart: ComponentType<Props> = ({ mild, severe, critical }: Props) => {
  return (
    <Styles.Container>
      <Styles.Title className="govuk-heading-m">Most cases are mild</Styles.Title>
      <Styles.Caption className="govuk-caption-s">Seriousness of symptons</Styles.Caption>
      <Styles.Chart>

        <Styles.BarContainer>
          <Styles.Bar percentage={mild} max={mild} />
          <Styles.Percentage>{mild}%</Styles.Percentage>
          <Styles.Label>Mild flu like symptoms</Styles.Label>
        </Styles.BarContainer>

        <Styles.BarContainer>
          <Styles.Bar percentage={severe} max={mild} />
          <Styles.Percentage>{severe}%</Styles.Percentage>
          <Styles.Label>Severe hospitalisation</Styles.Label>
        </Styles.BarContainer>

        <Styles.BarContainer>
          <Styles.Bar percentage={critical} max={mild} />
          <Styles.Percentage>{critical}%</Styles.Percentage>
          <Styles.Label>Critical intensive care</Styles.Label>
        </Styles.BarContainer>

      </Styles.Chart>
    </Styles.Container>
  );
};

export default SeriousnessBarChart;
