// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { Bar } from 'react-chartjs-2';
import moment from "moment";
import numeral from "numeral";

import { movingAverage, fillDateGaps } from "common/utils";

import type { Props } from './BarChart.types';
import * as Styles from './BarChart.styles';
import useResponsiveLayout from "hooks/useResponsiveLayout";


const BarChart: ComponentType<Props> = ({ header, tooltipText, data }: Props) => {

    const
        dataSorted = fillDateGaps(data),
        mobileView = useResponsiveLayout(500) === "mobile",
        labelFontSize = mobileView ? 11 : 14;

    return (
        <Styles.Container>
            <span className="govuk-heading-s">{ header }</span>
            <Styles.Chart>
                <Bar
                    data={ {
                        labels: dataSorted.map(d => d.date),
                        datasets: [
                            {
                                label: "Rolling average",
                                data: movingAverage(dataSorted.map(d => d.value), 7),
                                type: 'line',
                                fill: false,
                                borderColor: "#323d13",
                                backgroundColor: "#323d13",
                                borderWidth: 2,
                                order: 0,
                                pointHoverRadius: 0
                            },
                            {
                                label: "Daily deaths",
                                backgroundColor: '#62a3b3',
                                data: dataSorted.map(d => d.value),
                            }
                        ]
                    } }
                    options={ {
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        maintainAspectRatio: false,
                        elements: {
                            point: {
                                radius: 0
                            }
                        },
                        scales: {
                            xAxes: [{
                                offset: true,
                                type: 'time',
                                gridLines: {
                                    display: true,
                                },
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    },
                                },
                                ticks: {
                                    minRotation: 45,
                                    fontSize: labelFontSize,
                                    fontColor: '#1A2B2B',
                                    autoSkip: false,
                                    maxTicksLimit: 15
                                },
                            }],
                            yAxes: [{
                                gridLines: {
                                    drawBorder: false,
                                },
                                ticks: {
                                    fontSize: labelFontSize,
                                    fontColor: '#1A2B2B',
                                    beginAtZero: true,
                                    userCallback: (value) => value.toLocaleString(),
                                },
                            }],
                        },
                        tooltips: {
                            enabled: true,
                            callbacks: {
                                title: tooltipItem =>
                                    tooltipItem.map(({ xLabel }) => moment(xLabel).format("DD/MM/YYYY")),
                                label: ({ yLabel, datasetIndex }, { datasets }) =>
                                    `${ datasets?.[datasetIndex]?.label ?? "" }: ${ numeral(yLabel).format("0,0") }`,
                            }
                        }
                    } }
                />
            </Styles.Chart>
        </Styles.Container>
    );
};

export default BarChart;
