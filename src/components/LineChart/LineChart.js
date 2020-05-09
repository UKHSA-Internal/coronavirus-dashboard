// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { Line } from 'react-chartjs-2';
import * as moment from 'moment';
import numeral from "numeral";

import useResponsiveLayout from "hooks/useResponsiveLayout";

import type { Props } from './LineChart.types';
import * as Styles from './LineChart.styles';


const LineChart: ComponentType<Props> = ({ header, tooltipText, data }: Props) => {

    const
        mobileView = useResponsiveLayout(500) === "mobile",
        labelFontSize = mobileView ? 11 : 14;


    return (
        <Styles.Container>
            <span className="govuk-heading-s">{ header }</span>
            <Styles.Chart>
                <Line
                    data={ {
                        labels: data.map(d => d.date),
                        datasets: [{
                            borderWidth: 2,
                            borderColor: '#62a3b3',
                            backgroundColor: '#62a3b3',
                            pointBorderColor: '#62a3b3',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 3,
                            fill: false,
                            pointHoverBackgroundColor: '#62a3b3',
                            pointHoverBorderColor: '#62a3b3',
                            pointHoverBorderWidth: 5,
                            pointRadius: 1,
                            pointHitRadius: 5,
                            data: data.map(d => d.value),
                            type: "line"
                        }]
                    } }
                    legend={ { display: false } }
                    options={ {
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                type: 'time',
                                gridLines: {
                                    display: true,
                                },
                                ticks: {
                                    minRotation: 45,
                                    fontSize: labelFontSize,
                                    fontColor: '#1A2B2B',
                                    autoSkip: true,
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
                                labelColor: () => ({
                                    borderColor: '#62a3b3',
                                    backgroundColor: '#62a3b3'
                                }),
                                title: tooltipItem =>
                                    tooltipItem.map(({ xLabel }) => moment(xLabel).format("DD/MM/YYYY")),
                                label: ({ yLabel }) =>
                                    `${ numeral(yLabel).format("0,0") } ${ tooltipText }`
                            }

                        }
                    } }
                />
            </Styles.Chart>
        </Styles.Container>
    )
};

export default LineChart;
