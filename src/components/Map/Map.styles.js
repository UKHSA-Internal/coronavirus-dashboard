// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Map: ComponentType<*> = (() => {
  return styled.div`
    grid-column: span 3;
    height: 600px;
    width: 100%;
    border: 1px solid #0B0C0C;

    ${addIECss(css`
      width: 48%;
    `)}
  `;
})();
