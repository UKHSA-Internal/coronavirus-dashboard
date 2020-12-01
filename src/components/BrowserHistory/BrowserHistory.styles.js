// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Article: ComponentType<*> =
    styled
        .article
        .attrs(({ className, ...props }) => ({
            className: `about ${className}`,
            ...props
        }))`
            max-width: 50em;
        `;


export const Markdown: ComponentType<*> =
    styled
        .div
        .attrs(({ className, ...props }) => ({
            className: `markdown ${className}`,
            ...props
        }))``;
