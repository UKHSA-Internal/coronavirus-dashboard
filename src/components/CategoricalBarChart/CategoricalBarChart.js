// @flow

import type { ComponentType } from 'react';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import type { CategoricalBarChartType, ChartProps } from './CategoricalBarChart.types';
import * as Styles from './CategoricalBarChart.styles';
import useResponsiveLayout from 'hooks/useResponsiveLayout';

import numeral from 'numeral';
import { zip } from 'pythonic';


const sortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    if (dateA < dateB) return 1;

    return dateA > dateB ? -1 : 0

};


// const isMobile = ( breakpoint: number ): boolean => {
//
//     const [width, setWidth] = useState(window.innerWidth)
//
//     useEffect(() => {
//
//     const handleResize = () => setWidth(window.innerWidth)
//
//         window.addEventListener('resize', handleResize)
//
//         return () => { window.removeEventListener('resize', handleResize) }
//
//     }, [])
//
//     return width > breakpoint;
//
// };


const getBarChartData = ({ data, categoryLabels, colors, columnLabelGetter }: CategoricalBarChartType) => {

    if (data.length < 2 || (data.length === categoryLabels.length && data.length === colors.length)) {

        for ( let index = 0; index < data.length; index++ ) {

            data[index] = data[index].sort(sortFunc)

        }

        return {
            labels: data[0].map(d => columnLabelGetter(d)),
            datasets: zip(data, categoryLabels, colors).map(item => ({
                data: item[0].map(d => d.value),
                label: item[1],
                backgroundColor: item[2],
            }))
        }

    } // if

    throw new Error("data, labels, and colors must have the same length.")

}; // getBarChartData


const getBarChartOptions = (tooltipText, mobileView: boolean) => {

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
                    fontSize: mobileView ? 11 : 14,
                    fontColor: '#1A2B2B',
                    autoSkip: false,
                    minTicksLimit: 8,
                    maxTicksLimit: 15,
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                stacked: false,
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
                        innerHtml += `<tr><th class="govuk-body govuk-!-font-weight-bold govuk-!-margin-0" style="text-align: left; color: #fff; font-size: 14px;">${title}</th></tr>`;
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


const CategoricalBarChart: ComponentType<ChartProps> = ({header, tooltipText, data, description=null}: ChartProps) => {

    const mobileView = useResponsiveLayout(500)  === "mobile"

    return (
        <Styles.Container>
            <span className="govuk-heading-s">{header}</span>
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
