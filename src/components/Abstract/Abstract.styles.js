// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const AbstractContainer: ComponentType<*> = (() => {

    const Node = styled.summary`        
        & .modal-opener-text {
            color: #000;
            line-height: 2rem;
            margin-bottom: 1.5rem;
        }
    `;

    return ({ ...props }) => <div className={ "govuk-grid-row" }>
        <div className={ "govuk-grid-column-one-half" }>
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
