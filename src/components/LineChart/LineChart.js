// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { Line } from 'react-chartjs-2';
import * as moment from 'moment';
import useResponsiveLayout from "hooks/useResponsiveLayout";

import type { Props } from './LineChart.types';
import * as Styles from './LineChart.styles';


const dateSortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    return dateA < dateB ? 1 : dateA > dateB || 0;

}; // sortFunc


const LineChart: ComponentType<Props> = ({ header, tooltipText, data }: Props) => {

  const mobileView = useResponsiveLayout(500)  === "mobile"

  return (
    <Styles.Container>
      <span className="govuk-heading-s">{header}</span>
      <Styles.Chart>
        <Line
          data={{
            labels: data.map(d => d.date),
            datasets: [{
              borderWidth: 2,
              borderColor: '#367E93',
              pointBorderColor: '#367E93',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 3,
              pointHoverRadius: 3,
              pointHoverBackgroundColor: '#367E93',
              pointHoverBorderColor: '#367E93',
              pointHoverBorderWidth: 5,
              pointRadius: 1,
              pointHitRadius: 5,
              data: data.map(d => d.value),
            }]
          }}
          legend={{ display: false }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                offset: true,
                type: 'time',
                gridLines: {
                  display: true,
                },
                ticks: {
                  minRotation: 45,
                  fontSize: mobileView ? 11 : 14,
                  fontColor: '#1A2B2B',
                  autoSkip: true,
                  minTicksLimit: 8,
                  maxTicksLimit: 15
                },
              }],
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                },
                ticks: {
                  fontSize: 14,
                  fontColor: '#1A2B2B',
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

                // Display, position, and styles
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

export default LineChart;
