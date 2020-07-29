// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


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