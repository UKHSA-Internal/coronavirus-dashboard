// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const MobileNavWrapper: ComponentType<*> = (() => {
  return styled.div`
    position: relative;
    margin-top: 12px;
  `;
})();

export const MobileNavTogglerWrapper: ComponentType<*> = (() => {
  return styled.div`
    position: absolute;
    top: -80px;
    right: 12px;
  `;
})();


export const MobileNavToggler: ComponentType<*> =
    styled
        .button
        .attrs(({ className="", ...props }) => ({
          className: `govuk-button ${className}`,
          ...props
        }))`
            position: absolute;
            display: inline-block;
            background: transparent;
            color: white;
            border: 2px solid white;
            top: -15px;
            right: -4px;
            width: max-content !important;
            padding: .3rem .5rem;
              
            &:active,
            &:focus, 
            &:hover {
              position: absolute;
              display: inline-block;
              background: transparent;
              color: black;
              border: 2px solid white;
              top: -15px;
              right: -4px;
              width: max-content !important;
              padding: .3rem .5rem;
            }
        `;


export const SideNav = ({ className="", ...props }) => (
  <nav role={ 'navigation' }
       className={ `moj-side-navigation moj-side-navigation-mobile ${className}` } { ...props }/>
);


export const SideNavList: ComponentType<*> = (() => {

  const Node = styled.ul`
      padding: 0;
      margin: 0;
      list-style: none;
  `;

  return ({ className="", ...props }) => (
      <Node className={ `moj-side-navigation__list ${className}` } { ...props }/>
  );

})();


export const SideNavListItem = ({ className="", ...props }) => (
  <li className={ `moj-side-navigation__item ${className}` } { ...props }/>
);


export const SectionBreak = ({ className="", ...props }) => (
  <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible ${className}` } { ...props }/>
);
