// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const PageHeading: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-margin-bottom-4 ${className}`,
            ...props
        }))`
            display: flex;
            justify-content: space-between;
            align-items: center;
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
        `;



export const Container: ComponentType<*> =
    styled
        .div
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
