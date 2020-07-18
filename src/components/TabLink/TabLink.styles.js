// @flow

import React from "react";
import styled from 'styled-components';

import type { ComponentType } from 'react';


export const MainContainer = (() => {

    return styled.div`
        display: flex !important;
        flex-direction: column !important;
    `

})();


export const TabsContainer = (() => {

    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-margin-bottom-6`
        }))`
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: flex-start !important;
        `

})();


export const Tab: ComponentType<*> = (() => {

    return styled
        .button
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-link govuk-!-font-size-19 govuk-!-margin-right-7`
        }))`
            padding-bottom: 2px;
            color: #1e70b8;
            cursor: pointer;
    
            &.active,
            &.focus {
                border-bottom: 4px solid #1e70b8 !important;
                color: #1e70b8;
            }
        `

})();  // Tab


export const Body: ComponentType<*> = (() => {

    return styled.div`
        display: block;
        height: fit-content;
        width: 100%;
    `

})();  // Body





