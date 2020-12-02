import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';

export const ChangeMonthContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${className} aria-change-month-label`,
            ...props
        }))`
            border-top: 1px solid #b1b4b6;
            margin-top: 15px;
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

