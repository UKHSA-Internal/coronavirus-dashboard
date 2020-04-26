import moment from "moment";
import numeral from "numeral";
import type { Data, EnglandData } from "types/Data";

declare type TableStructure = {

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


declare export type EnglandTableProps = { englandData: EnglandData, structure: TableStructure }


export interface ChartTableProps {

    data: Data,

} // ChartTableProps


export interface CharTableState {

    view: string

} // CharTableState
