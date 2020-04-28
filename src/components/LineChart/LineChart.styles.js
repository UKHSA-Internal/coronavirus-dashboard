// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 2/-2;
    display: flex;
    flex-direction: column;

    & > span {
      font-weight: normal;
    }
    
    @media only screen and (max-width: 768px) {
      grid-column: 1/-1;
    }

    ${addIECss(css`
      width: 80%;
    `)}
  `;
})();

export const Chart : ComponentType<*> = (() => {
  return styled.div`
    height: 250px;
    margin-top: 15px;
    position: relative;
    left: -8px;
  `;
})();
