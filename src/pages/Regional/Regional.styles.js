// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Container: ComponentType<*> = (() => {
  return styled.div``;
})();

export const Content: ComponentType<*> = (() => {
  return styled.main``
})();

export const TwoThirdsFixed: ComponentType<*> = (() => {
  return styled.div`
    max-width: 700px;
  `;
})();


export const FullWidth: ComponentType<*> = (() => {
  return styled.div``
})(); // FullWidth


export const P: ComponentType<*> = (() => {
  return styled.p``;
})();


