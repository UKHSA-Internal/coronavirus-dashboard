// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


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


export const Option: ComponentType<*> =
    styled
        .div`
            padding: 1rem .5rem;
            border-bottom: 1px dotted #b1b4b6;
            
            &:last-of-type {
                border-bottom: none;
            }
        `;
