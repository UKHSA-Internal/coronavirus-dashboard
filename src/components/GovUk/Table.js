// @flow

import React, { useState, useEffect } from "react";

import numeral from "numeral";

import { CaretUp, CaretDown, CaretUpDown } from "common/Icons";
import { Sort, TableHeadingCell } from "./Table.styles";

import {
    TableContainer,
    GovUKTable,
    THead,
    TBody,
    TR,
    TH,
    TD
} from "./Table.styles"
import moment from "moment";
import ReactTooltip from "react-tooltip";

import { sort } from "common/utils";

import { NotAvailable } from "components/Widgets/Widgets";

import type { ComponentType } from "react";


const SortIcon = ({ setSorting, sorting, isSorted }) => {

    let { direction } = sorting;

    if ( !isSorted ) direction = null;

    let Icon, srMessage;

    switch ( direction ) {
        case true:
            Icon = CaretUp;
            srMessage = "Sorted column (ascending) - Apply descending sort.";
            break;
        case false:
            Icon = CaretDown;
            srMessage = "Sorted column  (descending) - Apply ascending sort."
            break;
        case null:
        default:
            Icon = CaretUpDown;
            srMessage = "Unsorted column - Apply ascending sort.";
            break;
    }

    return <Sort htmlType={ "button" } onClick={ setSorting }>
        <Icon/>
        <span className={ "sr-only" }>{ srMessage }</span>
    </Sort>

}; // SortIcon


const compareData = (data, sorting, dateFormat="DD-MM-YYYY") => {

    if ( sorting.direction === null ) return data;

    let sampleValue = data?.[0]?.[sorting.by];

    if ( sampleValue === null ) sampleValue = NaN;

    const sorter = ( a, b ) => sort(a[sorting.by], b[sorting.by]);
    const dateSorter = ( a, b ) => sort(
            moment(a[sorting.by], dateFormat),
            moment(b[sorting.by], dateFormat)
        );

    let sortFunc;

    switch ( typeof sampleValue ) {
        case "number":
            sortFunc = sorter;
            break;

        case "string":
            sortFunc = moment(sampleValue, dateFormat).isValid()
                ? dateSorter
                : sorter;
            break;

        default:
            return data
    }

    return sorting.direction
        ? data.sort(sortFunc).reverse()
        : data.sort(sortFunc)

};  // compareData


/**
 * Creates a GovUK table with multiple head rows and formatted numbers.
 *
 * @param className { string }
 * @param stickyHeader { boolean }
 * @param head {Array<Array<{[string]: string|number}>>} Must be 2D array of JSONs.
 * @param body {Array<Array<any>>} Must be a 2D array of values.
 * @param props { { [string]: any } }
 * @returns {*}
 */
export const Table: ComponentType<*> = ({ className, stickyHeader=true,
                                            head, body, ...props }) => {

    const typeDefinitions = head
        .slice(-1)
        .pop()
        .map(({ type="" }) => type);

    const [ sorting, setSorting ] = useState({ direction: false, by: 0 });
    const [ currentBody, setCurrentBody ] = useState(compareData(body, sorting));

    useEffect(() => {

        setCurrentBody(compareData(currentBody, sorting))

    }, [ sorting.by, sorting.direction, currentBody ]);

    const sortingCallback = index => {

        setSorting(prev => ({
            by: index,
            direction: prev.direction === null
                ? true
                : !prev.direction,
        }))

    };  // sortingCallback

    return <TableContainer { ...props }>

        <GovUKTable
            className={ `govuk-table ${ stickyHeader ? "sticky-header" : "" } ${ className }`  }
            { ...props }>
            <THead>{
                head.map((item, rInd) => <TR key={ `head-tr-${ rInd }` }>{
                    item.map(({ value, ...props }, cInd) => 
                        <TH key={ `head-th-${rInd}-${ cInd }` } { ...props }>
                            <TableHeadingCell>
                                { value }
                                <SortIcon setSorting={ () => sortingCallback(cInd) }
                                          sorting={ sorting }
                                          isSorted={ sorting.by === cInd }/>
                            </TableHeadingCell>
                        </TH>
                    )
                }</TR>)
            }</THead>
            <TBody>{
                currentBody.map((item, rInd) => <TR key={ `body-tr-${ rInd }` }>{
                    item.map((value, cInd) =>
                        <TD key={ `body-td-${rInd}-${cInd}` } type={ typeDefinitions[cInd] }>{
                            typeDefinitions[cInd] === 'numeric'
                                ? typeof value === 'number'
                                ? numeral(value).format("0,0.[0]")
                                : <NotAvailable/>
                                : value
                        }</TD>)
                }</TR>)
            }</TBody>
        </GovUKTable>
        <ReactTooltip id={ "table-tooltip-text" }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </TableContainer>

};  // Table


export const DataTable = ({ fields, data, ...props }) => {

    const fieldNames = fields.map(item => item.value);

    return <>
        <span className={ "govuk-visually-hidden" }>
            Showing a table of the data
        </span>
        <Table
            head={[
                fields.map(item => ({ value: item.label, type: item.type }))
            ]}
            body={
                data.map(item => fieldNames.map(name =>
                    name === "date"
                        ? moment(item[name]).format("DD-MM-YYYY")
                        : item[name]

                ))
            }
            { ...props }
        />
    </>

};  // DataTable


export const NestedDataTable = ({ fields, data, ...props }) => {

    const processedData = [];

    for ( const row of data ) {

        const rowData = [];

        for ( const { value, metric, filters, ...rest } of fields ) {

            if ( !metric ) {
                rowData.push(
                    value === "date"
                    ? moment(row?.[value]).format("DD-MM-YYYY")
                    : row?.[value]
                );

                continue;
            }

            rowData.push(
                row
                    ?.[value]
                    ?.filter(item => item?.[filters.parameter] === filters.value)
                    ?.[0]
                    ?.[metric]
                    ?? null
            )

        }

        processedData.push(rowData);

    }

    return <>
        <span className={ "govuk-visually-hidden" }>
            Showing a table of the data
        </span>
        <Table
            head={[
                fields.map(item => ({ value: item.label, type: item.type }))
            ]}
            body={ processedData }
            { ...props }
        />
    </>

};  // NestedDataTable
