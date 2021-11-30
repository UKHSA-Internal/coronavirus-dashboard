import styled from "styled-components";

import type { ComponentType } from "react";


export const LogAreasContainer: ComponentType<*> =
    styled
        .ul
        .attrs(({ className="", ...props }) => ({
            className: `${className} govuk-list govuk-!-margin-0`,
            ...props
        }))`
            display: inline-flex;
            flex-direction: row;
            flex-wrap: wrap;
            column-gap: .3rem;
            row-gap: .3rem;
            
            & > span.na {
                color: #4c4c4c;
                padding: .1rem .5rem .1rem 0 !important;
                font-size: 16px;
            }
        `;


export const LogArea: ComponentType<*> =
    styled
        .li`
            display: inline-flex;
            padding: .1rem .4rem;
            font-size: 15px;
            background: #e1e1e1;
            margin-bottom: 0 !important;
        `;


export const AffectedAreas: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${className} govuk-!-margin-top-1`,
            ...props
        }))`
            display: flex;
            flex-direction: row;
            justify-items: start;
            align-items: start;
            
            & > span {
                color: #4c4c4c;
                padding: .1rem .5rem .1rem 0 !important;
                font-size: 16px;
            }
        `;
