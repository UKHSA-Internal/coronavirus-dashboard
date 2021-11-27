/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { Link } from "react-router-dom";

import type { Props } from './CookieBanner.types.js';

import { setCookies, deleteCookies, handleCookieAccept } from "common/utils/cookies";

import Cookies from "js-cookie";


const CookieBanner: ComponentType<Props> = ({ ...props }: Props) => {

    const [cookieStateIsSet, setCookieStateIsSet] = useState(null);
    const [cookieAccepted, setCookieAccepted] = useState(null);

    useEffect(() => {

        if ( cookieAccepted ) {
            handleCookieAccept(true);
            console.info("Cookies accepted.");
            setCookieStateIsSet(true);
        }
        else if ( cookieAccepted === false )  {
            handleCookieAccept(false);
            console.info("Cookies declined.");
            setCookieStateIsSet(true);
        }

    }, [ cookieAccepted ]);

    useEffect(() => {

        const cookiePreference = Cookies.get('cookies_preferences_set_21_3');

        if ( cookiePreference === 'true' ) {
            console.info("Cookies preferences have been set.");

            const cookiePolicyRaw = Cookies.get('cookies_policy_21_3');

            if ( !cookiePolicyRaw ) {
                Cookies.remove("cookies_preferences_set_21_3");
                setCookieStateIsSet(false)
                console.info("Cookies policy has not been set.");
            }
            else {
                console.info("Cookies policy has been set.");
                const cookiePolicy = JSON.parse(cookiePolicyRaw);

                if ( cookiePolicy.usage === false || !cookiePolicy.usage ) {
                    window['ga-disable-UA-161400643-2'] = true;
                    window['ga-disable-UA-145652997-1'] = true;
                    deleteCookies();
                    console.info("Cookies are disabled.");
                }
                else {
                    setCookies();
                    console.info("Cookies successfully set.");
                }

                setCookieStateIsSet(true);
            }
        }
        else {
            setCookieStateIsSet(false);
            console.info("Cookies preferences have not been set.");
        }

    }, [ cookieAccepted ]);


    if ( cookieStateIsSet === null ) return null;

    if ( cookieStateIsSet && cookieAccepted !== null ) {
        return (
            <div { ...props } id="global-cookie-message" className="gem-c-cookie-banner govuk-clearfix"
                 data-module="cookie-banner" role="region" aria-label="cookie banner" data-nosnippet=""
                 style={ { display: 'block' } }>
                <div className="gem-c-cookie-banner__confirmation govuk-width-container" tabIndex="-1">
                    <p className="gem-c-cookie-banner__confirmation-message govuk-body">
                        You’ve { cookieAccepted ? "accepted" : "rejected" } additional cookies.
                        You can <Link to="/details/cookies" className="govuk-link">change
                        your cookie settings</Link> at any time.
                    </p>
                    <button className="gem-c-cookie-banner__hide-button govuk-link" data-hide-cookie-banner="true"
                            data-module="track-click" data-track-category="cookieBanner"
                            data-track-action="Hide cookie banner" onClick={ () => setCookieAccepted(null) }>
                        Hide
                    </button>
                </div>
            </div>
        );
    }


    if ( !cookieStateIsSet ) {
        return <div className="govuk-cookie-banner " role="region" aria-label="Cookies on the UK Coronavirus Dashboard">
            <div className={ "govuk-width-container" }>
                <div className="govuk-cookie-banner__message govuk-!-width-two-thirds">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <h2 className="govuk-cookie-banner__heading govuk-heading-m govuk-!-margin-top-2 govuk-!-margin-left-1">
                                Cookies on the UK Coronavirus Dashboard
                            </h2>

                            <div className="govuk-cookie-banner__content">
                                <p className={ "govuk-body" }>We use some essential cookies to make this service work.</p>
                                <p className={ "govuk-body" }>
                                    We’d like to set additional cookies so we can remember your settings, understand how
                                    people use the service and make improvements.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="govuk-button-group">
                        <button className="govuk-button" type="submit"
                                data-module="track-click" data-accept-cookies="true"
                                data-track-category="cookieBanner"
                                style={{ maxWidth: '50%' }}
                                onClick={ () => setCookieAccepted(true) }>
                            Accept additional cookies
                        </button>
                        <button className="govuk-button"
                              style={{ maxWidth: '50%' }}
                              type="submit" data-module="track-click" data-set-cookie-preferences="true"
                              data-track-category="cookieBanner" onClick={ () => setCookieAccepted(false) }>
                            Reject additional cookies
                        </button>
                        <Link to="/details/cookies" className="govuk-link govuk-body">View cookies</Link>
                    </div>
                </div>
            </div>
        </div>
    }

    return null;

};


export default CookieBanner;
