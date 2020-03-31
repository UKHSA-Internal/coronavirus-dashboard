// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.p`
    grid-column: 1/-1;
    font-size: 0.75rem;
  `;
})();
