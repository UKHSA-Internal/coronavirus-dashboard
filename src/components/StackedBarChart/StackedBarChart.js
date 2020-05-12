// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { Bar } from 'react-chartjs-2';
import numeral from "numeral";
import moment from "moment";

import { fillDateGaps, movingAverage } from "common/utils";
import useResponsiveLayout from "hooks/useResponsiveLayout";

import type { Props } from './StackedBarChart.types';
import * as Styles from './StackedBarChart.styles';



const getBarChartData = ({ previous, change }) => {

    const
        previousSorted = fillDateGaps(previous),
        changeData = fillDateGaps(change),
        sum = previousSorted.map(({ value }, index) => value + changeData[index].value);

    return {
        labels: previousSorted.map(d => d.date),
        datasets: [
            // REMOVE PENDING FORMAL RELEASE
            // {
            //     label: "Rolling average of the total",
            //     data: [
            //         NaN, NaN, NaN, NaN, NaN, NaN,
            //         ...movingAverage(sum, 7).slice(3, -3),
            //         NaN, NaN, NaN
            //     ],
            //     type: 'line',
            //     fill: false,
            //     borderColor: "#323d13",
            //     backgroundColor: "#323d13",
            //     borderWidth: 2,
            //     order: 0,
            //     pointHoverRadius: 0
            // },
            {
                label: "Previously reported",
                backgroundColor: '#62a3b3',
                data: previousSorted
                    .map(({ value }) => value)
            },
            {
                label: "Newly reported",
                backgroundColor: '#5c1955',
                data: changeData
                    .map(({ value }) => value > 0 ? value : 0)
            }
        ]
    }

};


const getBarChartOptions = (tooltipText, mobileView) => {
    
    const labelFontSize = mobileView ? 11 : 14;

    return {
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            point: {
                radius: 0
            }
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
                    fontSize: labelFontSize,
                    fontColor: '#1A2B2B',
                    maxTicksLimit: 15,
                    autoSkip: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                // stacked: true,
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
                    `${ datasets?.[datasetIndex]?.label ?? "" }: ${ numeral(yLabel).format("0,0") }`
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
