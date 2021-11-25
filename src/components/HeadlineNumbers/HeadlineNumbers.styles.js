// @flow

import styled from 'styled-components';

import type { ComponentType } from 'react';


export const Container: ComponentType<*> =
    styled
        .section
        .attrs(() => ({
            role: "region"
        }))`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 1rem 0 0 0;
            column-gap: 1.5rem;
            
            & > * {
                column-gap: 1rem;
                row-gap: .5rem;
            }
        `;