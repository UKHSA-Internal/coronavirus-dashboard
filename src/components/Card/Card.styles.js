// @flow

import React from "react";
import styled from 'styled-components';
import type { ComponentType } from 'react';
import DownloadIcon from "assets/download.svg"


export const HalfCard: ComponentType<*> = (() => {
    return styled.article`
        flex: 1 1 43%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        background-color: #f8f8f8;
        margin-top: 30px;
    `;
})();


export const HalfCardHeader = ({ className="", ...props }) => (
    <header className={ `util-flex util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2 ${className}` } { ...props }/>
);


export const HalfCardHeading = ({ className="", ...props }) => (
    <h2 className={ `govuk-heading-m govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);


export const HalfCardSplitBody: ComponentType<*> = (() => {
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
        flex: 1 0 60%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        margin-top: 30px;
        background-color: #f8f8f8;
        min-height: 450px;
        
        &:first-of-type {
            margin-top: 0;
        }
    `;
})();


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
    return styled.section`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 1rem 0 0 0;
        
        & > * {
            margin-right: 2rem;
            margin-bottom: 0;
        }
    `;
})();


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


export const DownloadContainer: ComponentType<*> = (() => {

    return styled.div`
        min-width: 100px;
        float: right;
    `;

})();


export const DownloadOptionsContainer :ComponentType<*> = (() => {

    return styled.div`
        display: flex;
        flex: 1 0 100px;
        flex-direction: column;
        position: absolute;
        z-index: 999999999;
        float: right;
        margin-top: 14px;
        margin-right: -15px !important;
        width: 100px;
        
        & > * {
            display: block;
            padding: 8px 8px;
            background-color: #f1f1f1;
            border-top: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            width: 100px;
            text-decoration: none;
            text-align: left;
            
            &:active,
            &:focus,
            &:hover {
                background-color: #e5e5e5;
                outline: none;
                box-shadow: none;
            }
            
            &.disabled {
                background-color: #f1f1f1;
                color: #c1c1c1;
            }
            
            &:first-child {
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
            }
            
            &:last-child {
                border-bottom: 1px solid #e5e5e5;
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
        
    `

})();


export const Download: ComponentType<*> = (() => {
    const
        Container = styled.span`
            width: 33px;
            height: 33px;
            display: inline-block;
            position: relative;
            cursor: pointer;
            margin: -20px;
            float: right;
            border-left: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
            background-color: #f1f1f1;
            transition: all .3s;
            
            &:hover {
                background-color: #e1e1e1;
            }
        `,
        Node = styled.button`
            width: 28px;
            height: 30px;
            outline: none;
            cursor: pointer;
            display: inline-block;
            float: right;
            margin-right: 3px;
            background: url("${ DownloadIcon }");
            background-repeat: no-repeat;
            background-size: 25px 25px;
            background-position: center center;
        `;

    return ({ children, ...props }) => <Container>
        <Node role={ "button" } { ...props }>
            { children }
        </Node>
    </Container>

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
        font-size: 1.4rem;
    `;

    return ({ className="", ...props }) =>
        <Node className={ `govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0 ${ className }` }
            { ...props }/>

})();
