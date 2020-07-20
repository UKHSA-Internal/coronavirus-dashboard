// @flow

import styled from "styled-components";

import type { ComponentType } from "react";



export const Container: ComponentType<*> =
    styled
        .div
        .attrs(({ className }) => ({
            className: `govuk-body ${ className }`
        }))`
            max-width: 50em;
        `;


export const Query: ComponentType<*> =
    styled
        .h4`
            font-family: "monospace", monospace;
            width: fit-content;
            padding: .5rem 1rem;
            border-radius: 3px;
            border: 1px #f3f2f1 solid;
            background-color: #f8f8f8;
            font-weight: bold;
            margin-right: 1em;
            margin-bottom: 10px !important;
        `;


export const BlueBadge: ComponentType<*> =
    styled
        .span`
            font-family: "GDS Transport", Arial, sans-serif;
            font-feature-settings: "tnum";
            font-variant-numeric: tabular-nums;
            border: 2px solid #1d70b8;
            text-transform: uppercase;
            padding: 2px 4px;
            font-weight: bold;
            font-size: smaller;
            color: #1d70b8;
        `;



export const SuccessCode: ComponentType<*> =
    styled
        .span`
            font-family: "GDS Transport", Arial, sans-serif;
            font-feature-settings: "tnum";
            font-variant-numeric: tabular-nums;
            border: 2px solid #00703c;
            text-transform: uppercase;
            padding: 2px 4px;
            font-weight: bold;
            font-size: smaller;
            color: #00703c;
            margin: 0 0.5rem;
        `;


export const ErrorCode: ComponentType<*> =
    styled
        .span`
            font-family: "GDS Transport", Arial, sans-serif;
            font-feature-settings: "tnum";
            font-variant-numeric: tabular-nums;
            border: 2px solid #d4351c;
            text-transform: uppercase;
            padding: 2px 4px;
            font-weight: bold;
            font-size: smaller;
            color: #d4351c;
            margin: 0 0.5rem;
        `;


export const Method: ComponentType<*> =
    styled
        .div
        .attrs(({ className }) => ({
            className: `govuk-heading-s ${ className }`
        }))`
            font-family: "monospace", monospace;
            width: fit-content;
            border: 2px solid #00703c;
            text-transform: uppercase;
            padding: 3px 1rem;
            font-weight: bold;
            background-color: #00703c;
            color: #fff;
            margin-top: 2em;
        `;


export const MethodBadge: ComponentType<*> =
    styled
        .span
        .attrs(({ className }) => ({
            className: `${ className }`
        }))`
            font-family: "monospace", monospace;
            width: fit-content;
            border: 2px solid #00703c;
            text-transform: uppercase;
            padding: 1px 3px;
            font-size: smaller;
            font-weight: bold;
            background-color: #00703c;
            color: #fff;
        `;


export const Code: ComponentType<*> =
    styled
        .code`
            background-color: #f8f8f8;
            border: 1px #f3f2f1 solid;
            padding: 1px 4px;
            font-size: 12pt;
        `;
