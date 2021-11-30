// @flow
import type { ComponentType } from "react";
import styled from "styled-components";


export const Content: ComponentType<*> =
    styled
        .section
        .attrs(({ className="" }) => ({
            className: `govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6 ${className}`
        }))`   
            max-width: 50em;
            margin-left: 0; 
            display: flex !important;
            flex-direction: column;
            
            & * {
                margin-left: 0 !important;
            }
        `;
