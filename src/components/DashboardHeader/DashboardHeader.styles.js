// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';
import React from "react";

export const Container: ComponentType<*> = (() => {
  return styled.nav`
    width: 100%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    display: block;

    &:after {
      content: "";
      display: block;
      clear: both;
    }
  `;
})();

export const NavList: ComponentType<*> = (() => {
  return styled.ul`
    max-width: 1015px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: -15px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    height: 50px;
  `;
})();

export const NavListItem: ComponentType<*> = (() => {
  const borderWidth = ({ active }) => active ? 4 : 0;
  return styled.li`
    list-style: none;
    box-sizing: border-box;
    display: block;
    position: relative;
    height: 50px;
    padding: 0 15px;
    float: left;
    line-height: 50px;
    border-bottom: ${borderWidth}px solid #1d70b8;
  `;
})();


export const HeaderContainer: ComponentType<*> = (() => {

  return styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  `

})();

export const Title: ComponentType<*> = (() => {

  const Node = styled.h2`
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-basis: auto;
  `;

  const Container = styled.div`
  padding-left: 0;
  `

  return ({ className="", ...props }) =>
      <Container>
        <Node className={ `govuk-caption-l ${className}` } {...props}/>
      </Container>
})();


export const CollapsibleLink: ComponentType<*> = (() => {

  return styled.button`
    display: inline-flex;
    outline: none;
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
    
  & > * {
    margin-left: 2rem;
  }
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