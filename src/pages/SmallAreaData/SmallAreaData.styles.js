// @flow

import React from "react";

import styled from 'styled-components';
import { ComponentType } from "react";


export const Frame: ComponentType<*> = (() => {

    return styled.iframe`
        display: flex;
        height: 74vh;
        width: 100%;
        border: unset;
    `

})();


export const DownloadLink: ComponentType<*> = (() => {

    const Node = styled.a`
        margin-top: 1rem;
    `;

    return ({ className=``, ...props }) =>
        <p className={ 'govuk-body-s govuk-!-margin-top-5' }>
            <Node className={ `govuk-link govuk-link--no-visited-state ${className}` }
                  { ...props }/>
        </p>

})();
