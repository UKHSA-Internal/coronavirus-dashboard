// @flow

import React from "react";
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const CardBody: ComponentType<*> = (() => {

  const node = styled.article`
    flex: 1 1 auto;
    background-color: #f8f8f8;
    padding: 20px;
    border: 1px #f3f2f1 solid;
    margin: 10px;
    flex-basis: 43%;
  `;

  node.className = 'dashboard-panel'

  return node

})();

export const FullWidthCardBody: ComponentType<*> = (() => {

  const node = styled.article`
    flex: 1 1 auto;
    background-color: #f8f8f8;
    padding: 20px;
    border: 1px #f3f2f1 solid;
    margin: 10px;
    flex-basis: 100%;
  `;

  node.className = 'dashboard-panel'

  return node

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


export const CardDescription: ComponentType<*> = (() => {

  const Node = styled.small`
  display: flex;
  color: #626a6e;
  `;

  return ({ className="", ...props }) =>
      <Node className={ `govuk-body-s govuk-!-margin-bottom-0 ${className}` }
            {...props}/>

})();