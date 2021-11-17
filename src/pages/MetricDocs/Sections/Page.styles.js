// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const PageHeading: ComponentType<*> =
    styled
        .header
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-margin-bottom-4 ${className}`,
            ...props
        }))`
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        `;


export const FieldSet: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-fieldset ${className}`,
            ...props
        }))`
            margin-bottom: 1.5rem;
            
            & > .govuk-hint {
                max-width: 30em;
            }
            
            &:last-of-type {
                margin-bottom: 0;
            }
        `;



export const Container: ComponentType<*> =
    styled
        .article
        .attrs(({ className="", ...props }) => ({
            className: `govuk-body-s ${className}`,
            ...props
        }))`
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            max-width: 50em;
            padding: 1rem;
        `;
