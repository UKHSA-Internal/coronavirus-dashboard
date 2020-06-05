// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';


export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1/-1;

    & .govuk-back-link {
      width: fit-content;
    }

    & a {
      margin-bottom: 45px;
    }

    @media only screen and (max-width: 768px) {
      grid-column: span 2;
    }

    ${addIECss(css`
      width: 100%;
    `)}
  `;
})();


export const Title = ({ className, ...props }) => (
  <h1 className={ `govuk-heading-xl govuk-!-margin-bottom-4 ${className}` } { ...props }/>
);


export const Subtitle = ({ className, ...props }) => (
  <span className={ `govuk-body govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);
