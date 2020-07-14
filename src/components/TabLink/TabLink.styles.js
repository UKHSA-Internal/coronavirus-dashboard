// @flow

import React from "react";
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer = ({ className, ...props }) => (
  <div className={ `util-flex util-flex-col ${className}` } { ...props }/>
);


export const TabsContainer = ({ className, ...props }) => (
  <div className={ `util-flex util-flex-wrap util-flex-align-items-start govuk-!-margin-bottom-6 ${className}` } { ...props }/>
);


export const Tab: ComponentType<*> = (() => {
    const
        classes = 'govuk-link govuk-!-font-size-19 govuk-!-margin-right-7',
        Node = styled.button`
            padding-bottom: 2px;
            color: #1e70b8;
            cursor: pointer;

            &.active,
            &.focus {
                border-bottom: 4px solid #1e70b8 !important;
                color: #1e70b8;
            }
        `;

  return ({ className, ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();  // Tab


export const Body: ComponentType<*> = (() => {
    return styled.div`
        display: block;
        height: fit-content;
        width: 100%;
    `;
})();  // Body





