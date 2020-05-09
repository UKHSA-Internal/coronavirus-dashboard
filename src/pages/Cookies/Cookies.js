// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import PageTitle from 'components/PageTitle';
import type { Props } from './Cookies.types';
import * as Styles from './Cookies.styles';

const deleteCookies = () => {
    document.cookie = "_ga= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=.data.gov.uk";
    document.cookie = "_gid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=.data.gov.uk";
};

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
    const [cookieState, setCookieState] = useState('unset');

    const handleAccept = () => {
        const
            today = new Date(),
            [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()],
            cookieExpiryDate = new Date(year + 1, month, day).toUTCString();

        if (cookieState === 'set') {
            document.cookie = `cookies_policy=${encodeURIComponent('{"essential":true,"usage":true}')}; expires=${cookieExpiryDate};`;
            setCookies();
        } else {
            document.cookie = `cookies_policy=${encodeURIComponent('{"essential":true,"usage":false}')}; expires=${cookieExpiryDate};`;
            deleteCookies();
        }

        document.cookie = `cookies_preferences_set=true; expires=${cookieExpiryDate};`
        setCookieState('accept');
    };



    if (cookieState === 'accept') {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const getCookiesUpdatedText = () => {

        if (cookieState === 'accept')
            return (
                <div className="cookie-settings__confirmation" data-cookie-confirmation="true">
                    <section className="gem-c-notice govuk-!-margin-bottom-8" aria-label="Notice" aria-live="polite">
                        <h2 className="gem-c-notice__title">Cookies on data.gov.uk</h2>
                        <p className={"govuk-body"}>Your cookie settings were saved</p>
                    </section>
                </div>
            );

        return null

    };

    return (
        <Styles.Container className={"govuk-width-container"} role="main">

            {getCookiesUpdatedText()}

            <PageTitle title={"Cookies"} />

            <p className={"govuk-body"}>
                Cookies are files saved on your phone, tablet or computer when you visit a website.
            </p>
            <p className={"govuk-body govuk-!-margin-bottom-8"}>
                We use cookies to store information about how you use the data.gov.uk website, such as the pages you
                visit.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Cookie settings
            </Styles.SectionHeader>

            <p className={"govuk-body govuk-!-margin-bottom-8"}>
                We use 2 types of cookie. You can choose which cookies you're happy for us to use.
            </p>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Cookies that measure website use
            </Styles.SectionHeader>

            <p className={"govuk-body"}>
                We use Google Analytics to measure how you use the website so we can improve it based on user needs.
                Google Analytics sets cookies that store anonymised information about:
            </p>

            <div className={"govuk-body"}>
                <ul className="govuk-list govuk-list--bullet">
                    <li>how you got to the site</li>
                    <li>the pages you visit on data.gov.uk, and how long you spend on each page</li>
                    <li>what you click on while you're visiting the site</li>
                </ul>
            </div>


            <p className={"govuk-body"}>
                We do not allow Google to use or share the data about how you use this site.
            </p>

            <p className={"govuk-body"}>
                These are the Google Analytics cookies we’ll use:
            </p>

            <div className={"govuk-body govuk-!-margin-bottom-8"}>
                <table>
                    <thead className={"govuk-table__head"}>
                        <tr className={"govuk-table__row"}>
                            <th scope={"col"} className={"govuk-table__header"}>Name</th>
                            <th scope="col" className={"govuk-table__header govuk-!-width-two-third"}>Purpose</th>
                            <th scope={"col"} className={"govuk-table__header"}>Expires</th>
                        </tr>
                    </thead>
                    <tbody className={"govuk-table__body"}>
                        <tr className={"govuk-table__row"}>
                            <td className={"govuk-table__cell"}>_ga,<br />_gid</td>
                            <td className={"govuk-table__cell"}>These help us count how many people visit data.gov.uk by
                            tracking if you’ve visited before
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
                        <input type="radio" name="cookies-usage" id="radio-c6a408c0-0" value="on"
                            className="govuk-radios__input" onClick={() => setCookieState('set')} />
                        <label htmlFor="radio-c6a408c0-0" className="gem-c-label govuk-label govuk-radios__label">
                            Use cookies that measure my website use
                        </label>
                    </div>
                    <div className="gem-c-radio govuk-radios__item">
                        <input type="radio" name="cookies-usage" id="radio-c6a408c0-1" value="off"
                            className="govuk-radios__input" defaultChecked onClick={() => setCookieState('unset')} />
                        <label htmlFor="radio-c6a408c0-1" className="gem-c-label govuk-label govuk-radios__label">
                            Do not use cookies that measure my website use
                        </label>
                    </div>
                </div>
            </div>

            <Styles.SectionHeader className={"govuk-heading-m"}>
                Strictly necessary cookies
            </Styles.SectionHeader>

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
                    onClick={handleAccept}>
                    Save changes
                </button>
            </p>
        </Styles.Container>
    );
};

export default Cookies
