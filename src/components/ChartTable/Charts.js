import React, { Fragment, ReactNode } from "react";

import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import BarChart from "components/BarChart";

import type { Data } from "types/Data";
import type { ChartsProps } from "./ChartTable.types";


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
        </Fragment>

}; // charts
