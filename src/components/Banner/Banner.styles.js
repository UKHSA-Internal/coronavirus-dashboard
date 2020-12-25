// @flow

import styled from 'styled-components';

import type { ComponentType } from 'react';


export const BannerBase: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } govuk-grid-row govuk-!-padding-top-2 govuk-!-padding-bottom-2 govuk-!-margin-bottom-1`,
            ...props
        }))`
            background: #FEDE02;
            text-align: center;
        `;


export const BannerContent: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } govuk-grid-column-one-half govuk-body-s`,
            ...props
        }))`
            float: none;
            margin: auto;
        `;


export const Timestamp: ComponentType<*> =
    styled
        .time
        .attrs(({ className="", ...props }) => ({
            className: `${ className }  govuk-!-padding-left-2 govuk-!-padding-right-2 govuk-!-font-weight-bold`,
            ...props
        }))``;


export const Body: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } banner govuk-!-padding-left-2 govuk-!-padding-right-2 govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-top-1`,
            ...props
        }))`
            text-align: left !important;

            &>p:last-of-type {
                margin-bottom: 0;
            }
            
            &>p:first-of-type {
                margin-top: 0;
            }
        `;