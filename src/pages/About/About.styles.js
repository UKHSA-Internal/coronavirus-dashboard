// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 45px;
    margin-bottom: 40px;
  `;
})();

export const SectionHeader: ComponentType<*> = (() => {
  return styled.h2``;
})();

export const Body: ComponentType<*> = (() => {
  return styled.h3``;
})();
