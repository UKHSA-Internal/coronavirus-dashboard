// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    grid-column: span 3;
    border-top: 1px solid #0B0C0C;
    padding-top: 20px;
  `;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.div`
    margin-bottom: 10px;
  `;
})();

export const Title: ComponentType<*> = (() => {
  return styled.div`
    margin-bottom: 20px;
  `;
})();

export const Chart: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    width: 100%;
  `;
})();

export const BarContainer: ComponentType<*> = (() => {
  const getWidth = ({ count, total }) => (count / total) * 85;
  return styled.div`
    width: ${getWidth}%;
    display: flex;
    flex-direction: column;
  `;
})();

export const Bar: ComponentType<*> = (() => {
  const getBackgroundColor = ({ color }) => color;
  return styled.div`
    height: 165px;
    width: 100%;
    background-color: ${getBackgroundColor};
    margin-bottom: 10px;
  `;
})();

export const Count: ComponentType<*> = (() => {
  return styled.span`
    font-weight: bold;
  `;
})();

export const Label: ComponentType<*> = (() => {
  return styled.span``;
})();
