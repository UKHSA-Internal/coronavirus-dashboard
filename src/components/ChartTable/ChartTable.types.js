import moment from "moment";
import numeral from "numeral";
import type { Data, EnglandData } from "types/Data";


declare export type TableStructure = {

    metadata: Array<{
        key: string,
        headings: {
            value: string,
            type: string
        },
        valueGetter: (string) => string | number,
        type: string,
        formatter?: moment | numeral,
        format?: string
    }>,
    extra?: {
        intro?: string,
        description?: string,
    }

} // TableStructure


declare export type EnglandTableProps = {

    englandData: EnglandData,
    structure: TableStructure

} // EnglandTableProps


export interface ChartTableProps {

    data: Data,

} // ChartTableProps


export interface CharTableState {

    view: string

} // CharTableState


declare export type TitleOrDescriptionValues = {

    totalCases: string,
    dailyCases: string,
    totalDeaths: string,
    dailyDeaths: string

} // TitleOrDescriptionValues


declare export type TitleOrDescription = {

    titles: TitleOrDescriptionValues,
    descriptions: TitleOrDescriptionValues

} // TitleOrDescription


declare export type ChartsProps = TitleOrDescription & ChartTableProps


declare export type TablesProps = TitleOrDescription & ChartTableProps
