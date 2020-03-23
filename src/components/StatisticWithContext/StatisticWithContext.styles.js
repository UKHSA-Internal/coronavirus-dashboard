// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div``;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.span`
    font-size: 1.19rem;
  `;
})();

export const Number: ComponentType<*> = (() => {
  return styled.h2`
    margin: 0;
    margin-top: 5px;
  `;
})();
