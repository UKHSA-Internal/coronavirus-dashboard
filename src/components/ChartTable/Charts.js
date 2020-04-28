import React, { Fragment, ReactNode } from "react";

import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import BarChart from "components/BarChart";

import type { ChartsProps } from "./ChartTable.types";
import CategoricalBarChart from "../CategoricalBarChart/CategoricalBarChart";


const ageSexSort = (a, b) => {

    const
        ageA = parseInt(/^(\d+).*$/.exec(a.age)[1]),
        ageB = parseInt(/^(\d+).*$/.exec(b.age)[1]);

    if ( ageA > ageB ) return 1;

    return ageA < ageB ? -1 : 0

}; // ageSexSort



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

            {
                countries?.E92000001?.maleCases?.length ?? 0 > 0
                    ? <CategoricalBarChart
                        header={ titles.ageSex }
                        data={ {
                            categoryLabels: ["Male", "Female"],
                            data: [
                                (countries?.E92000001?.maleCases ?? []).sort(ageSexSort),
                                (countries?.E92000001?.femaleCases ?? []).sort(ageSexSort),
                            ],
                            colors: ["#367E93", "#0a495a"],
                            columnLabelGetter: d => d.age.replace(/_/g, ' ')
                        } }
                        tooltip={ '' }
                    />
                    : null
            }
        </Fragment>

}; // charts
