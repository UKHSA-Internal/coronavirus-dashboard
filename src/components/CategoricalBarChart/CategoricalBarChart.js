// @flow

import type { ComponentType } from 'react';
import React from 'react';

import { Bar } from 'react-chartjs-2';
import numeral from 'numeral';

import type { CategoricalBarChartType, ChartProps } from './CategoricalBarChart.types';
import * as Styles from './CategoricalBarChart.styles';
import useResponsiveLayout from 'hooks/useResponsiveLayout';

import { transpose } from "d3-array";


const sortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    if ( dateA < dateB ) return 1;

    return dateA > dateB ? -1 : 0

};


const getBarChartData = ({ data, categoryLabels, colors, columnLabelGetter }: CategoricalBarChartType) => {

    if ( data.length < 2 || (data.length === categoryLabels.length && data.length === colors.length) ) {

        for ( let index = 0; index < data.length; index++ ) {

            data[index] = data[index].sort(sortFunc)

        }

        return {
            labels: data[0].map(d => columnLabelGetter(d)),
            datasets: transpose([data, categoryLabels, colors])
                .map(item => ({
                    data: item[0].map(d => d.value),
                    label: item[1],
                    backgroundColor: item[2],
                }))
        }

    } // if

    throw new Error("data, labels, and colors must have the same length.")

}; // getBarChartData


const getBarChartOptions = (tooltipText, mobileView: boolean) => {

    const labelFontSize = mobileView ? 11 : 14;

    return {
        barValueSpacing: 20,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom'
        },
        scales: {
            xAxes: [{
                offset: true,
                gridLines: {
                    display: true,
                },
                stacked: false,
                ticks: {
                    minRotation: 45,
                    fontSize: labelFontSize,
                    fontColor: '#1A2B2B',
                    autoSkip: false,
                    maxTicksLimit: 15,
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                stacked: false,
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
                label: ({ yLabel, datasetIndex }, { datasets }) =>
                    `${ datasets?.[datasetIndex]?.label ?? "" }: ${ numeral(yLabel).format("0,0") }`,
            }
        }

    }

};


const CategoricalBarChart: ComponentType<ChartProps> = ({ header, tooltipText, data, description = null }: ChartProps) => {

    const mobileView = useResponsiveLayout(500) === "mobile"

    return (
        <Styles.Container>
            <span className="govuk-heading-s">{ header }</span>
            <Styles.Chart>
                <Bar
                    data={ getBarChartData(data) }
                    options={ getBarChartOptions(tooltipText, mobileView) }
                />
            </Styles.Chart>

            {
                description
                    ? <Styles.P className={ "govuk-body govuk-!-font-size-14 govuk-!-margin-top-5" }>
                        { description }
                    </Styles.P>
                    : null
            }

        </Styles.Container>
    );

}; // CategoricalBarChart


export default CategoricalBarChart;
