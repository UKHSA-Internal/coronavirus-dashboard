// @flow

import React from 'react';
import type { ComponentType } from 'react';
import numeral from 'numeral';

import type { Props } from './BigNumber.types.js';
import * as Styles from './BigNumber.styles.js';

const BigNumber: ComponentType<Props> = ({ caption, number, description, asterisk }: Props) => {
  return (
    <Styles.Container>
      <Styles.Caption className="govuk-heading-m">{caption}</Styles.Caption>
      <Styles.Number className="govuk-heading-l">{numeral(number).format('0,0')}{asterisk ? '*' : ''}</Styles.Number>
      <Styles.Caption className="govuk-body govuk-!-font-size-16 govuk-!-margin-bottom-1">{description}</Styles.Caption>
    </Styles.Container>
  );
};

export default BigNumber;
