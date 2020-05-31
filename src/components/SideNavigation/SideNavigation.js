// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './SideNavigation.types';
import {
    Container,
    FooterLink,
    NavList,
    NavListItem
} from './SideNavigation.styles';


const SideNavigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {
    const layout = useResponsiveLayout(768);

    if (layout === 'desktop') {
        return (
            <nav className="moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2" aria-label="Side navigation">
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
            </nav>
        );
    }
  return (
    <Container className="govuk-header__container--full-width">
      <NavList>
        <NavListItem active={!pathname.includes('about') && !pathname.includes('region')}>
          <FooterLink className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/" dataTopnav="Data dashboard">Data dashboard</FooterLink>
        </NavListItem>
        <NavListItem active={pathname.includes('region')}>
          <FooterLink className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/region" dataTopnav="Regional">Regional</FooterLink>
        </NavListItem>
        <NavListItem active={pathname.includes('about')}>
          <FooterLink className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/about" dataTopnav="About the data">About the data</FooterLink>
        </NavListItem>
      </NavList>
    </Container>
  );
};

export default withRouter(SideNavigation);
