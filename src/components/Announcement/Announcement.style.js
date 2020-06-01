// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
    return styled.main`
      grid-column: -1/1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      border: 5px solid #1d70b8;
      margin-top: 1rem;
      
      @media only screen and (max-width: 768px) {
        grid-column: span 3;
      }
      
      &>*:first-child {
        margin-top: 0;
      }
      
      &>*:last-child {
        margin-bottom: 0;
      }
    `;
})();