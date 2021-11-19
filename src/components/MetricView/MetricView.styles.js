// @flow

import styled from "styled-components";
import type { ComponentType } from "react";


export const Option: ComponentType<*> =
    styled
        .li`
            display: flex;
            flex-flow: column;
            padding: 1rem 0;
            border-bottom: 1px dotted #b1b4b6;
            margin-bottom: 0 !important;

            &:last-of-type {
                border-bottom: none;
            }
        `;


export const Content: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-margin-bottom-1 ${className}`,
            ...props
        }))`
             display: flex;
             flex-flow: row;
             column-gap: .5rem;
             row-gap: .5rem;
             flex-wrap: wrap;
             justify-content: space-between;    
             margin-bottom: 0 !important;
             
             @media only screen and (max-width: 400px) {
                flex-flow: column;
                
                & > a {
                    align-self: start !important;
                }
             }

             & > a { 
                justify-self: flex-start;
                align-self: center;             
                @media only screen and (min-width: 400px) {
                    max-width: 60%;
                }
             }   
        `;


export const HeadingLabels: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: row;
            row-gap: 3px;
            column-gap: 3px;
            justify-self: flex-end;
            margin-left: auto;
            align-items: start;
        `;


export const InfoRow: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-margin-bottom-2 ${className}`,
            ...props
        }))`
             display: flex;
             flex-direction: row;
             flex-wrap: wrap;
             justify-content: space-between;
             flex: 1 1 100%;
             
             & > * {
                word-break: break-all;
             }
        `;


export const Category: ComponentType<*> =
    styled
        .span
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag ${className}`,
            ...props
        }))`
            font-size: 14px !important;
            align-self: top;
        `;


export const TagsContainer: ComponentType<*> =
    styled
        .ul
        .attrs(({ className="", ...props }) => ({
            className: `govuk-list govuk-!-margin-top-1 govuk-!-margin-bottom-0 ${className}`,
            ...props
        }))`
            display: flex;
            row-gap: 3px;
            flex-flow: row;
            flex-wrap: wrap;
        `;



export const Tag: ComponentType<*> =
    styled
        .li
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag govuk-tag--blue govuk-!-margin-right-1 ${className}`,
            ...props
        }))`
            font-size: 12px !important;
            margin-bottom: 0 !important;
        `;


export const SearchToken: ComponentType<*> =
    styled
        .code`
            border: 1px solid #b1b4b6;
            border-radius: 2px;
            padding: 1px 2px;
        `;


export const ResultsHeader: ComponentType<*> =
    styled
        .div`
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        `;


export const Deprecated: ComponentType<*> =
    styled
        .strong
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag ${ className }`,
            ...props
        }))`
        font-size: 14px !important;
        align-self: top;
        display: inline-flex;
        align-content: center;
        color: #942514;
        background: #f6d7d2;
        `;