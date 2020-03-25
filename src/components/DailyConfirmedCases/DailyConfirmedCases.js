// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Bar } from 'react-chartjs-2';

import type { Props } from './DailyConfirmedCases.types.js';
import * as Styles from './DailyConfirmedCases.styles.js';

const DailyConfirmedCases: ComponentType<Props> = ({ region, data }: Props) => {
  return (
    <Styles.Container>
      <span className="govuk-heading-s">Number of new cases per day</span>
      {/* <Styles.Summary>
        <Styles.Circle />
        <span className="govuk-heading-s">{data.slice(-1)[0]?.value} new cases confirmed in {region} in the last 24 hours</span>
      </Styles.Summary> */}
      <Styles.Chart>
        <Bar
          data={{
            labels: data.map(d => d.date),
            datasets: [{
              backgroundColor: '#249184', 
              data: data.map(d => d.value),
            }]
          }}
          legend={{ display: false }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                      quarter: 'MMM YYYY'
                  },
                },
                gridLines: {
                  display: false,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 20
                },
              }],
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                },
              }],
            },
          }}
        />
      </Styles.Chart>
    </Styles.Container>
  );
};

export default DailyConfirmedCases;
