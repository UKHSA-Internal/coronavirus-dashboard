// @flow

import React from "react";
import styled from 'styled-components';
import type { ComponentType } from 'react';

export const HalfCard: ComponentType<*> = (() => {
    return styled.article`
        flex: 1 1 43%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        margin: 15px;
        background-color: #f8f8f8;
    `;
})();


export const HalfCardHeader = ({ className="", ...props }) => (
    <header className={ `util-flex util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2 ${className}` } { ...props }/>
);


export const HalfCardHeading = ({ className="", ...props }) => (
    <h2 className={ `govuk-heading-m govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);


export const HalfCardBody: ComponentType<*> = (() => {
    const
        classes = 'util-flex util-flex-wrap',
        Node = styled.div`
            margin: 0 -15px;
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const FullCard: ComponentType<*> = (() => {
    return styled.article`
        flex: 1 2 50%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        margin-bottom: 30px;
        background-color: #f8f8f8;
    `;
})();


export const FullCardHeader = ({ className="", ...props }) => (
    <header className={ `util-flex util-flex-wrap util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2 ${className}` } { ...props }/>
);


export const FullCardHeading = ({ className="", ...props }) => (
    <h2 className={ `govuk-heading-m govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);


export const Caption = ({ className="", ...props }) => (
    <span className={ `govuk-caption-m ${className}` } { ...props }/>
);


export const BodySection: ComponentType<*> = (() => {
        return styled.div`
            flex: 1 1 43%;
            margin: 0 15px;
        `;
})();



export const HBodySection: ComponentType<*> = (() => {
        return styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 1rem 0;
            
            & > * {
                margin-right: 2rem;
            }
        `;
})();


export const SectionBreak = ({ className="", ...props }) => (
    <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible ${className}` } { ...props }/>
);


export const DataContainer = ({ className="", ...props }) => (
    <div className={ `${ className }` } { ...props }/>
);


export const Heading = ({ className="", ...props }) => (
    <h3 className={ `govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-left-4 ${className}` } { ...props }/>
);


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


export const DataNumbersContainer = ({ className="", ...props }) => (
    <div className={ `util-flex util-flex-wrap govuk-!-margin-bottom-21 govuk-!-margin-left-4 ${className}` } { ...props }/>
);


export const NumericData: ComponentType<*> = (() => {

    const Node = styled.h3`
        margin-top: 0;
    `

    return ({ className="", ...props }) =>
        <Node className={ `govuk-!-margin-right-4 ${className}` } { ...props }/>
})();


export const DataLabel = ({ className="", ...props }) => (
    <small className={ `govuk-caption-m govuk-!-font-size-16 ${className}` } { ...props }/>
);


export const Number: ComponentType<*> = (() => {

    const Node = styled.span`
        font-size: 1.2rem;
    `;

    return ({ className="", ...props }) =>
        <Node className={ `govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0 ${ className }` }
            { ...props }/>

})();
