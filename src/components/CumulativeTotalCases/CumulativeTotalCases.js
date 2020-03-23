// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Line } from 'react-chartjs-2';

import type { Props } from './CumulativeTotalCases.types';
import * as Styles from './CumulativeTotalCases.styles';

const CumulativeTotalCases: ComponentType<Props> = ({ dailyData }: Props) => {
  const data = dailyData.reduce((acc, cur) => {
    return [
      ...acc,
      {
        ...cur,
        value: cur.value + acc.slice(-1)[0]?.value ?? 0,
      },
    ];
  }, []);
  return (
    <Styles.Container>
      <span className="govuk-heading-s">Total number of cases over time</span>
      <Styles.Chart>
        <Line
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

export default CumulativeTotalCases;
