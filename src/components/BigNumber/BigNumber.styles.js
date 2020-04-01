// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

import isIE from 'isIE';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #b1b4b6;
    padding-top: 20px;
    grid-column: span 2;

    ${isIE() ? `
      width: 32%;
    ` : ''}
  `;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.div`
    height: 2.75rem;
    font-size: 1.19rem;
    margin-bottom: 5px;
  `;
})();

export const Number: ComponentType<*> = (() => {
  return styled.div`
    font-size: 2.25rem;
    margin-bottom: 10px;
  `;
})();

export const PercentageChange: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 0;
    font-size: 18px;
  `;
})();

export const Triangle: ComponentType<*> = (() => {
  return styled.div``;
})();

export const Subtext: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 0;
  `;
})();
