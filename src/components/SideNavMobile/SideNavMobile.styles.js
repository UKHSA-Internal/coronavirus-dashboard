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
    top: -72px;
    right: 12px;
  `;
})();


export const MobileNavToggler = ({ className, ...props }) => (
  <button className={ `govuk-button ${className}` } { ...props }/>
);


export const SideNav = ({ className, ...props }) => (
  <nav className={ `moj-side-navigation moj-side-navigation-mobile ${className}` } { ...props }/>
);


export const SideNavList = ({ className, ...props }) => (
  <ul className={ `moj-side-navigation__list ${className}` } { ...props }/>
);


export const SideNavListItem = ({ className, ...props }) => (
  <li className={ `moj-side-navigation__item ${className}` } { ...props }/>
);


export const SectionBreak = ({ className, ...props }) => (
  <hr className={ `govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible ${className}` } { ...props }/>
);
