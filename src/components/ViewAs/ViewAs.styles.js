// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

import isIE from 'isIE';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column: 1/-1;

    & .govuk-form-group {
      margin-bottom: 0;
    }

    ${isIE() ? `
      width: 100%;
    ` : ''}
  `;
})();
