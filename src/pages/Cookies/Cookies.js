// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { Redirect } from 'react-router';

import type { Props } from './Cookies.types';
import * as Styles from './Cookies.styles';
import PageTitle from 'components/PageTitle';

const setCookies = () => {
  window.ga('create', 'UA-161400643-1', 'auto');
  window.ga('set', 'anonymizeIp', true);
  window.ga('set', 'allowAdFeatures', false);
  window.ga('create', 'UA-145652997-1', 'auto', 'govuk_shared', { 'allowLinker': true });
  window.ga('govuk_shared.require', 'linker');
  window.ga('govuk_shared.set', 'anonymizeIp', true);
  window.ga('govuk_shared.set', 'allowAdFeatures', false);
  window.ga('govuk_shared.linker:autoLink', ['www.gov.uk']);
  window.ga('send', 'pageview');
  window.ga('govuk_shared.send', 'pageview')
};

const Cookies: ComponentType<Props> = ({ }: Props) => {
  const [cookieState, setCookieState] = useState('unread');

  const handleAccept = () => {
    document.cookie = 'cookies_preferences_set=true';
    document.cookie = 'cookies_policy={"essential":true,"usage":true}';
    setCookies();
    setCookieState('accept');
  };

  if (cookieState === 'accept') {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Styles.Container className={"govuk-width-container"}>
      <PageTitle title={"Cookies"} />
      <p className={"govuk-body"}>
        Cookies are files saved on your phone, tablet or computer when you visit a website.
      </p>
      <p className={"govuk-body"}>
        We use cookies to store information about how you use the data.gov.uk website, such as the pages you visit.
      </p>

      <Styles.SectionHeader className={"govuk-heading-m"}>
        Cookie settings
      </Styles.SectionHeader>

      <p className={"govuk-body"}>
        We use 2 types of cookie. You can choose which cookies you're happy for us to use.
      </p>

      <Styles.SectionHeader className={"govuk-heading-m"}>
        Cookies that measure website use
      </Styles.SectionHeader>

      <p className={"govuk-body"}>
        We use Google Analytics to measure how you use the website so we can improve it based on user needs. Google Analytics sets cookies that store anonymised information about:
        <ul className="cookie-settings__list">
          <li>how you got to the site</li>
          <li>the pages you visit on data.gov.uk, and how long you spend on each page</li>
          <li>what you click on while you're visiting the site</li>
        </ul>
      </p>

      <p className={"govuk-body"}>
        We do not allow Google to use or share the data about how you use this site.
      </p>

      <p className={"govuk-body"}>
        These are the Google Analytics cookies we’ll use:
      </p>

      <p className={"govuk-body"}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga, _gid</td>
                <td>These help us count how many people visit data.gov.uk by tracking if you’ve visited before</td>
                <td>_ga 2 years<br />_gid 24 hours</td>
              </tr>
              <tr>
                <td>_gat</td>
                <td>Used to manage the rate at which page view requests are made</td>
                <td>10 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </p>

      <Styles.SectionHeader className={"govuk-heading-m"}>
        Strictly necessary cookies
      </Styles.SectionHeader>

      <p className={"govuk-body"}>
        These essential cookies do things like remember your cookie preferences, so we don't ask for them again.
      </p>

      <p className={"govuk-body"}>
        They always need to be on.
      </p>

      <p className={"govuk-body"}>
        <button className="gem-c-button govuk-button" type="submit" data-module="track-click" data-accept-cookies="true" data-track-category="cookies" onClick={handleAccept}>Save changes</button>
      </p>
    </Styles.Container>
  );
};

export default Cookies
