// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1/-1;
  `;
})();

export const Region: ComponentType<*> = (() => {
  return styled.h2`
    margin: 0;
  `;
})();

export const LastUpdated: ComponentType<*> = (() => {
  return styled.span``;
})();
