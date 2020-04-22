// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.noscript`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
  `;
})();

export const TableWrapper: ComponentType<*> = (() => {
  return styled.div`
      max-height: 485px;
      overflow: auto;
    }
  `;
})();
