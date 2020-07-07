// @flow

import React from "react";
import styled from 'styled-components';

import type { ComponentType } from 'react';


export const HalfCard: ComponentType<*> = (() => {

    return styled.div`
        flex: 1 1 43%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        background-color: #f8f8f8;
        margin-top: 30px;
        
        &:nth-of-type(2n) {
            margin-left: 30px;
            
            @media only screen and (max-width: 640px) {
                margin-left: 0;
            }
        }
    `;

})();


export const HalfCardHeader = ({ className="", ...props }) => {

    return <header className={ `util-flex util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2 ${ className }` }
                   { ...props }/>

};


export const HalfCardHeading = ({ className="", ...props }) => {

    return <h2 className={ `govuk-heading-m govuk-!-margin-bottom-0 ${ className }` }
               { ...props }/>

};


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


export const Caption = ({ className="", ...props }) => {

    return <span className={ `govuk-caption-m ${className}` } { ...props }/>

};


export const BodySection: ComponentType<*> = (() => {

    return styled.div`
        flex: 1 1 43%;
        margin: 0 15px;
    `;

})();
