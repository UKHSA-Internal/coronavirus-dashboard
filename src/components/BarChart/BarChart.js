// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Bar } from 'react-chartjs-2';

import type { Props } from './BarChart.types';
import * as Styles from './BarChart.styles';

const BarChart: ComponentType<Props> = ({ header, data }: Props) => {
  return (
    <Styles.Container>
      <span className="govuk-heading-s">{header}</span>
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

export default BarChart;
