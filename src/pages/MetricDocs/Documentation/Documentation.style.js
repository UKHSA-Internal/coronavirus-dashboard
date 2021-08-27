// @flow

import styled from 'styled-components';

import type { ComponentType } from 'react';


export const MarkdownContent: ComponentType<*> =
    styled
        .div`
        max-width: 40em;
        `;


export const APIMetricContainer: ComponentType<*> =
    styled
        .div`
        display: inline-block;
        background: #D9D9D9FF;
        margin-right: auto;
        width: auto;
        margin-top: 1rem;
        margin-bottom: 2rem;
        `;

export const APILabel: ComponentType<*> =
    styled
        .span`
        background: #4c4c4c; 
        color: white;
        padding: .5rem 1rem;
        font-size: 1rem;
        `;

export const APIMetric: ComponentType<*> =
    styled
        .code`
        background: #d9d9d9;
        font-size: 1rem;
        padding: .5rem 1rem;
        `;