// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Card: ComponentType<*> = (() => {
  return styled.div`
    flex: 1 1 auto;
    background-color: #f8f8f8;
    padding: 20px;
    border: 1px #f3f2f1 solid;
    margin: 10px;
  `;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 5px;
    font-size: 16px;
    color: #626a63;
  `;
})();

export const Title: ComponentType<*> = (() => {
  return styled.h1``;
})();

export const Subtitle: ComponentType<*> = (() => {
  return styled.span``;
})();
