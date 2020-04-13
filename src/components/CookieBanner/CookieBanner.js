/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

import type { Props } from './CookieBanner.types.js';

const deleteCookies = () => {
  document.cookie = "_ga= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "_gid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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
            <div className=" govuk-grid-column-two-thirds">
              <div className="gem-c-cookie-banner__message">
                <span className="govuk-heading-m">Tell us whether you accept cookies</span>
                <p className="govuk-body">We use cookies to collect information about how you use coronavirus.data.gov.uk. We use this information to make the website work as well as possible and improve government services.</p>
              </div>
              <div className="gem-c-cookie-banner__buttons">
                <div className="gem-c-cookie-banner__button gem-c-cookie-banner__button-accept govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
                  
      
      
        <button className="gem-c-button govuk-button gem-c-button--inline" type="submit" data-module="track-click" data-accept-cookies="true" data-track-category="cookieBanner" data-track-action="Cookie banner accepted" onClick={handleAccept}>Accept all cookies</button>
      
      
                </div>
                <div className="gem-c-cookie-banner__button gem-c-cookie-banner__button-settings govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
                  
      
      
        <button className="gem-c-button govuk-button gem-c-button--inline" type="submit" data-module="track-click" data-accept-cookies="false" data-track-category="cookieBanner" data-track-action="Cookie banner denied" onClick={handleDeny}>Reject all cookies</button>
      
      
                </div>
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
          <p className="gem-c-cookie-banner__confirmation-message">
            You’ve accepted all cookies.
          </p>
          <button className="gem-c-cookie-banner__hide-button" data-hide-cookie-banner="true" data-module="track-click" data-track-category="cookieBanner" data-track-action="Hide cookie banner" onClick={handleHide}>Hide</button>
        </div>
      </div>
    );
  }

  if (cookieState === 'deny') {
    return (
      <div id="global-cookie-message" className="gem-c-cookie-banner govuk-clearfix" data-module="cookie-banner" role="region" aria-label="cookie banner" data-nosnippet="" style={{ display: 'block' }}>
        <div className="gem-c-cookie-banner__confirmation govuk-width-container" tabindex="-1">
          <p className="gem-c-cookie-banner__confirmation-message">
            You’ve rejected all cookies.
          </p>
          <button className="gem-c-cookie-banner__hide-button" data-hide-cookie-banner="true" data-module="track-click" data-track-category="cookieBanner" data-track-action="Hide cookie banner" onClick={handleHide}>Hide</button>
        </div>
      </div>
    );
  }

  return null;
};

export default CookieBanner;
