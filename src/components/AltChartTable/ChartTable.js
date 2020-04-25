import React, { Component, Fragment } from "react";
import ViewAs from 'components/ViewAs';
import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import BarChart from "components/BarChart";
import AltChartTable from "components/AltChartTable";
import * as Styles from "./AltChartTable.styles";
import {Table} from "govuk-react-jsx";
import numeral from "numeral";
import moment from "moment";


const sortFunc = (a, b) => {

    const
        dateA = new Date(a.date),
        dateB = new Date(b.date);

    if (dateA < dateB) return 1;

    return dateA > dateB ? -1 : 0

};

interface ChartTableProps {

    data: any,

} // ChartTableProps


interface CharTableState {

    view: string

} // CharTableState


const titles = {

    totalCases: 'Total number of lab-confirmed cases in England by specimen date',
    dailyCases: 'Daily number of lab-confirmed cases in England by specimen date',
    totalDeaths: 'Total number of COVID-19 associated UK deaths in hospital by date reported',
    dailyDeaths: 'Daily number of COVID-19 associated UK deaths in hospital by date reported'

}; // titles


const EnglandDailyCasesTable = ({ england }) => {

    const
        previouslyReportedDailyCases = (england?.previouslyReportedDailyCases ?? []).sort(sortFunc),
        changeInDailyCases = (england?.changeInDailyCases ?? []).sort(sortFunc),
        englandByDate = (england?.dailyConfirmedCases ?? [])
            .sort(sortFunc)
            .map((item, index)  => ({
                date: item.date,
                dailyConfirmedCases: item.value,
                previouslyReportedDailyCases: previouslyReportedDailyCases[index].value,
                changeInDailyCases: changeInDailyCases[index].value
            }));

    return <Styles.Container>
        <span className="govuk-heading-s">{ titles.dailyCases }</span>
        <Styles.Table>
            <Table
                tabIndex={0}
                head={[
                    { children: ['Date']},
                    { children: ["Previously reported"], format: 'numeric' },
                    { children: ["Difference"], format: 'numeric' },
                    { children: ["Confirmed cases"], format: 'numeric' }
                ]}
                rows={
                    englandByDate.map(item => [
                        { children: moment(item.date).format("DD MMM YYYY") },
                        { children: numeral(item.previouslyReportedDailyCases).format('0,0'), format: 'numeric' },
                        { children: numeral(item.changeInDailyCases).format('0,0'), format: 'numeric' },
                        { children: numeral(item.dailyConfirmedCases).format('0,0'), format: 'numeric' }
                    ])
                }
            />
        </Styles.Table>
        <p className={ "govuk-body govuk-!-font-size-14 govuk-!-margin-top-5" }
           style={{ marginLeft: '20px' }}>
            Additional info
        </p>
    </Styles.Container>

}; // EnglandCasesTable


const EnglandTotalCasesTable = ({ england }) => {

    const
        previouslyReportedDailyTotalCases = (england?.previouslyReportedDailyTotalCases ?? []).sort(sortFunc),
        changeInDailyTotalCases = (england?.changeInDailyTotalCases ?? []).sort(sortFunc),
        englandByDate = (england?.dailyTotalConfirmedCases ?? [])
            .sort(sortFunc)
            .map((item, index)  => ({
                date: item.date,
                dailyTotalConfirmedCases: item.value,
                previouslyReportedDailyTotalCases: previouslyReportedDailyTotalCases[index].value,
                changeInDailyTotalCases: changeInDailyTotalCases[index].value
            }));

    return <Styles.Container>
        <span className="govuk-heading-s">{ titles.totalCases }</span>
        <Styles.Table>
            <Table
                tabIndex={0}
                head={[
                    { children: ['Date']},
                    { children: ["Previously reported"], format: 'numeric' },
                    { children: ["Difference"], format: 'numeric' },
                    { children: ["Confirmed total cases"], format: 'numeric' }
                ]}
                rows={
                    englandByDate.map(item => [
                        { children: moment(item.date).format("DD MMM YYYY") },
                        { children: numeral(item.previouslyReportedDailyTotalCases).format('0,0'), format: 'numeric' },
                        { children: numeral(item.changeInDailyTotalCases).format('0,0'), format: 'numeric' },
                        { children: numeral(item.dailyTotalConfirmedCases).format('0,0'), format: 'numeric' }
                    ])
                }
            />
        </Styles.Table>
        <p className={ "govuk-body govuk-!-font-size-14 govuk-!-margin-top-5" }
           style={{ marginLeft: '20px' }}>
            Additional info
        </p>
    </Styles.Container>

}; // EnglandDeathsTable

/**
 *
 */
export class ChartTable extends Component<ChartTableProps, {}> {

    state: CharTableState = {
        view: "chart"
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    charts(data) {

        const { overview={}, countries={} } = data;

        return <Fragment>
            <LineChart data={ countries?.E92000001?.dailyTotalConfirmedCases ?? [] }
                       header={ titles.totalCases }
                       tooltipText="cases"
            />

            <StackedBarChart
                data={{
                    previous: countries?.E92000001?.previouslyReportedDailyCases ?? [],
                    change:   countries?.E92000001?.changeInDailyCases ?? [],
                }}
                header={ titles.dailyCases }
                tooltipText="cases"
            />

            <LineChart
                data={ overview?.K02000001?.dailyTotalDeaths ?? [] }
                header={titles.totalDeaths}
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
     *
     * @param data
     * @returns {*}
     */
    tables (data) {

        const
            { overview={}, countries={} } = data,
            england = countries?.E92000001 ?? [];

        return <Fragment>
            <EnglandTotalCasesTable england={ england }/>

            <EnglandDailyCasesTable england={ england }/>

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
     *
     * @returns {*}
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