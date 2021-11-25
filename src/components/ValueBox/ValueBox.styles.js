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
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0`
        }))`
            font-size: 1.4rem;
        `

})();


const Level2Heading =
    styled
        .h2
        .attrs(({ className="", embedded }) => ({
            className: `${ className } ${embedded ? "govuk-heading-s" : "govuk-heading-m"} govuk-!-margin-bottom-1 govuk-!-margin-left-4`,
            role: "heading",
            "aria-level": embedded ? 3 : 2
        }))``;


const Level3Heading =
    styled
        .h3
        .attrs(({ className="", embedded }) => ({
            className: `${ className } ${embedded ? "govuk-heading-s" : "govuk-heading-m"} govuk-!-margin-bottom-1 govuk-!-margin-left-4`,
            role: "heading",
            "aria-level": embedded ? 3 : 2
        }))``;


export const Heading: ComponentType<*> = ({ embedded, ...props }) => {

    const Node = embedded ? Level3Heading : Level2Heading;

    return <Node embedded={ embedded } { ...props }/>

};


export const DataContainer = (() => {

    return styled.div`
        margin-bottom: 1rem !important;
    `

})();


const Level3Label =
    styled
        .h3
        .attrs(({ className="", embedded }) => ({
            className: `${ className } govuk-caption-m govuk-!-font-size-16`,
            role: "heading",
            "aria-level": embedded ? 4 : 3
        }))`
            margin: 0
        `;


const Level4Label =
    styled
        .h4
        .attrs(({ className="", embedded }) => ({
            className: `${ className } govuk-caption-m govuk-!-font-size-16`,
            role: "heading",
            "aria-level": embedded ? 4 : 3
        }))`
            margin: 0
        `;


export const DataLabel: ComponentType<*> = ({ embedded, ...props }) => {

    const Node = embedded ? Level4Label : Level3Label

    return <Node embedded={ embedded } { ...props }/>

};


export const DataNumbersContainer: ComponentType<*> = (() => {


    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-margin-bottom-21 govuk-!-margin-left-4`
        }))`
            display: flex;
            column-gap: 1.5rem;
            row-gap: 1rem;
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
