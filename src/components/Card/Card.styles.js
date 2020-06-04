// @flow

import React from "react";
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const CardBody: ComponentType<*> = (() => {

  const node = styled.article`
    flex: 1 1 43%;
    padding: 20px;
    margin: 15px;
    background-color: #f8f8f8;
    border: 1px #f3f2f1 solid;
  `;

  node.className = 'dashboard-panel'

  return node

})();

export const FullWidthCardBody: ComponentType<*> = (() => {

  const node = styled.article`
    flex: 1 1 auto;
    padding: 20px;
    margin-bottom: 30px;
    background-color: #f8f8f8;
    border: 1px #f3f2f1 solid;
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
