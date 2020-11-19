// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


const calcTextDecoration = ({enabled}) => {
    return enabled ? 'underline' : 'none';
}

const calcCursor = ({enabled}) => {
    return enabled ? 'pointer' : 'not-allowed';
}

const calcOpacity = ({enabled}) => {
    return enabled ? '1' : '0.5';
}

export const DownloadLink: ComponentType<*> =
    styled
        .a
        .attrs(({ className="", href="", enabled=false }) => ({
            className: `govuk-link ${className}`,
            href: `${href}`
        }))`
            cursor: ${calcCursor};
            opacity: ${calcOpacity};
            text-decoration: ${calcTextDecoration};
        `;


export const DatePickerContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${className} aria-archivedate-label`,
            ...props
        }))`
            margin-left: .5rem;
            padding: 1rem;
            border-left: 6px solid #b1b4b6;
        `;


export const PermaLink: ComponentType<*> =
    styled
        .p`
            padding: 1rem;
            margin-bottom: 0;
            background: rgb(249, 249, 249);
            border: 3px solid rgb(225, 225, 225);
            font-family: monospace, monospace;
            overflow: hidden;
            word-break: break-all;
        `;


export const Container: ComponentType<*> =
    styled
        .div`
            width: 100%;
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 1fr;
            
            @media only screen and (min-width: 800px) {
                grid-template-columns: repeat(3, 1fr);
            }
            @media only screen and (min-width: 1100px) {
                grid-template-columns: repeat(4, 1fr);
            }
        `;


export const MainContent: ComponentType<*> =
    styled
        .section`
            display: grid;
            border-top: 2px solid #b1b4b6;
            margin-top: 2rem;
            grid-column: 1/-1;

            @media only screen and (min-width: 800px) {
                grid-column: 1/3;
                
                .*-one-half {
                    width: 100%;
                }
            }
            @media only screen and (min-width: 1100px) {
                grid-column: 1/4;
            }
            
            &.no-border {
                border-top: unset;
                margin-top: 1rem;
                max-width: 50em;
            }
        `;

export const SideContent: ComponentType<*> =
    styled
        .section`
            display: grid;
            grid-column: 1/-1;
            border-top: 2px solid #1d70b8;
            margin-top: 2rem;
            align-content: start;
            
            @media only screen and (min-width: 800px) {
                grid-column: 3/-1;
            }
            @media only screen and (min-width: 1100px) {
                grid-column: 4/-1;
            }
        `;


export const Form: ComponentType<*> =
    styled
        .form`
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(4, 1fr);
            margin-right: auto;
            grid-row-gap: 2rem;
            grid-column-gap: 1.5rem;
            
            & .one-half {
                grid-column: 1/3;
            }
            
            & .full {
                grid-column: 1/-1;
            }
            
            & .two-third {
                grid-column: 1/4;
            }
            
            @media only screen and (max-width: 1100px) {
                & .one-half,
                & .two-third {
                    grid-column: 1/-1;
                }
            }
        `;


export const Formset: ComponentType<*> =
    styled
        .fieldset
        .attrs(({ className="", width="full", ...props }) => ({
            className: `${width} ${className}`,
            ...props
        }))`
            display: div;
            border: unset;
            border-left: ${ ({ error }) => error ? "5px solid #d4351c" : "unset" };
            padding: ${ ({ error }) => error ? ".5rem 0 1rem 1rem" : "unset" };
        `;
