// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Line } from 'react-chartjs-2';

import type { Props } from './CumulativeDeaths.types';
import * as Styles from './CumulativeDeaths.styles';

const CumulativeDeaths: ComponentType<Props> = ({ data }: Props) => {
  return (
    <Styles.Container>
      <span className="govuk-heading-s">Total number of deaths over time</span>
      <Styles.Chart>
        <Line
          data={{
            labels: data.map(d => d.date),
            datasets: [{
              borderWidth: 2,
              borderColor: '#249184', 
              pointBorderColor: '#249184',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 3,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#249184',
              pointHoverBorderColor: '#249184',
              pointHoverBorderWidth: 5,
              pointRadius: 1,
              pointHitRadius: 10,
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

export default CumulativeDeaths;
