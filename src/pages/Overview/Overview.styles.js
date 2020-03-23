// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 60px;
    margin-top: 45px;
    margin-bottom: 40px;

    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;
})();
