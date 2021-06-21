// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const SideNav: ComponentType<*> =

    styled
        .nav
        .attrs(({ className, ...props }) => ({
            className: `moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 ${ className }`,
            role: "navigation",
            ...props
        }))`
            max-width: 200px;
            margin-right: 0;
        `;


export const SideNavMainContainer: ComponentType<*> =

    styled
        .ul
        .attrs(({ className, ...props }) => ({
            className: `${ className } moj-side-navigation__list`,
            ...props
        }))`
            padding: 0;
            margin: 0;
            list-style: none;
        `;


export const SideNavSecondaryContainer: ComponentType<*> = ({ className, ...props }) => (

  <SideNavMainContainer
      className={ `${className} govuk-!-font-size-14 govuk-!-margin-left-0` }
      { ...props }/>

);


export const SideNavListItem: ComponentType<*> =
    styled
        .li
        .attrs(({ className, ...props }) => ({
            className: `moj-side-navigation__item ${className}`,
            ...props
        }))``;


export const SideNavListSecondaryItem: ComponentType<*> =
    styled
        .li
        .attrs(({ className, ...props }) => ({
            className: `moj-side-navigation__item ${className}`,
            ...props
        }))`
            &.moj-side-navigation__item--active > a {
                padding-top: 5px !important;
                padding-bottom: 5px !important;
            }
            
            a {
                padding-bottom: 0 !important;
                padding-top: 0 !important;
            }
            
            padding-bottom: 5px;
            margin-bottom: 5px;
        `;


export const SectionBreak: ComponentType<*> =
    styled
        .hr
        .attrs(({ className, ...props }) => ({
            className: `govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible ${className}`,
            ...props
        }))``;
