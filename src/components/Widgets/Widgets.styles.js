import styled from "styled-components";

import type { ComponentType } from 'react';


export const NotAvailableContainer: ComponentType<*> = (() => {

    return styled.span`
      color: #6B7276;
    `;

})();


export const AdmonitionText =
    styled
        .strong
        .attrs(({ className="" }) => ({
            className: `govuk-warning-text__text ${ className }`
        }))``;


export const AdmonitionContainer =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `govuk-warning-text ${ className }`
        }))`
            padding: 0;
            width: 80%;
            margin: 2rem auto;
        `;


export const Code: ComponentType<*> =
    styled
        .code`
            background-color: #f8f8f8;
            border: 1px #f3f2f1 solid;
            padding: 1px 4px;
            font-size: 12pt;
        `;
