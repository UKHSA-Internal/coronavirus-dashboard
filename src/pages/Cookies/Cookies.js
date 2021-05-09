// @flow

import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Cookies.types';
import {
    Article,
    Heading
} from './Cookies.styles';

import { deleteCookies, handleCookieAccept, setCookies } from "common/utils/cookies";

import Cookies from "js-cookie";


const CookiesUpdatedText = ({ cookieState }) => {

    if ( cookieState !== 'accept' ) return null;

    return <div className="cookie-settings__confirmation" data-cookie-confirmation="true">
        <section className="gem-c-notice govuk-!-margin-bottom-8" aria-label="Notice" aria-live="polite">
            <h2 className="gem-c-notice__title">Cookies on coronavirus.data.gov.uk</h2>
            <p className={"govuk-body"}>Your cookie settings were saved</p>
        </section>
    </div>

};


const CookiesPage: ComponentType<Props> = ({ }: Props) => {

    // const [preferenceSet, ]
    const [cookieState, setCookieState] = useState(null);

    useEffect(() => {
        const cookiePreference = Cookies.get('cookies_preferences_set_21_3');
        console.log(cookiePreference);
        console.log(cookieState);

        if ( cookiePreference === 'true' ) {
            const cookiePolicyRaw = Cookies.get('cookies_policy_21_3');
            console.log(cookiePolicyRaw);

            if ( !cookiePolicyRaw ) {
                Cookies.remove("cookies_preferences_set_21_3");
                setCookieState(true)
            }
            else {
                const cookiePolicy = JSON.parse(cookiePolicyRaw);
                setCookieState(cookiePolicy.usage);
            }
        }
        else {
            setCookieState(true)
        }
    }, []);

    return <>
        <CookiesUpdatedText/>

        <Article>

            <p className={"govuk-body"}>
                Cookies are files saved on your phone, tablet or computer when you visit a website.
            </p>
            <p className={"govuk-body govuk-!-margin-bottom-8"}>
                We use cookies to store information about how you use the coronavirus.data.gov.uk website,
                such as the pages you visit.
            </p>

            <Heading>Cookie settings</Heading>

            <p className={"govuk-body govuk-!-margin-bottom-8"}>
                We use 2 types of cookie. You can choose which cookies you're happy for us to use.
            </p>

            <Heading>Cookies that measure website use</Heading>

            <p className={"govuk-body"}>
                We use Google Analytics to measure how you use the website so we can
                improve it based on user needs. Google Analytics sets cookies that store
                anonymized information about:
            </p>

            <div className={"govuk-body"}>
                <ul className="govuk-list govuk-list--bullet">
                    <li>how you got to the site</li>
                    <li>the pages you visit on coronavirus.data.gov.uk, and how long you spend on each page</li>
                    <li>what you click on while you're visiting the site</li>
                </ul>
            </div>


            <p className={"govuk-body"}>
                We’d like to set additional cookies so we can remember your settings, understand how
                people use the service and make improvements.
            </p>

            <p className={"govuk-body"}>
                These are the Google Analytics cookies we’ll use:
            </p>

            <div className={"govuk-body govuk-!-margin-bottom-8"}>
                <table>
                    <thead className={"govuk-table__head"}>
                        <tr className={"govuk-table__row"}>
                            <th scope={"col"} className={"govuk-table__header"}>Name</th>
                            <th scope={"col"} className={"govuk-table__header govuk-!-width-two-third"}>Purpose</th>
                            <th scope={"col"} className={"govuk-table__header"}>Expires</th>
                        </tr>
                    </thead>
                    <tbody className={"govuk-table__body"}>
                        <tr className={"govuk-table__row"}>
                            <td className={"govuk-table__cell"}>_ga,<br />_gid</td>
                            <td className={"govuk-table__cell"}>
                                These help us count how many people visit coronavirus.data.gov.uk by
                                tracking if you’ve visited before.
                            </td>
                                <td className={"govuk-table__cell"} style={{ minWidth: `100px` }}>_ga 2 years,<br />_gid 24 hours
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={"govuk-body govuk-!-margin-bottom-8"}>
                <div className="govuk-radios">
                    <div className="gem-c-radio govuk-radios__item">
                        <input type="radio" name="cookies-usage" id="radio-c6a408c0-0"
                               checked={ cookieState }
                               className="govuk-radios__input" defaultChecked onClick={() => setCookieState(true)} />
                        <label htmlFor="radio-c6a408c0-0" className="gem-c-label govuk-label govuk-radios__label">
                            Use cookies that measure my website use
                        </label>
                    </div>
                    <div className="gem-c-radio govuk-radios__item">
                        <input type="radio" name="cookies-usage" id="radio-c6a408c0-1"
                               checked={ cookieState === false }
                               className="govuk-radios__input"
                               onClick={() => setCookieState(false)} />
                        <label htmlFor="radio-c6a408c0-1" className="gem-c-label govuk-label govuk-radios__label">
                            Do not use cookies that measure my website use
                        </label>
                    </div>
                </div>
            </div>

            <Heading>Strictly necessary cookies</Heading>

            <p className={"govuk-body"}>
                These essential cookies do things like remember your cookie preferences, so we don't ask for them again.
            </p>

            <p className={"govuk-body govuk-!-margin-bottom-8"}>
                They always need to be on.
            </p>

            <p className={"govuk-body"}>
                <button className="gem-c-button govuk-button"
                    type="submit" data-module="track-click"
                    data-accept-cookies="true" data-track-category="cookies"
                    onClick={ () => handleCookieAccept(cookieState) }>
                    Save changes
                </button>
            </p>
        </Article>
    </>
};

export default CookiesPage;
