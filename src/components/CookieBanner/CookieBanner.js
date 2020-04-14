/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

import type { Props } from './CookieBanner.types.js';

const deleteCookies = () => {
  document.cookie = "_ga= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=.data.gov.uk";
  document.cookie = "_gid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=.data.gov.uk";
  document.cookie = "_gat= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=.data.gov.uk";
};

const setCookies = () => {
  window.ga('create', 'UA-161400643-1', 'auto');
  window.ga('set', 'anonymizeIp', true);
  window.ga('set', 'allowAdFeatures', false);
  window.ga('create', 'UA-145652997-1', 'auto', 'govuk_shared', {'allowLinker': true});
  window.ga('govuk_shared.require', 'linker');
  window.ga('govuk_shared.set', 'anonymizeIp', true);
  window.ga('govuk_shared.set', 'allowAdFeatures', false);
  window.ga('govuk_shared.linker:autoLink', ['www.gov.uk', 'coronavirus.data.gov.uk']);
  window.ga('send', 'pageview');
  window.ga('govuk_shared.send', 'pageview')
};

const CookieBanner: ComponentType<Props> = ({}: Props) => {
  const [cookieState, setCookieState] = useState('unread');

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const cookiesPreferencesSet = cookies.find(c => c.trim().startsWith('cookies_preferences_set'))?.split('=')?.[1];

    if (cookiesPreferencesSet === 'true') {
      const cookiesPolicyRaw = cookies.find(c => c.trim().startsWith('cookies_policy'))?.split('=')?.[1];
      if (cookiesPolicyRaw) {
        const cookiesPolicy = JSON.parse(cookiesPolicyRaw);

        if (!cookiesPolicy.usage) {
          deleteCookies();
        } else {
          setCookies();
        }
      }
      setCookieState('set');
    } else {
      document.cookie = 'cookies_policy={"essential":true,"usage":false}';
      setCookieState('unset');
    }
  }, []);

  const handleAccept = () => {
    document.cookie = 'cookies_preferences_set=true';
    document.cookie = 'cookies_policy={"essential":true,"usage":true}';
    setCookies();
    setCookieState('accept');
  };

  const handleDeny = () => {
    document.cookie = 'cookies_preferences_set=true';
    document.cookie = 'cookies_policy={"essential":true,"usage":false}';
    deleteCookies();
    setCookieState('deny');
  };

  const handleHide = () => {
    setCookieState('set');
  };

  if (cookieState === 'unset') {
    return (
      <div id="global-cookie-message" className="gem-c-cookie-banner govuk-clearfix" data-module="cookie-banner" role="region" aria-label="cookie banner" data-nosnippet="" style={{ display: 'block' }}>
        <div className="gem-c-cookie-banner__wrapper govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="gem-c-cookie-banner__message">
                <h2 className="govuk-heading-m">Can we store analytics cookies on your device?</h2>
                <p className="govuk-body">Analytics cookies help us understand how our website is being used.</p>
              </div>
              <div className="gem-c-cookie-banner__buttons gem-c-cookie-banner__buttons--flex">
                <button className="gem-c-button govuk-button gem-c-button--inline" type="submit" data-module="track-click" data-accept-cookies="true" data-track-category="cookieBanner" onClick={handleAccept}>Yes</button>
                <button className="gem-c-button govuk-button gem-c-button--inline" type="submit" data-module="track-click" data-hide-cookie-banner="true" data-track-category="cookieBanner" onClick={handleDeny}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cookieState === 'accept') {
    return (
      <div id="global-cookie-message" className="gem-c-cookie-banner govuk-clearfix" data-module="cookie-banner" role="region" aria-label="cookie banner" data-nosnippet="" style={{ display: 'block' }}>
        <div className="gem-c-cookie-banner__confirmation govuk-width-container" tabindex="-1">
          <p className="gem-c-cookie-banner__confirmation-message govuk-body">You’ve accepted all cookies.</p>
          <button className="gem-c-cookie-banner__hide-button govuk-link" data-hide-cookie-banner="true" data-module="track-click" data-track-category="cookieBanner" data-track-action="Hide cookie banner" onClick={handleHide}>Hide</button>
        </div>
      </div>
    );
  }

  return null;
};

export default CookieBanner;
