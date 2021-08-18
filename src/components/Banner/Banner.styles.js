// @flow

import styled from 'styled-components';

import type { ComponentType } from 'react';


export const BannerBase: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } banner`,
            ...props
        }))`
        `;


export const BannerContent: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } content`,
            ...props
        }))`
        `;


export const Timestamp: ComponentType<*> =
    styled
        .time
        .attrs(({ className="", ...props }) => ({
            className: `${ className }`,
            ...props
        }))``;


export const Body: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${ className } body`,
            ...props
        }))`
        `;