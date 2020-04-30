// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

import type { Props } from './StackedBarChart.types';
import * as Styles from './StackedBarChart.styles';

import numeral from 'numeral';


const getBarChartData = ({ previous, change }) => {

    return {
        labels: previous.map(d => d.date),
        datasets: [
            {
                label: "Previously reported",
                backgroundColor: '#367E93',
                data: previous.map(d => d.value)
            },
            {
                label: "Newly reported",
                backgroundColor: '#0a495a',
                data: change.map(d => d.value > 0 ? d.value : 0)
            }
        ]
    }

};


const getBarChartOptions = (tooltipText) => {

    return {
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom'
        },
        scales: {
            xAxes: [{
                offset: true,
                gridLines: {
                    display: false,
                },
                stacked: true,
                ticks: {
                    fontSize: 14,
                    fontColor: '#1A2B2B',
                    autoSkip: false,
                    userCallback: function (value, index, values) {
                        const label = moment(value).format('MMM DD');
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
                stacked: true,
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
                    const titleLines = tooltipModel.title || [],
                        bodyLines = tooltipModel.body.map(getBody);
                    let innerHtml = '<thead>';
                    titleLines.forEach(function (title) {
                        innerHtml += '<tr><th class="govuk-body govuk-!-font-weight-bold govuk-!-margin-0" style="text-align: left; color: #fff; font-size: 14px;">'
                            + new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }).format(new Date(title))
                            + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function (body, i) {
                        const
                            val = body,
                            number = numeral(/\d+/.exec(val)[0]).format('0,0'),
                            text = /[^\d]+/.exec(val)[0].trim(),
                            contentText = `${text} ${number}`,
                            style = `border-width: 2px; color: #fff; font-size: 14px;`;

                        innerHtml += `<tr><td><span class="govuk-body govuk-!-margin-0" style="${style}"/>${contentText} ${[tooltipText]}</td></tr>`;
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

    }

};

const StackedBarChart: ComponentType<Props> = ({ header, tooltipText, data, description = null }: Props) => {
    return (
        <Styles.Container>
            <span className="govuk-heading-s">{header}</span>
            <Styles.Chart>
                <Bar
                    data={getBarChartData(data)}
                    options={getBarChartOptions(tooltipText)}
                />
            </Styles.Chart>

            {
                description
                    ? <Styles.P className={"govuk-body govuk-!-font-size-14 govuk-!-margin-top-5"}>
                        {description}
                    </Styles.P>
                    : null
            }

        </Styles.Container>
    );
};

export default StackedBarChart;
