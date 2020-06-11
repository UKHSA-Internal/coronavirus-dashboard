// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';
import React from "react";


export const MainContainer: ComponentType<*> = (() => {
  const
    classes = 'sticky-header govuk-!-padding-top-3',
    Node = styled.div`
      background-color: rgba(255, 255, 255, 0.95);
    `;

  return ({ className, ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const HeaderContainer = ({ className, ...props }) => (
  <div className={ `util-flex util-flex-justify-between util-flex-wrap util-flex-align-items-center ${className}` } { ...props }/>
);


export const Title = ({ className, ...props }) => (
  <h1 className={ `govuk-caption-l govuk-!-margin-0 ${className}` } { ...props }/>
);


export const CollapsibleLinkContainer: ComponentType<*> = (() => {
  return styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-self: flex-end;
  `
})();


export const CollapsibleLink: ComponentType<*> = (() => {
  const
    classes = 'govuk-!-margin-right-6',
    Node = styled.button`
      cursor: pointer;

      &,
      & > * {
        color: #1d70b8;
      }
    `;

  return ({ className, ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const TriangleRight: ComponentType<*> = (() => {
  const
    classes = 'govuk-body-s',
    Node = styled.span`
      margin-right: 5px;
      margin-bottom: 0;

      &::before {
        content: "►";
      }
    `;

  return ({ className="", ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const TriangleDown: ComponentType<*> = (() => {
  const
    classes = 'govuk-body-s',
    Node = styled.span`
      margin-right: 5px;
      margin-bottom: 0;

      &::before {
        content: "▼";
      }
    `;

  return ({ className="", ...props }) =>
      <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const CollapsibleLinkText = ({ className, ...props }) => (
  <span className={ `govuk-body-s govuk-body govuk-!-margin-bottom-0 ${className}` } { ...props }/>
);


export const SectionBreak = ({ className, ...props }) => (
  <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible ${className}` } { ...props }/>
);


export const Select: ComponentType<*> = (() => {

  const Node = styled.select`
    width: 100%;
  `;

  return ({ ...props }) =>
      <div className={ "govuk-grid-column-one-quarter" }>
        <div className={ "govuk-form-group govuk-!-margin-bottom-0" }>
          <Node { ...props }/>
        </div>
      </div>
})();
