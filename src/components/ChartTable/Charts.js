import React, { Fragment, ReactNode } from "react";

import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import BarChart from "components/BarChart";

import type { ChartsProps } from "./ChartTable.types";
import CategoricalBarChart from "../CategoricalBarChart/CategoricalBarChart";

// FixMe: Needs to be replaced with real data.
const sampleData = {
    male: [
        {value: 10,  category: 'under 5 years'},
        {value: 15,  category: '5-9 years'},
        {value: 9,   category: '10-19 years'},
        {value: 18,  category: '20-29 years'},
        {value: 29,  category: '30-39 years'},
        {value: 35,  category: '40-49 years'},
        {value: 42,  category: '50-59 years'},
        {value: 64,  category: '60-69 years'},
        {value: 74,  category: '70-79 years'},
        {value: 65,  category: 'above 80'},
    ],
    female: [
        {value: 7,  category: 'under 5 years'},
        {value: 17,  category: '5-9 years'},
        {value: 9,   category: '10-19 years'},
        {value: 19,  category: '20-29 years'},
        {value: 27,  category: '30-39 years'},
        {value: 40,  category: '40-49 years'},
        {value: 32,  category: '50-59 years'},
        {value: 60,  category: '60-69 years'},
        {value: 76,  category: '70-79 years'},
        {value: 61,  category: 'above 80'},
    ]
};


/**
 * Produces the charts.
 *
 * @param data { Data }
 * @param titles { TitleOrDescriptionValues }
 * @param descriptions { TitleOrDescriptionValues }
 * @returns { ReactNode }
 */
export const Charts = ({data, titles, descriptions}: ChartsProps): ReactNode => {

        const { overview = {}, countries = {} } = data;

        return <Fragment>
            <LineChart data={ countries?.E92000001?.dailyTotalConfirmedCases ?? [] }
                       header={ titles.totalCases }
                       tooltipText="cases"
            />

            <StackedBarChart
                data={ {
                    previous: countries?.E92000001?.previouslyReportedDailyCasesAdjusted ?? [],
                    change: countries?.E92000001?.changeInDailyCases ?? [],
                } }
                header={ titles.dailyCases }
                tooltipText="cases"
                description={ descriptions.dailyCases }
            />

            <LineChart
                data={ overview?.K02000001?.dailyTotalDeaths ?? [] }
                header={ titles.totalDeaths }
                tooltipText="deaths"
            />

            <BarChart
                data={ overview?.K02000001?.dailyDeaths ?? [] }
                header={ titles.dailyDeaths }
                tooltipText="deaths"
            />

            <CategoricalBarChart
                header={ "Sex breakdown" }
                data={{
                    categoryLabels: ["Male", "Female"],
                    // FixMe: Needs to be replaced with real data.
                    data: Object.keys(sampleData).map(key => sampleData[key]),
                    colors: ["#799FC6", "#d5d5d5"],
                    columnLabelGetter: d => d.category
                }}
                tooltip={ '' }
            />
        </Fragment>

}; // charts
