// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';

export const MainContainer: ComponentType<*> =
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


export const Container: ComponentType<*> =
    styled
        .div`
            width: 100%;
            display: grid;
            grid-gap: 2rem;
            grid-template-rows: 5px 1fr; 
            margin-top: 20px;
            grid-template-columns: repeat(6, 1fr);
        `;

export const MainDiv: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `govuk-!-margin-top-0 govuk-!-margin-bottom-0 ${className}`
        }))`
            grid-column: 1/ span 6;
        `;

export const MatrixColumn: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `govuk-!-margin-top-1 govuk-!-margin-bottom-1 ${className}`
        }))`
            height: 2px;
            border-top: 1px solid #e5e5e5;
        `;

export const MatrixButton: ComponentType<*> =
    styled
        .button
        .attrs(({ className="" }) => ({
            className: `govuk-accordion__section-button ${className}`
        }))`
            width: 100%;
            type: button;
        `;

const calcTextAlign = ({ textAlign }) => {
    return textAlign;
}

const calcFontWeight = ({ fontWeight }) => {
    return fontWeight;
}
        
export const MetricSummary: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", textAlign='left', fontWeight='normal' }) => ({
            className: `govuk-heading-s ${className}`,
            textAlign,
            fontWeight
        }))`
            font-size: 13pt;
            text-align: ${calcTextAlign};
            font-weight: ${calcFontWeight};
        `;

export const HeaderDiv: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", index }) => ({
            className: `govuk-!-margin-top-0 govuk-!-margin-bottom-0 ${className}`,
            index
        }))`
            height: 2px;
            grid-column: {index} / span 1;
        `;

export const SummaryContainer: ComponentType<*> =
    styled
        .div`
            display: grid;
            width: 100%;
            grid-template-columns: 9% 61% 20% 10%;
        `;

    

export const Markdown = ({ className = '', ...props }) => (
    <div className={ `markdown ${className}` } { ...props }/>
);
        