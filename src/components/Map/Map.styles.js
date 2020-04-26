// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Map: ComponentType<*> = (() => {
  return styled.div`
    grid-column: span 3;
    height: 600px;
    width: 100%;
    border: 1px solid #0B0C0C;

    ${addIECss(css`
      width: 48%;
    `)}
  `;
})();

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: grid;
    height: 600px;

    ${addIECss(css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `)}
  `;
})();

export const P: ComponentType<*> = (() => {
  return styled.p`
    margin: 2em;
    align-self: center;
    justify-self: center;
  `;
})();