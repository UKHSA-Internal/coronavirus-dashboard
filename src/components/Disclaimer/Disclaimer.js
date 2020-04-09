// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Disclaimer.types';
import * as Styles from './Disclaimer.styles';

const Disclaimer: ComponentType<Props> = ({ text }: Props) => {
  return (
    <Styles.Container className="govuk-body-s">
      {text}
    </Styles.Container>
  );
};

export default Disclaimer;
