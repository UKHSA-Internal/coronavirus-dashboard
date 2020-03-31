// @flow

import React from 'react';
import type { ComponentType } from 'react';
import numeral from 'numeral';

import type { Props } from './BigNumber.types.js';
import * as Styles from './BigNumber.styles.js';

const BigNumber: ComponentType<Props> = ({ caption, number, percentageChange, subtext, asterisk }: Props) => {
  return (
    <Styles.Container>
      <Styles.Caption className="govuk-caption-s">{caption}</Styles.Caption>
      <Styles.Number className="govuk-heading-l">{numeral(number).format('0,0')}{asterisk ? '*' : ''}</Styles.Number>
      {/* <Styles.PercentageChange className="govuk-body">
        {percentageChange}%&nbsp;
        <Styles.Triangle percentageChange={percentageChange} />
      </Styles.PercentageChange>
      <Styles.Subtext className="govuk-body">{subtext}</Styles.Subtext> */}
    </Styles.Container>
  );
};

export default BigNumber;
