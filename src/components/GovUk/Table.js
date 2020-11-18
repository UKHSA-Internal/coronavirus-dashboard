// @flow

import React, { useState, Fragment } from "react";

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

import { NotAvailable } from "components/Widgets/Widgets";

const directions = {
    ascending: "asc",
    descending: "desc"
}

const SortIcon = ({ sortBy, currentFilter, direction, updater }) => {

    return <Sort htmlType={ "button" } onClick={ event => updater(event, sortBy, direction) }>
        { !currentFilter
            ? <Fragment>
                <CaretUpDown/>
                <span className={ "sr-only" }>
                    Unsorted column - Apply ascending sort.
                </span>
            </Fragment>
            : direction === directions.descending
                ? <Fragment>
                    <CaretUp/>
                    <span className={ "sr-only" }>
                        Sorted column  (descending) - Apply ascending sort.
                    </span>
                </Fragment>
                : <Fragment>
                    <CaretDown/>
                    <span className={ "sr-only" }>
                        Sorted column (ascending) - Apply descending sort.
                    </span>
                </Fragment>
        }
    </Sort>

}; // SortIcon


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
export const Table = ({ className, stickyHeader=true, head, body, ...props }) => {

    const
        typeDefinitions = head
            .slice(-1)
            .pop()
            .map(({ type="" }) => type);


    let currentFilter = null
    let previousFilter = null
    let direction = null

    const compareData = (a, b) => {

        alert ("compare")
        
       
        const hasValues = (a, b) => {
            if (a && b) {
                return true;
            }
            else {
                return false;
            }
        };

        const typ = head.slice(-1).pop()[currentFilter].type
        let val1 = a[currentFilter]
        let val2 = b[currentFilter]

        // alert (val1)
        // alert (val2)
        // alert (typ)

        if (!hasValues(val1,val2)) {
            return 0;
        }

        val1 = parseInt(val1)
        val2 = parseInt(val2)

        // if (typeof typ === string) {
        //     alert ("string")
        //     return val1.localCompare(val2)    
        // }
        // else if (typeof typ === numeric) {
        //     alert ("numeric")
        if (val1 < val2) {
            return -1;
          }
        if (val1 > val2) {
            return 1;
        }
          // a must be equal to b
        return 0;
        // }
        // else if (typeof typ === date) {
        //     alert ("date")
        //     const
        //         dateA = new Date(val1),
        //         dateB = new Date(val2);
            
        //     return dateA < dateB ? 1 : dateA > dateB || 0;
        // }
    }

    const sortData = (event, sortBy, direction) => {
        
        currentFilter = sortBy

        if (!previousFilter && previousFilter != 0) {
            alert ("initial sort");
            direction = directions.ascending;
            body = body.sort();
        
        } else if ((previousFilter || previousFilter === 0 ) && previousFilter === currentFilter) {
            alert ("Reverse Sort");
            direction = direction  === directions.ascending ? directions.descending : directions.ascending; 
            body = body.reverse();
        } else{
            alert ("New Sort");
            direction = directions.ascending; 
            body = body.sort();
        }

        previousFilter = sortBy;
       

    }

    return <TableContainer { ...props }>

        <GovUKTable
            className={ `govuk-table ${ stickyHeader ? "sticky-header" : "" } ${ className }`  }
            { ...props }>
            <THead>{
                head.map((item, rInd) => <TR key={ `head-tr-${ rInd }` }>{
                    item.map(({ value, ...props }, cInd) => 
                        <TH key={ `head-th-${rInd}-${ cInd }` }
                            { ...props }>
                            <TableHeadingCell>

                                { value }
                            
                                <SortIcon
                                    sortBy={ cInd }
                                    currentFilter={currentFilter && currentFilter === cInd ? true : false}
                                    direction={direction}
                                    updater={ sortData }/>
                            </TableHeadingCell>
                        </TH>)
                }</TR>)
            }</THead>
            <TBody>{
                body.map((item, rInd) => <TR key={ `body-tr-${ rInd }` }>{

                    item.map((value, cInd) =>
                        <TD key={ `body-td-${rInd}-${cInd}` } type={ typeDefinitions[cInd] }
                        >{
                            typeDefinitions[cInd] === 'numeric'
                                ? typeof value === 'number'
                                ? numeral(value).format("0,0.[0]")
                                : <NotAvailable/>
                                : value
                        }</TD>
                    )

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

    const fieldNames = fields.map(item => item.value)

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