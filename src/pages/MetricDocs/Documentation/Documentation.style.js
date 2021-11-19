// @flow

import styled, { css } from 'styled-components';

import type { ComponentType } from 'react';


export const MarkdownContent: ComponentType<*> =
    styled
        .div`
        max-width: 40em;
        
        &.no-left-margin {
            margin-left: 0 !important;
        }
        
        &.with-toc {
            &>ul:first-of-type {
                margin-bottom: 2rem;
                
                &,
                & * {
                    list-style-type: none;
                    font-size: 16px;
                }
            }
        }
        `;


export const MainLabelsContainer: ComponentType<*> =
    styled
        .div`
        display: flex;
        flex-wrap: wrap;
        margin-right: auto;
        width: auto;
        row-gap: .5rem;
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { marginTop: '0.2rem', marginBottom: '0.2rem' }
                : { marginTop: '1rem', marginBottom: '1rem' }
        })}`}
        `;

export const Deprecated: ComponentType<*> =
    styled
        .strong
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-!-font-size-${ small ? 14 : 16 } ${className}`,
            ...props
        }))`
        display: inline-flex;
        align-content: center;
        color: #942514;
        background: #f6d7d2;
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { padding: '.25rem .5rem' }
                : { padding: '.5rem 1rem' }
        })}`}
        `;


export const APILabel: ComponentType<*> =
    styled
        .span
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-!-font-size-${ small ? 14 : 16 } ${className}`,
            ...props
        }))`
        display: flex;
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
        margin-right: .5rem;
        word-break: break-all;
                
        ${ css`${ ({ small }) => ({ 
            ...small 
                ? { padding: '.25rem .5rem' }
                : { padding: '.5rem 1rem' }
        })}`}
        `;


export const APIMetricContainer: ComponentType<*> =
    styled
        .span
        .attrs(({ small, className="", ...props }) => ({
            className: `govuk-!-font-size-${ small ? 14 : 16 } ${className}`,
            ...props
        }))`
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        row-gap: 0;
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
        row-gap: .5rem;
        
        & .light-blue {
            color: #144e81;
            background: #d2e2f1;
        }
        
        & .dark-blue {
            color: #fff;
            background: #1d70b8;
        }
        
        & .light-blue,
        & .dark-blue {
            padding: .2rem .4rem;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        & > dt {
            font-weight: bold;
            max-width: fit-content;
            justify-self: end;
        }
        
        & > dd {
            display: flex;
            flex-direction: column;
            row-gap: .3rem;         
            max-width: none;   
            
            & > * {
                white-space: nowrap;
                max-width: fit-content;
            }
        }
        `;