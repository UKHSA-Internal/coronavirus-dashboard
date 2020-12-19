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
        }))``;


export const TD: ComponentType<*> =
    styled
        .td
        .attrs(({ className='', type='string' }) => ({
            className: `govuk-table__cell govuk-table__cell--${ type } ${ className }`,
        }))``;


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
                padding: 10px important;
            }
        `;


export const THead: ComponentType<*> =
    styled
        .thead
        .attrs(({ className='' }) => ({
            className: `govuk-table__head ${ className }`,
        }))`
            & > tr > th {
                padding: 10px !important;
            }
        `;


export const TableContainer: ComponentType<*> =
    styled
        .div`
            max-height: 350px;
            overflow: auto;
            
            &>table {
                font-size: 1.1rem;
                background-color: transparent !important;
            }
        `;


export const GovUKTable: ComponentType<*> =
    styled
        .table
        .attrs(({ className='' }) => ({
            className: `govuk-table ${ className }`,
        }))``;
