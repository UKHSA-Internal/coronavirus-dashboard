// @flow

import React from "react";

import numeral from "numeral";

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

    return <TableContainer>
        <GovUKTable
            className={ `govuk-table ${ stickyHeader ? "sticky-header" : "" } ${ className }`  }
            { ...props }>
            <THead>{
                head.map((item, rInd) => <TR key={ `head-tr-${ rInd }` }>{
                    item.map(({ value, ...props }, cInd) => <TH key={ `head-th-${rInd}-${ cInd }` } { ...props }>
                        { value }
                    </TH>)
                }</TR>)
            }</THead>
            <TBody>{
                body.map((item, rInd) => <TR key={ `body-tr-${ rInd }` }>{

                    item.map((value, cInd) =>
                        <TD key={ `body-td-${rInd}-${cInd}` } type={ typeDefinitions[cInd] }>{
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


export const DataTable = ({ fields, data }) => {

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
        />
    </>

};  // DataTable