// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const SideNav = ({ className, ...props }) => (
  <nav className={ `moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 ${className}` } { ...props }/>
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
