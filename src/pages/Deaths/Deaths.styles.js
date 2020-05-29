// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const FlexContainer: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-flow: row wrap;
    grid-column: 1/-1;
    margin: 0 -10px;

    & .govuk-back-link {
      width: fit-content;
    }

    & a {
      margin-bottom: 45px;
    }

    @media only screen and (max-width: 768px) {
      grid-column: span 2;
    }
  `;
})();
