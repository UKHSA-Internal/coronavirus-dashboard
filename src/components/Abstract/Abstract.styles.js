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
            color: #6B7276;
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
            
            @media only screen and (max-width: 1070px) {
                width: 85% !important;
            }
            
            @media only screen and (max-width: 550px) {
                width: 100% !important;
            }
        `;

})();
