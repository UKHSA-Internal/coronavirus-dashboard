// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1/4;
    height: 600px;

    & .govuk-tabs__panel {
      max-height: 485px;
      overflow: auto;

      @media only screen and (max-width: 768px) {
        max-height: none;
      }
    }
  `;
})();

export const DesktopName: ComponentType<*> = (() => {
  const getColor = ({ active }) => active ? '#0B0C0C' : '#1D70B8';
  const getFontWeight = ({ active }) => active ? 'bold' : 400;
  return styled.button`
    color: ${getColor};
    font-weight: ${getFontWeight};
    text-decoration: none;
    cursor: pointer;

    &:visited {
      color: ${getColor} !important; 
    }

    @media only screen and (max-width: 768px) {
      display: none;
    }
  `;
})();

export const MobileName: ComponentType<*> = (() => {
  return styled.span`
    @media only screen and (min-width: 768px) {
      display: none;
    }
  `;
})();