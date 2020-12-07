// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const TH: ComponentType<*> =
    styled
        .th
        .attrs(({ className='', type='string', colSpan=1, scope="col" }) => ({
            className: `govuk-table__header govuk-table__header--${ type } ${ className }`,
            colSpan: colSpan,
            scope: scope
        }))`
            padding: 8px 5px;
            
            &.govuk-table__header--date {
                max-width: 4rem;
            }
        `;


export const TD: ComponentType<*> =
    styled
        .td
        .attrs(({ className='', type='string' }) => ({
            className: `govuk-table__cell govuk-table__cell--${ type } ${ className }`,
        }))`
            padding: 8px 5px;
            
            &.govuk-table__cell--date {
                max-width: 4rem;
            }
        `;


export const TR: ComponentType<*> =
    styled
        .tr
        .attrs(({ className='' }) => ({
            className: `govuk-table__row  ${ className }`,
        }))``;


export const TBody: ComponentType<*> =
    styled
        .tbody
        .attrs(({ className='' }) => ({
            className: `govuk-table__tbody ${ className }`,
        }))`
            & > tr > td {
                padding: 5px important;
            }
        `;


export const THead: ComponentType<*> =
    styled
        .thead
        .attrs(({ className='' }) => ({
            className: `govuk-table__head ${ className }`,
        }))``;


export const TableContainer: ComponentType<*> =
    styled
        .div`
            max-height: 350px;
            overflow: auto;
            
            &>table {
                width: 99%;
                // font-size: 1.1rem;
                background-color: transparent !important;
            }
            
            @media only screen and (max-width: 768px) {
                .govuk-table {
                    font-size: 10pt;
                }
            }
        `;


export const GovUKTable: ComponentType<*> =
    styled
        .table
        .attrs(({ className='' }) => ({
            className: `govuk-table ${ className }`,
        }))``;


 export const Sort: ComponentType<*> =
     styled
         .button`
            display: block;
            height: 15px;
            width: 10px;
            margin-left: 5px;
            outline: none;
            cursor: pointer;
            
            &:focus {
                box-shadow: unset;
                border: unset;
                outline: #1d70b8 1px solid !important;
                background: none !important;
                background-color: none !important;
            }
                
            &:last-of-type {
                 padding-right: 20px;
            }
        `;


export const TableHeadingCell: ComponentType<*> =
    styled
        .span`
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            
            &.numeric {
                justify-content: flex-end;
            }
            
            &.string,
            &.date {
                justify-content: flex-start;
            }
        `;