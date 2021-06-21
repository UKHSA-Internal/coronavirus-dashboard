// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


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
            margin: 0 1rem 0 0;
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


export const Title: ComponentType<*> =
    styled
        .header`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 2rem 0 1.5rem 0;
        `;


export const Spacer: ComponentType<*> =
    styled
        .div`
            margin-top: 150px;
        `;
