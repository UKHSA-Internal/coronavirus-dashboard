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
        
        @media only screen and (max-width: 768px) {
            flex: 1 1 100%;
        }
        
        &:nth-of-type(2n) {
            margin-left: 30px;
            
            @media only screen and (max-width: 1074px) {
                flex: 1 1 100%;
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
        
        &:nth-child(2n) {
            @media only screen and (max-width: 550px) {
                flex: 1 1 100%;
                margin-top: 2rem;
            }
        }

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


export const MixedCardContainer: ComponentType<*> = ({ children }) => {

    const Node = styled.section`
        display: flex;
        flex-wrap: wrap;
        
        justify-items: space-between;
    `;

    return <Node>{ children }</Node>

};  // MixedCardContainer

