// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 60px;
    margin-top: 45px;
    margin-bottom: 40px;
    max-width: 1045px;

    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    ${addIECss(css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    `)}
  `;
})();


export const P: ComponentType<*> = (() => {
  return styled.p`
    grid-column: span 1/-1
  `;
})();


