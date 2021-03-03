/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { Link } from "react-router-dom";

import type { Props } from './CookieBanner.types.js';

import { setCookies, deleteCookies } from "common/utils/cookies";


const CookieBanner: ComponentType<Props> = ({ ...props }: Props) => {

    const [cookieState, setCookieState] = useState('unread');

    useEffect(() => {

        const cookies = document.cookie.split(';');
        const cookiesPreferencesSet = cookies.find(c => c.trim().startsWith('cookies_preferences_set_21_3'))?.split('=')?.[1];

        if ( cookiesPreferencesSet === 'true' ) {
            const cookiesPolicyRaw = cookies.find(c => c.trim().startsWith('cookies_policy_21_3'))?.split('=')?.[1];
            if ( cookiesPolicyRaw ) {
                const cookiesPolicy = JSON.parse(decodeURIComponent(cookiesPolicyRaw));

                if ( !cookiesPolicy.usage ) {
                    deleteCookies();
                } else {
                    setCookies();
                }
            }
            setCookieState('set');
        } else {
            setCookieState('unset');
        }

    }, []);


    const handleSetCookiePreferences = () => {
        setCookieState('set-cookie-preferences');
    };

    const handleHide = () => {
        setCookieState('set');
    };

    if ( cookieState === 'unset' ) {
        return <div className="govuk-cookie-banner " role="region" aria-label="Cookies on the UK Coronavirus Dashboard">
            <div className={ "govuk-width-container" }>
                <div className="govuk-cookie-banner__message govuk-!-width-two-thirds">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <h2 className="govuk-cookie-banner__heading govuk-heading-m govuk-!-margin-top-2">
                                Cookies on the UK Coronavirus Dashboard
                            </h2>

                            <div className="govuk-cookie-banner__content">
                                <p className={ "govuk-body" }>We use some essential cookies to make this service
                                    work.</p>
                                <p className={ "govuk-body" }>
                                    We’d like to set additional cookies so we can remember your settings, understand how
                                    people use the
                                    service and make improvements.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="govuk-button-group">
                        <button className="gem-c-button govuk-button gem-c-button--inline" type="submit"
                                data-module="track-click" data-accept-cookies="true"
                                data-track-category="cookieBanner" onClick={ handleAccept }>Accept all cookies
                        </button>
                        <button className="gem-c-button govuk-button gem-c-button--inline"
                                type="submit" data-module="track-click" data-set-cookie-preferences="true"
                                data-track-category="cookieBanner" onClick={ handleSetCookiePreferences }>Set cookie
                            preferences
                        </button>
                        <Link to="/details/cookies" className="govuk-link govuk-body">View cookies</Link>
                    </div>
                </div>
            </div>
        </div>
    }

    if ( cookieState === 'accept' ) {
        return (
            <div { ...props } id="global-cookie-message" className="gem-c-cookie-banner govuk-clearfix"
                 data-module="cookie-banner" role="region" aria-label="cookie banner" data-nosnippet=""
                 style={ { display: 'block' } }>
                <div className="gem-c-cookie-banner__confirmation govuk-width-container" tabIndex="-1">
                    <p className="gem-c-cookie-banner__confirmation-message govuk-body">
                        You’ve accepted all cookies. You can <Link to="/details/cookies" className="govuk-link">change
                        your cookie settings</Link> at any time.
                    </p>
                    <button className="gem-c-cookie-banner__hide-button govuk-link" data-hide-cookie-banner="true"
                            data-module="track-click" data-track-category="cookieBanner"
                            data-track-action="Hide cookie banner" onClick={ handleHide }>Hide
                    </button>
                </div>
            </div>
        );
    }

    if ( cookieState === 'set-cookie-preferences' ) {
        window.location = "/details/cookies";
    }

    return null;

};


export default CookieBanner;
