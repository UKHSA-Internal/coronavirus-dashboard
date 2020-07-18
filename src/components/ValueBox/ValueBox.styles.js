// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const NumericData: ComponentType<*> = (() => {

    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-margin-right-4`
        }))`
            margin-top: 0;
        `

})();


export const Number: ComponentType<*> = (() => {

    return styled
        .p
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0`
        }))`
            font-size: 1.4rem;
        `

})();


export const Heading: ComponentType<*> = ({ embedded, ...props }) => {

    const Node = (
        embedded
            ? styled.h3
            : styled.h2
    ).attrs(({ className="" }) => ({
        className: `${ className } ${embedded ? "govuk-heading-s" : "govuk-heading-m"} govuk-!-margin-bottom-1 govuk-!-margin-left-4`,
        role: "heading",
        "aria-level": embedded ? 3 : 2
    }))``

    return <Node { ...props }/>

};


export const DataContainer = (() => {

    return styled.div`
        margin-bottom: 1rem !important;
    `

})();


export const DataLabel: ComponentType<*> = ({ embedded, ...props }) => {

    const Node = (
        embedded
            ? styled.h4
            : styled.h3
    ).attrs(({ className="" }) => ({
        className: `${ className } govuk-caption-m govuk-!-font-size-16`,
        role: "heading",
        "aria-level": embedded ? 4 : 3
    }))`
        margin: 0
    `

    return <Node { ...props }/>

};


export const DataNumbersContainer: ComponentType<*> = (() => {


    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-margin-bottom-21 govuk-!-margin-left-4`
        }))`
            display: flex;
            flex-wrap: wrap !important;
        `

})();


export const DataColour: ComponentType<*> = (() => {

    return styled.button`
        cursor: pointer;
        outline: none;
        width: 12px;
        height: 12px;
        border: 1px solid #000;
        margin: 6px 7px 6px 0;
        background: ${props => props.colour};
        box-shadow: inset 0 0 0 1px #fff;
        float: left;
    `;

})();
