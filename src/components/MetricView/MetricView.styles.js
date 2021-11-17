// @flow

import styled from "styled-components";
import type { ComponentType } from "react";


export const Option: ComponentType<*> =
    styled
        .section`
            padding: 1rem .5rem;
            border-bottom: 1px dotted #b1b4b6;
            
            &:last-of-type {
                border-bottom: none;
            }
        `;


export const Header: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-margin-bottom-1 ${className}`,
            ...props
        }))`
             display: flex;
             justify-content: space-between;        
        `;


export const Category: ComponentType<*> =
    styled
        .span
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag govuk-!-margin-left-2 ${className}`,
            ...props
        }))`
            font-size: 14px !important;
            align-self: top;
        `;


export const Tag: ComponentType<*> =
    styled
        .span
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag govuk-tag--blue govuk-!-margin-right-1 ${className}`,
            ...props
        }))`
            font-size: 12px !important;
        `;
