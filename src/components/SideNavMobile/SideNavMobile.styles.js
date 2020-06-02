// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const MobileNavWrapper: ComponentType<*> = (() => {
  return styled.div`
    position: relative;
    margin-top: 12px;
    @media only screen and (min-width: 40.0625em) {
      display: none;
    }
  `;
})();

export const MobileNavTogglerWrapper: ComponentType<*> = (() => {
  return styled.div`
    position: absolute;
    top: -72px;
    right: 12px;
  `;
})();

export const MobileNavToggler: ComponentType<*> = (() => {
  return styled.button`
  `;
})();
