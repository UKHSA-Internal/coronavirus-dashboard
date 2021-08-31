// @flow

import styled, { css } from 'styled-components';

import type { ComponentType } from 'react';


export const MarkdownContent: ComponentType<*> =
    styled
        .div`
        max-width: 40em;
        `;


export const APIMetricContainer: ComponentType<*> =
    styled
        .div`
        display: flex;
        flex-wrap: wrap;
        margin-right: auto;
        width: auto;
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { marginTop: '0.2rem', marginBottom: '0.2rem' }
                : { marginTop: '1rem', marginBottom: '1rem' }
        })}`}
        `;

export const APILabel: ComponentType<*> =
    styled
        .span
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-!-font-size-${ small ? 14 : 16 } ${className}`,
            ...props
        }))`
        background: #4c4c4c; 
        color: white;
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { padding: '.25rem .5rem' }
                : { padding: '.5rem 1rem' }
        })}`}
        `;

export const APIMetric: ComponentType<*> =
    styled
        .span
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-!-font-size-${ small ? 14 : 16 } ${className}`,
            ...props
        }))`
        background: #d9d9d9;
        font-family: menlo, monaco, courier, monospace;
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { padding: '.25rem .5rem' }
                : { padding: '.5rem 1rem' }
        })}`}
        `;


export const MetadataContainer: ComponentType<*> =
    styled
        .dl
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-body ${className}`,
            ...props
        }))`
        display: grid;
        grid-template-columns: auto 1fr;
        
        & > dt {
            grid-column: 1;
            font-weight: bold;
        }
        
        & > dd {
            grid-column: 2;
            
            & > * {
                white-space: nowrap;
            }
        }
        `;