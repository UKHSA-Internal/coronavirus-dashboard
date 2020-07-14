// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const NumericData: ComponentType<*> = (() => {

    const Node = styled.div`
        margin-top: 0;
    `

    return ({ className="", ...props }) =>
        <Node className={ `govuk-!-margin-right-4 ${className}` } { ...props }/>
})();


export const Number: ComponentType<*> = (() => {

    const Node = styled.span`
        font-size: 1.4rem;
    `;

    return ({ className="", ...props }) =>
        <Node className={ `govuk-heading-m govuk-!-font-weight-regular govuk-!-margin-bottom-2 govuk-!-padding-top-0 ${ className }` }
            { ...props }/>

})();


export const Heading = ({ className="", ...props }) => {

    return <h3 className={ `govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-left-4 ${className}` }
               { ...props }/>

};


export const DataContainer = (() => {

    const Node = styled.div`
        margin-bottom: 1rem !important;
    `;

    return ({ className="", ...props }) =>
        <Node className={ `${ className }` } { ...props }/>

})();


export const DataLabel = ({ className="", ...props }) => {

    return <span className={ `govuk-caption-m govuk-!-font-size-16 ${ className }` }
                 { ...props }/>

};


export const DataNumbersContainer = ({ className="", ...props }) => {

    return <div className={ `util-flex util-flex-wrap govuk-!-margin-bottom-21 govuk-!-margin-left-4 ${ className }` }
                { ...props }/>

};

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
