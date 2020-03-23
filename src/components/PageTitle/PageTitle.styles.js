// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    grid-column: span 4;

    & .govuk-back-link {
      width: fit-content;
    }

    @media only screen and (max-width: 768px) {
      grid-column: span 2;
    }
  `;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 5px;
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
