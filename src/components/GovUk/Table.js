// @flow

import React, { useState, Fragment, useEffect } from "react";

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

const UnsortedSort = (sortBy, updater) => {
    return <Sort htmlType={ "button" } onClick={ event => updater(sortBy) }>
    
    <Fragment>
        <CaretUpDown/>
         <span className={ "sr-only" }>
            Unsorted column - Apply ascending sort.
        </span>
    </Fragment>

    </Sort>
};

const AscendingSort = (sortBy, updater) => {
    return  <Sort htmlType={ "button" } onClick={ event => updater(sortBy) }>
                <Fragment>
                    <CaretDown/>
                        <span className={ "sr-only" }>
                             Sorted column (ascending) - Apply descending sort.
                        </span>
                </Fragment>

            </Sort>
};

const DescendingSort = (sortBy, updater) => {
    return  <Sort htmlType={ "button" } onClick={ event => updater(sortBy) }>
                <Fragment>
                    <CaretUp/>
                        <span className={ "sr-only" }>
                            Sorted column  (descending) - Apply ascending sort.
                        </span>
                </Fragment>
            </Sort>
};


const SortIcon = ({ sortBy, firstSort, currentFilter, cInd, direction, updater }) => {

    if (firstSort) {
        return UnsortedSort(sortBy, updater);
    }
    else if (currentFilter === cInd) {
        if (direction === directions.descending) {
            return DescendingSort(sortBy, updater);
        }
        else {
            return AscendingSort(sortBy, updater);
        }   
    } else {
        return UnsortedSort(sortBy, updater);
    };

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


    const [ currentFilter, setCurrentFilter ] = useState(null);
    const [ previousFilter, setPreviousFilter ] = useState(null);
    const [ direction, setDirection ] = useState(null);
    const [ firstSort, setFirstSort ] = useState(true);
    const [ currentBody, setCurrentBody ] = useState([]);

    useEffect(() => {
        setCurrentBody(body);
    }, []);

    const compareData = (sortBy) => {

        currentBody.sort((a, b) => {
            const val1 = a[sortBy];
            const val2 = b[sortBy];
            if (typeof val1 === 'number' && typeof val2 === 'number') {
                return val1 - val2;
            } else if (typeof val1 === 'string' && typeof val2 === 'string') {
                if (moment(val1, "MM-DD-YYYY").isValid() && moment(val2, "MM-DD-YYYY").isValid()) {
                    const
                        dateA = new Date(val1),
                        dateB = new Date(val2);
                    return dateA < dateB ? 1 : dateA > dateB || 0;
                }
                else {
                    return val1.localeCompare(val2);
                }
            } else {
                return 0;
            }
            
        });   
    };

    const sortData = (sortBy) => {        
       
        if (firstSort) {
            // alert("first")
            setDirection(directions.ascending); 
            setCurrentFilter(sortBy)
            setPreviousFilter(sortBy)
            compareData(sortBy);
        }
        else {
            if (previousFilter !== sortBy) {
                // alert("new")
                setDirection(directions.ascending); 
                setCurrentFilter(sortBy)
                setPreviousFilter(sortBy);
                compareData(sortBy);
            }
            else {
                // alert("reverse")
                setDirection(direction === directions.ascending ? directions.descending : directions.ascending); 
                currentBody.reverse()
            };
        };

        setFirstSort(false);

    };

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
                                    firstSort={firstSort}
                                    currentFilter={currentFilter}
                                    cInd={cInd}
                                    direction={direction}
                                    updater={ sortData }/>
                            </TableHeadingCell>
                        </TH>)
                }</TR>)
            }</THead>
            <TBody>{
                currentBody.map((item, rInd) => <TR key={ `body-tr-${ rInd }` }>{

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