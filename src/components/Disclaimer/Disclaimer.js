// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Disclaimer.types';
import * as Styles from './Disclaimer.styles';

const Disclaimer: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container className="govuk-body-s">
      Daily updates are sometimes delayed as data cannot be published until signed off by DHSC. Case data is based on cases reported to PHE by diagnostic laboratories and matched to ONS administrative geography codes and names to generate geographic case counts. Total number for England may not match UTLA and NHS Regions number as some cases are awaiting geographical information. Cases include people who are recovered. Time series data indicate the date of communication to PHE and is used to define the charts and totals. The map is using proportional symbols to represent the number of cases at the geographic centres of Country, NHS England and County/UTLA boundaries. Devolved Administration data is represented on the charts, total indicators and on the Country level map layer, however it is not included in the NHS England Region and County/UTLA map layers. Data for Devolved Administrations has been sourced from authorised published data and is correct at time of publishing and subject to change. Contains Ordnance Survey data © Crown copyright and database right 2020. Contains National Statistics data © Crown copyright and database right 2020. There may be some minor fluctuations in the daily number of cases due to laboratory reporting delays. Patients recovered is the number of people discharged from NHS clinical services in England following a positive test result for COVID-19. England case count is as of 09:00 (GMT)
    </Styles.Container>
  );
};

export default Disclaimer;
