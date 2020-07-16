// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const AbstractContainer: ComponentType<*> = (() => {

    const Node = styled.p`   
        color: #626a6e;
             
        & .modal-opener-text {
            color: #000;
            line-height: 2rem;
            margin-bottom: 1.5rem;
        }
    `;

    return ({ fullWidth, ...props }) => <div className={ "govuk-grid-row" }>
        <div className={ fullWidth ? "govuk-grid-column-one-half" : "govuk-grid-column-two-thirds" }>
            <div className={ "govuk-body-s" }>
                <Node { ...props }/>
            </div>
        </div>
    </div>

})();


export const Text: ComponentType<*> = (() => {

    return styled.span`
        color: #626a6e;
    `;

})();
