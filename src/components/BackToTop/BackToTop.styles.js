// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const OverlayContainer: ComponentType<*> = (() => {
  return styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: white;
  z-index: 1234567;
   `;
})();

export const InlineContainer: ComponentType<*> = (() => {
  return styled.div``;
})();
