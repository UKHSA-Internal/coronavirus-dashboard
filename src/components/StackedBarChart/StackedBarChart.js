// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

import type { Props } from './StackedBarChart.types';
import * as Styles from './StackedBarChart.styles';

import numeral from 'numeral';
import useResponsiveLayout from "../../hooks/useResponsiveLayout";


const sortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    if (dateA < dateB) return 1;

    return dateA > dateB ? -1 : 0

};


const getBarChartData = ({ previous, change }) => {

    const previousSorted = previous.sort(sortFunc)

    return {
        labels: previousSorted.map(d => d.date),
        datasets: [
            {
                label: "Previously reported",
                backgroundColor: '#367E93',
                data: previousSorted.map(d => d.value)
            },
            {
                label: "Newly reported",
                backgroundColor: '#0a495a',
                data: change.sort(sortFunc).map(d => d.value > 0 ? d.value : 0)
            }
        ]
    }

};


const getBarChartOptions = (tooltipText, mobileView) => {

    return {
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom'
        },
        scales: {
            xAxes: [{
                offset: true,
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    },
                },
                gridLines: {
                    display: true,
                },
                stacked: true,
                ticks: {
                    minRotation: 45,
                    fontSize: mobileView ? 11 : 14,
                    fontColor: '#1A2B2B',
                    minTicksLimit: 10,
                    maxTicksLimit: 15,
                    autoSkip: true,
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

    const mobileView = useResponsiveLayout(500)  === "mobile";

    return (
        <Styles.Container>
            <span className="govuk-heading-s">{header}</span>
            <Styles.Chart>
                <Bar
                    data={getBarChartData(data)}
                    options={getBarChartOptions(tooltipText, mobileView)}
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
