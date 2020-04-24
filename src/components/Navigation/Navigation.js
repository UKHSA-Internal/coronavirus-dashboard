// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {
  const layout = useResponsiveLayout(768);

  if (layout === 'desktop') {
    return (
      <Styles.Container className="govuk-header__container--full-width">
        <Styles.NavList>
          <Styles.NavListItem active={pathname === '/'}>
            <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/" dataTopnav="Data dashboard">Data dashboard</Styles.Link>
          </Styles.NavListItem>
          <Styles.NavListItem active={pathname.includes('about')}>
            <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/about" dataTopnav="About the data">About the data</Styles.Link>
          </Styles.NavListItem>
        </Styles.NavList>
      </Styles.Container>
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

export default withRouter(Navigation);
