// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';
import { SideNavList } from "../SideNavMobile/SideNavMobile.styles";


export const SideNav: ComponentType<*> = (() => {

    const Node = styled.nav`
        max-width: 200px;
        margin-right: 0;
    `;

    return ({ className, ...props }) =>
        <Node className={ `moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 ${className}` }
              { ...props }/>
})();


export const SideNavMainContainer: ComponentType<*> = (() => {

    const Node = styled.ul`
        padding: 0;
        margin: 0;
        list-style: none;
    `;

    return ({ className, ...props }) =>
        <Node className={ `${ className } moj-side-navigation__list` }
              { ...props }/>

})();


export const SideNavSecondaryContainer: ComponentType<*> = ({ className, ...props }) => (

  <SideNavMainContainer
      className={ `${className} govuk-!-font-size-14 govuk-!-margin-left-0` }
      { ...props }/>

);


export const SideNavListItem = ({ className, ...props }) => (
    <li className={ `moj-side-navigation__item ${className}` } { ...props }/>
);


export const SideNavListSecondaryItem = ({ className, ...props }) => (
    <SideNavListItem className={ `${className} govuk-!-margin-left-0 govuk-!-margin-bottom-0` } { ...props }/>
);


export const SectionBreak = ({ className, ...props }) => (
  <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible ${className}` } { ...props }/>
);
