// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';
import React from "react";


export const HeaderContainer: ComponentType<*> = (() => {

  return styled.div`
  `

})();


export const MainContainer: ComponentType<*> = (() => {

  return styled.div`
    background-color: rgba(255, 255, 255, 0.95);
  `

})();


export const Title: ComponentType<*> = (() => {

  const Node = styled.h1`
  `;

  const Container = styled.div`
  `

  return ({ className="", ...props }) =>
      <Container>
        <Node className={ `govuk-caption-l govuk-!-margin-0 ${className}` } {...props}/>
      </Container>
})();


export const CollapsibleLink: ComponentType<*> = (() => {

  return styled.button`
    cursor: pointer;

    &, &>* {
      color: #1d70b8;
    }
  `

})();


export const CollapsibleLinkContainer: ComponentType<*> = (() => {

  return styled.div`
  display: inline-flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  `

})();


export const TriangleRight: ComponentType<*> = (() => {

  const Node = styled.span`
    margin-bottom: 0;
    margin-right: 5px;

    &:before {
      content: "►";
    }
  `;

  return ({ className="", ...props }) =>
      <Node className={ `govuk-body-s ${className}` }
            {...props}/>

})();


export const TriangleDown: ComponentType<*> = (() => {

  const Node = styled.span`
    margin-bottom: 0;
    margin-right: 5px;

    &:before {
      content: "▼";
    }
  `;

  return ({ className="", ...props }) =>
      <Node className={ `govuk-body-s ${className}` }
            {...props}/>

})();


export const Select: ComponentType<*> = (() => {

  const Node = styled.select`
  width: 100%
  `

  return ({ ...props }) =>
      <div className={ "govuk-grid-column-one-quarter" }>
        <div className={ "govuk-form-group govuk-!-margin-bottom-0" }>
          <Node {...props}/>
        </div>
      </div>

})();
