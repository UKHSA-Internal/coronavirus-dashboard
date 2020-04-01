// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

import isIE from 'isIE';

export const Map: ComponentType<*> = (() => {
  return styled.div`
    grid-column: span 3;
    height: 600px;
    width: 100%;
    border: 1px solid #0B0C0C;

    ${isIE() ? `
      width: 48%;
    ` : ''}
  `;
})();
