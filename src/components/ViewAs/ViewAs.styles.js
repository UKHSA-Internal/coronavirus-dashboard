// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column: 1/-1;

    & .govuk-form-group {
      margin-bottom: 0;
    }

    ${addIECss(css`
      width: 100%;
    `)}
  `;
})();
