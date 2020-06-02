// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './SideNavMobile.types';
import {
    Container,
    FooterLink,
    NavList,
    NavListItem
} from './SideNavMobile.styles';


const SideNavMobile: ComponentType<Props> = ({ location: { pathname }}: Props) => {
    const [menuState, setMenuState] = useState(false);

        return (
            <Fragment>
            <div class="app-header-mobile-nav-toggler-wrapper">
      <button id="app-mobile-nav-toggler" class="govuk-button app-header-mobile-nav-toggler js-app-mobile-nav-toggler" aria-controls="app-mobile-nav" aria-expanded="false" onClick={ () => setMenuState(!menuState) }>
        Menu
      </button>
    </div>
    { menuState ?
            <nav className="moj-side-navigation moj-side-navigation-mobile govuk-!-padding-right-4 govuk-!-padding-top-2" aria-label="Side navigation">
                <ul className="moj-side-navigation__list">
                    <li className={`moj-side-navigation__item ${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "/" } aria-current="location">Daily summary</Link>
                    </li>

                    <li className={`moj-side-navigation__item ${pathname === '/tests' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "tests" }>Tests</Link>
                    </li>

                    <li className={`moj-side-navigation__item ${pathname === '/cases' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "cases" }>Cases</Link>
                    </li>

                    <li className={`moj-side-navigation__item ${pathname === '/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "healthcare" }>Healthcare</Link>
                    </li>

                    <li className={`moj-side-navigation__item ${pathname === '/deaths' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "deaths" }>Deaths</Link>
                    </li>

                    <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible" />

                    <li className={`moj-side-navigation__item ${pathname === '/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                        <Link to={ "about-data" }>About the data</Link>
                    </li>
                </ul>
            </nav> : '' }
            </Fragment>
        );


};

export default withRouter(SideNavMobile);
