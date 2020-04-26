import React, { Component, Fragment, ReactNode } from "react";

import { Table } from "govuk-react-jsx";
import numeral from "numeral";
import moment from "moment";
import { zip } from "pythonic";

import ViewAs from 'components/ViewAs';
import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import BarChart from "components/BarChart";
import AltChartTable from "components/AltChartTable";

import * as Styles from "./ChartTable.styles";

import type { EnglandData, Data } from "types/Data";
import type { EnglandTableProps, ChartTableProps, CharTableState } from "./ChartTable.types"


const titles = {

    totalCases: 'Total number of lab-confirmed cases in England by specimen date',
    dailyCases: 'Daily number of lab-confirmed cases in England by specimen date',
    totalDeaths: 'Total number of COVID-19 associated UK deaths in hospital by date reported',
    dailyDeaths: 'Daily number of COVID-19 associated UK deaths in hospital by date reported'

}; // titles


const TableDescriptions = {

    totalCases: 'Total confirmed cases and change from previously reported figures. New cases are attributed to the day the specimen was taken.',
    dailyCases: 'Total confirmed cases and change from previously reported figures. New cases are attributed to the day the specimen was taken.',
    totalDeaths: null,
    dailyDeaths: null

}; // titles

const ChartDescriptions = {

    totalCases: null,
    dailyCases: 'Total confirmed cases and change from previously reported figures. New cases are attributed to the day the specimen was taken.',
    totalDeaths: null,
    dailyDeaths: null

}; // titles


const EnglandDailyTotalCasesStructure = {
    metadata: [
        {
            key: 'previouslyReportedDailyTotalCases',
            headings: { value: 'Date', type: 'string' },
            type: 'date',
            formatter: moment,
            format: 'DD MMM YYYY',
            valueGetter: (d) => d.date
        },
        {
            key: 'previouslyReportedDailyTotalCases',
            headings: { value: 'Previously reported', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        },
        {
            key: 'changeInDailyTotalCases',
            headings: { value: 'Change', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        },
        {
            key: 'dailyTotalConfirmedCases',
            headings: { value: 'Total confirmed cases', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        }
    ],
    extra: {
        intro: titles.totalCases,
        description: TableDescriptions.totalCases,
    }
}; // EnglandDailyTotalCasesStructure


const EnglandDailyCasesStructure = {
    metadata: [
        {
            key: 'previouslyReportedDailyCases',
            headings: { value: 'Date', type: 'string' },
            type: 'date',
            formatter: moment,
            format: 'DD MMM YYYY',
            valueGetter: (d) => d.date
        },
        {
            key: 'previouslyReportedDailyCases',
            headings: { value: 'Previously reported', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        },
        {
            key: 'changeInDailyCases',
            headings: { value: 'Change', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        },
        {
            key: 'dailyConfirmedCases',
            headings: { value: 'Confirmed cases', type: 'numeric' },
            type: 'numeric',
            formatter: numeral,
            format: '0,0',
            valueGetter: (d) => d.value
        }
    ],
    extra: {
        intro: titles.totalCases,
        description: TableDescriptions.totalCases,
    }
}; // englandDailyCasesStructure


const sortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    if ( dateA < dateB ) return 1;

    return dateA > dateB ? -1 : 0

}; // sortFunc


const EnglandTable = ({ englandData, structure }: EnglandTableProps): React.ReactNode => {

    const
        dataKeys = structure.metadata.map(item => item.key),
        dataArray = zip(...dataKeys.map(key => englandData[key].sort(sortFunc)));

    return <Styles.Container>
        {
            structure?.extra?.intro ?? null
                ? <span className={ "govuk-heading-s" }>{ structure.extra.intro }</span>
                : null
        }
        <Styles.Table>
            <Table
                tabIndex={ 0 }
                head={
                    dataKeys.map((_, index) => ({
                        children: [structure.metadata[index].headings.value],
                        format: structure.metadata[index].headings.type
                    }))
                }
                rows={
                    dataArray.map(item =>
                        dataKeys.map((_, index) => ({
                            children: structure
                                .metadata[index]
                                .formatter(structure.metadata[index].valueGetter(item[index]))
                                .format(structure.metadata[index].format),
                            format: structure.metadata[index].type
                        }))
                    )
                }
            />
        </Styles.Table>
        {
            structure?.extra?.description ?? null
                ? <Styles.P className={ "govuk-body govuk-!-font-size-14 govuk-!-margin-top-5" }>
                    { structure.extra.description }
                </Styles.P>
                : null
        }
    </Styles.Container>

}; // EnglandTable


/**
 * Toggle enabled component to display either the chart or their
 * associating table of data.
 *
 * data: Data
 */
export default class ChartTable extends Component<ChartTableProps, {}> {

    state: CharTableState = {
        view: "chart"
    }

    /**
     * Produces the charts.
     *
     * @param data { Data }
     * @returns { ReactNode }
     */
    charts(data: Data): ReactNode {

        const { overview = {}, countries = {} } = data;

        return <Fragment>
            <LineChart data={ countries?.E92000001?.dailyTotalConfirmedCases ?? [] }
                       header={ titles.totalCases }
                       tooltipText="cases"
            />

            <StackedBarChart
                data={ {
                    previous: countries?.E92000001?.previouslyReportedDailyCases ?? [],
                    change: countries?.E92000001?.changeInDailyCases ?? [],
                } }
                header={ titles.dailyCases }
                tooltipText="cases"
                description={ ChartDescriptions.dailyCases }
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

    } // charts

    /**
     * Produces the tables.
     * @param data { Data }
     * @returns { ReactNode }
     */
    tables(data: Data): ReactNode {

        const
            { overview = {}, countries = {} } = data,
            england: EnglandData = countries?.E92000001 ?? [];

        return <Fragment>
            <EnglandTable englandData={ england } structure={ EnglandDailyTotalCasesStructure }/>
            <EnglandTable englandData={ england } structure={ EnglandDailyCasesStructure }/>
            <AltChartTable
                data={ overview?.K02000001?.dailyTotalDeaths ?? [] }
                header={ titles.totalDeaths }
                valueName="Total deaths"
            />
            <AltChartTable
                data={ overview?.K02000001?.dailyDeaths ?? [] }
                header={ titles.dailyDeaths }
                valueName="Daily deaths"
            />
        </Fragment>

    } // tables

    /**
     * Renders either the charts or the tables, depending on the
     * state of ``state.view``.
     *
     * @returns { ReactNode }
     */
    render(): React.ReactNode {

        const
            { view } = this.state,
            { data } = this.props;

        return <Fragment>
            <ViewAs view={ view } setView={ value => this.setState({ view: value }) }/>
            {
                view === "chart"
                    ? this.charts(data)
                    : this.tables(data)
            }
        </Fragment>

    } // render

} // ChartTable
