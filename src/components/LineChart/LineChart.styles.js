// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: span 3;
    display: flex;
    flex-direction: column;

    & > span {
      font-weight: normal;
    }

    @media only screen and (max-width: 768px) {
      grid-column: 1/-1;
    }
  `;
})();

export const Chart : ComponentType<*> = (() => {
  return styled.div`
    height: 200px;
    margin-top: 15px;
    position: relative;
    left: -8px;
  `;
})();
