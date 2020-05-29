// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './SideNavigation.types';
import * as Styles from './SideNavigation.styles';

const SideNavigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {
  const layout = useResponsiveLayout(768);

  if (layout === 'desktop') {
    return (
      <nav class="moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2" aria-label="Side navigation">
        <ul class="moj-side-navigation__list">
          <li class="moj-side-navigation__item moj-side-navigation__item--active">
            <a href="index" aria-current="location">Daily summary</a>
          </li>

          <li class="moj-side-navigation__item">
            <a href="tests">Tests</a>
          </li>

          <li class="moj-side-navigation__item">
            <a href="cases">Cases</a>
          </li>

          <li class="moj-side-navigation__item">
            <a href="healthcare">Healthcare</a>
          </li>

          <li class="moj-side-navigation__item">
            <a href="deaths">Deaths</a>
          </li>

          <hr class="govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible" />

          <li class="moj-side-navigation__item">
            <a href="about-data">About the data</a>
          </li>

        </ul>

      </nav>
    );
  }
  return (
    <Styles.Container className="govuk-header__container--full-width">
      <Styles.NavList>
        <Styles.NavListItem active={!pathname.includes('about') && !pathname.includes('region')}>
          <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/" dataTopnav="Data dashboard">Data dashboard</Styles.Link>
        </Styles.NavListItem>
        <Styles.NavListItem active={pathname.includes('region')}>
          <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/region" dataTopnav="Regional">Regional</Styles.Link>
        </Styles.NavListItem>
        <Styles.NavListItem active={pathname.includes('about')}>
          <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/about" dataTopnav="About the data">About the data</Styles.Link>
        </Styles.NavListItem>
      </Styles.NavList>
    </Styles.Container>
  );
};

export default withRouter(SideNavigation);
