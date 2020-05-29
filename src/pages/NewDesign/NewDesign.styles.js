// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
    return styled.div ``;
})();

export const FlexContainer: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-flow: row wrap;
    grid-column: 1/-1;

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

export const Content: ComponentType<*> = (() => {
    return styled.main ``;
})();

export const SectionHeader: ComponentType<*> = (() => {
    return styled.h2``;
})();

export const Body: ComponentType<*> = (() => {
    return styled.p``;
})();