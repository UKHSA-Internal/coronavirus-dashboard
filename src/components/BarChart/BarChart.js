// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

import type { Props } from './BarChart.types';
import * as Styles from './BarChart.styles';

const sortFunc = (a, b) => {

  const
    dateA = new Date(a.date),
    dateB = new Date(b.date);

  if (dateA < dateB) return -1;

  return dateA > dateB ? 1 : 0

};

const BarChart: ComponentType<Props> = ({ header, tooltipText, data }: Props) => {

  const dataSorted = data.sort(sortFunc);

  return (
    <Styles.Container>
      <span className="govuk-heading-s">{header}</span>
      <Styles.Chart>
        <Bar
          data={{
            labels: dataSorted.map(d => d.date),
            datasets: [{
              backgroundColor: '#367E93',
              data: dataSorted.map(d => d.value),
            }]
          }}
          legend={{ display: false }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                offset: true,
                gridLines: {
                  display: false,
                },
                ticks: {
                  fontSize: 14,
                  autoSkip: false,
                  userCallback: function (value, index, values) {
                    const lastValue = dataSorted[index];
                    const label = moment(lastValue.date).format('MMM DD');
                    let valuesLength = values.length - 1;
                    let period = Math.round(valuesLength / 10);

                    if (index % period === 0 && index <= valuesLength - (period / 2)) {
                      return label;
                    }

                    if (index === valuesLength) {
                      return label;
                    }
                  }
                },
              }],
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                },
                ticks: {
                  fontSize: 14,
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  },
                },
              }],
            },
            tooltips: {
              // Disable the on-canvas tooltip
              enabled: false,

              custom: function (tooltipModel) {
                // Tooltip Element
                let tooltipEl = document.getElementById('chartjs-tooltip');

                // Create element on first render
                if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'chartjs-tooltip';
                  tooltipEl.innerHTML = '<table style="background-color: #000; color: #fff; border-radius: 5px; padding: 2px; opacity: 0.8"></table>';
                  document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                function getBody(bodyItem) {
                  return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map(getBody);

                  let innerHtml = '<thead>';
                  titleLines.forEach(function (title) {
                    innerHtml += '<tr><th class="govuk-body govuk-!-font-weight-bold govuk-!-margin-0" style="text-align: left; color: #fff; font-size: 14px;">'
                      + new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(title))
                      + '</th></tr>';
                  });
                  innerHtml += '</thead><tbody>';

                  bodyLines.forEach(function (body, i) {
                    const val = parseInt(body).toLocaleString();
                    const style = `border-width: 2px; color: #fff; font-size: 14px;`;
                    const span = '<span class="govuk-body govuk-!-margin-0" style="' + style + '">' + val +  ' ' + [tooltipText] + '</span>';
                    innerHtml += '<tr><td>' + span  + '</td></tr>';
                  });
                  innerHtml += '</tbody>';

                  let tableRoot = tooltipEl.querySelector('table');
                  tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                const position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
              }
            }
          }}
        />
      </Styles.Chart>
    </Styles.Container>
  );
};

export default BarChart;
