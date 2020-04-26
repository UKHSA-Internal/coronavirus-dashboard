// @flow

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

export const Caption: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 5px;
    font-size: 16px;
    color: #626a63;
  `;
})();

export const Title: ComponentType<*> = (() => {
  return styled.h1`
    font-size: 3rem;
    margin-bottom: 20px;
  `;
})();

export const Subtitle: ComponentType<*> = (() => {
  return styled.span`
    font-size: 1.19rem;
  `;
})();
