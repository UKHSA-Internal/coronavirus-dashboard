// @flow

import React from "react";

import numeral from "numeral";

import { TableComponent } from "./Table.styles"
import moment from "moment";
import ReactTooltip from "react-tooltip";

import { NotAvailable } from "components/Widgets/Widgets";


const TH = ({ className, children, type='string', colSpan=1, ...props }) => {

    return <th
        scope={ 'col' }
        colSpan={ colSpan }
        className={ `govuk-table__header govuk-table__header--${ type } ${ className }` }
        { ...props }
    >
        { children }
    </th>

};  // Row


const TD = ({ className, children, type, ...props }) => {

    return <td className={ `govuk-table__cell  govuk-table__cell--${ type } ${ className }` } { ...props }>
        { children }
    </td>

};  // Row


const TR = ({ className, children, ...props }) => {

    return <tr className={ `govuk-table__row  ${ className }` } { ...props }>
        { children }
    </tr>

};  // Row


const TBody = ({ className, children, ...props }) => {

    return <thead
        className={ `govuk-table__body ${ className }`  }
        { ...props }>
        { children }
    </thead>

};  // THead


const THead = ({ className, children, ...props }) => {

    return <thead
        className={ `govuk-table__head ${ className }`  }
        { ...props }>
        { children }
    </thead>

};  // THead


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

    return <>
        <TableComponent
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
                                ? numeral(value).format("0,0")
                                : <NotAvailable/>
                                : value
                        }</TD>
                    )

                }</TR>)
            }</TBody>
        </TableComponent>
        <ReactTooltip id={ "table-tooltip-text" }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </>

};  // Table


export const DataTable = ({ fields, data }) => {

    const fieldNames = fields.map(item => item.value)

    return <Table
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

};  // DataTable