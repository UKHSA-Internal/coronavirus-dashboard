// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import type { Props } from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {
  return (
    <Styles.Container className="govuk-header__container--full-width">
    {/* <Styles.Container className="govuk-width-container"> */}
      <Styles.NavList>
        <Styles.NavListItem active={pathname.includes('uk')}>
          <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/uk/" dataTopnav="Overview">UK cases</Styles.Link>
        </Styles.NavListItem>
        <Styles.NavListItem active={pathname.includes('regional')}>
          <Styles.Link className="govuk-link govuk-link--no-visited-state app-navigation__link" href="/regional/" dataTopnav="Regional">Regional cases</Styles.Link>
        </Styles.NavListItem>
      </Styles.NavList>
    </Styles.Container>
  );
};

export default withRouter(Navigation);
