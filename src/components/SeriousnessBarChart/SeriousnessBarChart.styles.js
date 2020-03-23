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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    align-items: baseline;
  `;
})();

export const BarContainer: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
  `;
})();

export const Bar: ComponentType<*> = (() => {
  const getHeight = ({ percentage, max }) => (percentage / max) * 165;
  return styled.div`
    height: ${getHeight}px;
    width: 100%;
    background-color: #1D70B8;
    margin-bottom: 10px;
  `;
})();

export const Percentage: ComponentType<*> = (() => {
  return styled.span`
    font-weight: bold;
  `;
})();

export const Label: ComponentType<*> = (() => {
  return styled.span``;
})();


