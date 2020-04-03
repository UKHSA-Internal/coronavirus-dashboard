// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Disclaimer.types';
import * as Styles from './Disclaimer.styles';

const Disclaimer: ComponentType<Props> = ({ text }: Props) => {
  return (
    <Styles.Container className="govuk-body-s">
      {/* The map uses proportional symbols to represent the number of cases at the geographic centres of Country, NHS England Region and Upper Tier Local Authority boundaries.
      Data for Devolved Administrations have been sourced from authorised published data and are correct at the time of publishing and subject to change.
      Contains Ordnance Survey data © Crown copyright and database right 2020.
      Contains Office for National Statistics data © Crown copyright and database right 2020.
      England and Scotland case counts are as of 09:00 30/03/2020, Wales case count is as of 07:00 30/03/2020,
      Northern Ireland case count is as of 09:15 30/03/2020, 
      Deaths counts are as of 17:00 29/03/2020 except Scotland which is as of 09:00 29/03/2020. */}
      {text}
    </Styles.Container>
  );
};

export default Disclaimer;
