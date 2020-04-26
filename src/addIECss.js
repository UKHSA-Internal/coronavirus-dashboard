// @flow

import { css } from 'styled-components';

const addIECss = (cssValue: string) => css`
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    ${cssValue}
  }
  @supports (-ms-accelerator:true) {
    ${cssValue}
  }
  @supports (-ms-ime-align:auto) {
    ${cssValue}
  }
`;

export default addIECss;