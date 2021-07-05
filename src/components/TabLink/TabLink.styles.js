// @flow

import styled, { css } from 'styled-components';

import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> =

    styled
        .div`
            display: flex !important;
            flex-direction: column !important;
        `;


export const MainContainerLanguageTabs =

    styled
        .div`
        display: flex !important;
        flex-direction: column !important;
        margin-bottom: 150px;
    `;


export const TabsContainer: ComponentType<*> =

    styled
        .div`
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: flex-start !important;
            margin-bottom: 1rem;
        `;


export const Tab: ComponentType<*> =

    styled
        .button
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-link govuk-!-font-size-19 govuk-!-margin-right-7 tab-link`
        }))``;


export const Body: ComponentType<*> =

    styled
        .div`
            display: grid;
            grid-auto-columns: auto;
            ${({ height }) => css`height: ${height ? height : "350px"}`} 
        `;





