// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 2/-2;
    
    @media only screen and (max-width: 768px) {
      grid-column: 1/-1;
    }
  `;
})();
