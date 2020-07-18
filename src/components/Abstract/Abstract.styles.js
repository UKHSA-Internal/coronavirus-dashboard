// @flow

import React from "react";
import styled, { css } from "styled-components";

import type { ComponentType } from "react";


export const AbstractContainer: ComponentType<*> = (() => {

    return styled
        .summary
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-body-s`
        }))`   
            color: #626a6e;
            line-height: 1.7rem;
            
            ${
                props => 
                    props.fullWidth
                        ? css`width: 50% !important;`
                        : css`width: 85%  !important;`
            }
                 
            & .modal-opener-text {
                color: #000;
                line-height: 2rem;
                margin-bottom: 1.5rem;
            }
        `;

})();


export const Text: ComponentType<*> = (() => {

    return styled.span`
        color: #626a6e;
    `;

})();
