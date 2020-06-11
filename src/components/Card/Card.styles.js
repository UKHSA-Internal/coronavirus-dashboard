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
        flex: 1 1 auto;
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


export const SectionBreak = ({ className="", ...props }) => (
    <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible ${className}` } { ...props }/>
);


export const DataContainer = ({ className="", ...props }) => (
    <div className={ `${ className }` } { ...props }/>
);


export const DataHeading = ({ className="", ...props }) => (
    <h3 className={ `govuk-heading-s govuk-!-margin-bottom-1 ${className}` } { ...props }/>
);


export const DataColour: ComponentType<*> = (() => {
    return styled.span`
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


export const DataPrimary = ({ className="", ...props }) => (
    <div className={ `govuk-!-margin-right-4 ${className}` } { ...props }/>
);


export const DataSecondary = ({ className="", ...props }) => (
    <div className={ `${className}` } { ...props }/>
);


export const DataLabel = ({ className="", ...props }) => (
    <span className={ `govuk-caption-m govuk-!-font-size-16 ${className}` } { ...props }/>
);


export const Number = ({ className="", ...props }) => (
    <h3 className={ `govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0 ${className}` } { ...props }/>
);


export const ToolTip: ComponentType<*> = (() => {
    const
        classes = '',
        Node = styled.span`
            &::before {
                position: relative;
                top: -5px;
                display: inline-block;
                width: 14px;
                height: 14px;
                border: 1px solid #1d70b8;
                margin-left: 5px;
                border-radius: 10px;
                color: #1d70b8;
                content: 'i';
                font-family: Verdana, sans-serif;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
            }

            &:hover {
                &::before {
                    border-color: #1d70b8;
                    background: #1d70b8;
                    color: white;
                }
            }
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();

