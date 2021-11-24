// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


export const Markdown: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } markdown modal`
        }))`
            padding: 0 10px 0 0;
            overflow-x: hidden;
            max-height: 300px;
            font-size: 80%;
            border-bottom: unset;
            margin-bottom: 0;
            overflow-y: scroll;
            
            & > * {
               max-width: 45em;
            }

            & > :first-child {
                margin-top: 0;
            }            
        `;


export const MetricContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: column;    
            
            & > .last-modified {
                color: #6B7276;
                margin-bottom: 1rem;
            }     
        `;


export const MetadataContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `${className} govuk-body govuk-!-padding-right-2`
        }))`
            overflow-y: auto;  
        `;


export const MetricsList: ComponentType<*> =
    styled
        .ul
        .attrs(({ className="" }) => ({
            className: `${className} govuk-list govuk-list--dashed`
        }))`
            max-width: 30em;
        `;
