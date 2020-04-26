// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';
import { Link as L } from 'react-router-dom';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1/4;
    height: 600px;

    @media only screen and (max-width: 768px) {
      height: unset;
    }

    & .govuk-tabs__panel {
      max-height: 485px;
      overflow: auto;

      @media only screen and (max-width: 768px) {
        max-height: none;
      }
    }
  `;
})();

export const Link: ComponentType<*> = (() => {
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
  `;
})();
