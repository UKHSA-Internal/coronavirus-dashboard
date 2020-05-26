// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    @media only screen and (max-width: 768px) {

      .govuk-tabs__panel {
        max-height: 75vh;
        padding: 0em 1em;
      }

      .govuk-table__header {
        padding-top: 0px !important;
      }
    }
  `;
})();

export const Content: ComponentType<*> = (() => {
  return styled.main``
})();

