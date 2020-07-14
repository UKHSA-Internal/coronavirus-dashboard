// @flow

import React from "react";

import styled from 'styled-components';
import type { ComponentType } from 'react';

import CarretUp from "assets/caret-up.svg";
import CarretDown from "assets/caret-down.svg";


export const MainContainer: ComponentType<*> = (() => {
  const
    classes = 'sticky-header govuk-!-padding-top-3',
    Node = styled.div`
      background-color: rgba(255, 255, 255, 0.95);
      z-index: 999999;
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


export const Title: ComponentType<*> = (() => {

     const Node = styled.button` 
         display: a;
         cursor: pointer;
         background: url("${ CarretDown }");
         background-repeat: no-repeat;
         background-size: 20px 20px;
         padding-right: 20px;
         padding-left: 0;
         margin-left: 0;
         background-position: center right;
         color: #1d70b8;
         text-decoration: none;
         outline: none;
         
         &.open {
             background: url("${ CarretUp }");
             background-repeat: no-repeat;
             background-size: 20px 20px;
             padding-right: 20px;
             padding-left: 0;
             margin-left: 0;
             background-position: center right;
         }
     `

    return ({ pageName, className, hasPicker, ...props }) =>
        <h1 className={ `govuk-caption-l govuk-!-margin-0` }>
            { pageName }
            {
                hasPicker
                    ? <>&nbsp;<Node htmlType={ "button" }
                                    className={ className }
                                    { ...props }/>
                    </>
                    : null
            }
        </h1>

})();


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
