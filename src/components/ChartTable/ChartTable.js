import React, { Component, Fragment } from "react";

import ViewAs from 'components/ViewAs';

import { Charts } from "./Charts"
import { Tables } from "./Tables"

import type { ChartTableProps, CharTableState, TitleOrDescriptionValues } from "./ChartTable.types"


const titles: TitleOrDescriptionValues = {

    totalCases: 'Total number of lab-confirmed cases in England by specimen date',
    dailyCases: 'Daily number of lab-confirmed cases in England by specimen date',
    totalDeaths: 'Total number of COVID-19 associated UK deaths in hospital by date reported',
    dailyDeaths: 'Daily number of COVID-19 associated UK deaths in hospital by date reported',
    ageSex: 'Total number of lab-confirmed cases in England by age and sex',

}; // titles


const TableDescriptions: TitleOrDescriptionValues = {

    totalCases: 'Total confirmed cases and change from previously reported figures. New cases are attributed to the day the specimen was taken.',
    dailyCases: 'Confirmed cases and change from previously reported figures. New cases are attributed to the day the specimen was taken.',
    totalDeaths: null,
    dailyDeaths: null,
    ageSex: null

}; // titles

const ChartDescriptions: TitleOrDescriptionValues = {

    totalCases: null,
    dailyCases: 'Total confirmed cases showing those previously reported and newly added cases separately. New cases are attributed to the day the specimen was taken.',
    totalDeaths: null,
    dailyDeaths: null,
    ageSex: null

}; // titles


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
                    ? <Charts data={ data } titles={ titles } descriptions={ ChartDescriptions }/>
                    : <Tables data={ data } titles={ titles } descriptions={ TableDescriptions }/>
            }
        </Fragment>

    } // render

} // ChartTable
