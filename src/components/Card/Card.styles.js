// @flow

import React from "react";
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const HalfCard: ComponentType<*> = (() => {

  return styled.article`
    flex: 1 1 43%;
    padding: 20px;
    margin: 15px;
    background-color: #f8f8f8;
    border: 1px #f3f2f1 solid;
  `;

})();


export const HalfCardHeader: ComponentType<*> = (() => {

    return styled.header`
    `;

})();


export const HalfCardBody: ComponentType<*> = (() => {

    return styled.div`
      margin: 0 -15px;
    `;

})();


export const FullCard: ComponentType<*> = (() => {

  return styled.article`
    flex: 1 1 auto;
    padding: 20px;
    margin-bottom: 30px;
    background-color: #f8f8f8;
    border: 1px #f3f2f1 solid;
  `;

})();


export const Section: ComponentType<*> = (() => {

    return styled.div`
      flex: 1 1 43%;
      margin: 0 15px;
    `;

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


export const DataColour: ComponentType<*> = (() => {

  return styled.div`
    float: left;
    width: 10px;
    height: 10px;
    margin: 6px 6px 6px 0;
    background: ${props => props.colour};
    border: 1px solid #000;
    box-shadow:inset 0px 0px 0px 1px #ffffff;
  `;

})();


export const DataLabel: ComponentType<*> = (() => {

  return styled.div`
    margin-left: 16px;
  `;

})();


export const DataValue: ComponentType<*> = (() => {

  return styled.div`
    margin-left: 16px;
  `;

})();

