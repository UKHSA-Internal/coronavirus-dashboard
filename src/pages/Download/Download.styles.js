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
            href: `${href}`,
            enabled
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
                grid-template-columns: repeat(3, 1fr);
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
                grid-column: 1/3;
            }
            
            &.no-border {
                border-top: unset;
                margin-top: 1rem;
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
                grid-column: 3/-1;
            }
        `;


export const SelectOptions = {
    control: ( base, state ) => ({
        ...base,
        boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none"
    }),
    menu: provided => ({
        ...provided,
        borderRadius: 0,
        backgroundColor: "rgba(241, 241, 241, 0.99)",
        padding: 5
      }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? "#1d70b8": "none",
        color: state.isFocused ? "#f1f1f1": "#000",
        ":before": {
            content: state.isSelected ? '"✓ "' : '""'
        }
    }),
    placeholder: styles => ({
        ...styles,
        color: "#6B7276"
    })
};
