// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    border-top: 1px solid #0B0C0C;
    padding-top: 20px;
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 30px;

    & > :not(:first-child) {
      grid-column: 2/4;
    }

    @media only screen and (max-width: 768px) {
      & > * {
        grid-column: span 3 !important;
      }
    }
  `;
})();

export const Title: ComponentType<*> = (() => {
  return styled.div``;
})();
