// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
  `;
})();

export const Chart : ComponentType<*> = (() => {
  return styled.div`
    height: 200px;
    margin-top: 15px;
    position: relative;
    left: -8px;
  `;
})();

export const Summary: ComponentType<*> = (() => {
  return styled.div`
    display: grid;
    grid-template-columns: max-content auto;
    grid-column-gap: 10px;
    align-items: center;

    & span {
      margin-bottom: 0;
    }
  `;
})();

export const Circle: ComponentType<*> = (() => {
  return styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #249184;
  `;
})();