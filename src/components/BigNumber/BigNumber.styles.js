// @flow

import React from "react";
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';


export const Children: ComponentType<*> = (() => {
    const
        classes = 'govuk-!-margin-top-5 govuk-!-margin-bottom-5',
        Node = styled.div`
            display: flex;

            @media only screen and (max-width: 768px) {
                align-items: stretch;
                flex-direction: column;

                &>* {
                    width: 100%;
                }
            }
        `;

    return ({ className, ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Container: ComponentType<*> = (() => {
    const
        classes = 'govuk-!-padding-left-4 govuk-!-padding-right-4',
        Node = styled.div`
            width: 33%;

            @media only screen and (max-width: 768px) {
                &:nth-child(n+1) {
                    margin-right: 0;
                }
            }

            ${ addIECss(css`
              width: 100%;
            `) }
        `;

    return ({ className, ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Caption = ({ className, ...props }) => (
  <span className={ `govuk-caption-m ${className}` } { ...props }/>
);


export const Title = ({ className, ...props }) => (
  <h2 className={ `govuk-heading-s govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);


export const Number = ({ className, ...props }) => (
  <h3 className={ `govuk-heading-l govuk-!-margin-bottom-2 ${className}` } { ...props }/>
);
