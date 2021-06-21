import styled from "styled-components";
import type { ComponentType } from 'react';

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
        .fieldset`
            display: div;
            border: unset;
            border-left: ${ ({ error }) => error ? "5px solid #d4351c" : "unset" };
            padding: ${ ({ error }) => error ? ".5rem 0 1rem 1rem" : "unset" };
        `;
