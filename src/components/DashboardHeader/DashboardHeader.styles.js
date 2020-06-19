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


export const HeaderContainer: ComponentType<*> = (() => {

    return styled.div`
        display: flex;
        justify-content: space-between;
    `;

})();


export const Title = ({ className, ...props }) => (
  <h1 className={ `govuk-caption-l govuk-!-margin-0 ${className}` } { ...props }/>
);


export const CurrentLocation: ComponentType<*> = (() => {

    return styled.span`
      font-weight: normal;
    `

})();


export const CollapsibleLinkContainer: ComponentType<*> = (() => {
  return styled.div`
  display: flex;
  flex-wrap: wrap;

  // justify-self: space-between;
  `
})();


export const CollapsibleLink: ComponentType<*> = (() => {
  const
    Node = styled.button`
      cursor: pointer;
      font-weight: bold;
      outline: none;
      color: #1d70b8;
      justify-self: flex-end;
      
      &::before {
        padding-right: 4px;
      }
      
      &.closed::before {
        content: "►";
      }

      &.opened::before {
        content: "▼";
      }
    `;

  return ({ className="", ...props }) =>
    <Node className={ `govuk-body-s govuk-body govuk-!-margin-bottom-0 ${ className }` }
          htmlType={ "button" }
          { ...props }/>
})();


export const LocationPickerContainer: ComponentType<*> = (() => {

    return styled.div`
        width: 100%;
        justify-self: stretch;
    `

})()


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
