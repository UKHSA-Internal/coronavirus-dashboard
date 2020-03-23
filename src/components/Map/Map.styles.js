// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Map: ComponentType<*> = (() => {
  return styled.div`
    grid-column: span 3;
    height: 600px;
    width: 100%;
    border: 1px solid #0B0C0C;
  `;
})();
