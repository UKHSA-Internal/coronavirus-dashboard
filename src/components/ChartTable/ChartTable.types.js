import type moment from "moment";
import type numeral from "numeral";

import type { CountryData, Data } from "types/Data";


declare export type TableStructure = {

    metadata: Array<{
        key: string,
        headings: {
            value: string,
            type:  string
        },
        valueGetter: (string) => string | number | Date | moment,
        type:        string,
        formatter?:  moment | numeral | (d: any) => number | string,
        format?:     string
    }>,
    sortFunc: (a, b) => number,
    extra?: {
        intro?:       string,
        description?: string,
    }

} // TableStructure


declare export type EnglandTableProps = {

    data:      CountryData.E92000001,
    structure: TableStructure

} // EnglandTableProps


export interface ChartTableProps {

    data: Data,

} // ChartTableProps


export interface CharTableState {

    view: string

} // CharTableState


declare export type TitleOrDescriptionValues = {

    totalCases:  string,
    dailyCases:  string,
    totalDeaths: string,
    dailyDeaths: string,
    ageSex:      string

} // TitleOrDescriptionValues


declare export type TitleOrDescription = {

    titles:       TitleOrDescriptionValues,
    descriptions: TitleOrDescriptionValues

} // TitleOrDescription


declare export type ChartsProps = TitleOrDescription & ChartTableProps


declare export type TablesProps = TitleOrDescription & ChartTableProps
