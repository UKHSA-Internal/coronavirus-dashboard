// @flow

import React, { useEffect, useState, Fragment } from "react";
import ReactTooltip from "react-tooltip";

import usePrevious from "hooks/usePrevious";

import { Container, Closer } from "./LocationBanner.styles";
import type { ComponentType } from "react";


const joiner = (index, len) => {

    switch ( index ) {
        case len - 2:
            return <> and&nbsp;</>
        case len - 1:
            return null;
        default:
            return <>, </>

    }

};  // joiner


const getCookie = ( cookieName: string ) => {

    const
        name = `${cookieName}=`,
        decodedCookie = decodeURIComponent(document.cookie);

    for ( let cookie of decodedCookie.split(';') ) {
        if ( cookie.indexOf(name) > -1 )
            return JSON.parse(
                cookie
                    .replace(/^\s*/, "")
                    .substring(name.length, cookie.length)
            );
    }

    return {}

};  // getCookie


const setOrUpdateCookie = (cookieName: string, payload: {[string]: [string|number]}, expiration: Date, path: string = "/") => {

    const
        existingCookie = getCookie(cookieName),
        cookieData = { ...existingCookie, ...payload };

    document.cookie = (
        `${ cookieName }=` +
        `${ encodeURIComponent(JSON.stringify(cookieData)) }; ` +
        `expires=${ expiration.toUTCString() }; ` +
        `path=${ path }`
    );

};  // setOrUpdateCookie


const LocationBanner: ComponentType = ({ pageTitle=null, areaTypes, pathname }) => {

    const
        [ display, setDisplay ] = useState(false),
        lenAreaTypes = areaTypes.length,
        cookieName = "LocationBanner",
        cookieData = getCookie(cookieName)?.[pathname] ?? {},
        prevPathname = usePrevious(pathname);

    useEffect(() => {

        if ( prevPathname !== pathname && cookieData ) {

            const
                today = new Date,
                appData = areaTypes
                    .reduce((acc, item) => ({
                        ...acc,
                        [item.suggestion]: item.lastUpdate
                    }), {}),
                isDismissed = Object
                    .keys(appData)
                    .every(suggestion => {
                        const
                            pageCookieDateString = cookieData?.[suggestion] ?? "",
                            pageCookieDate = new Date(pageCookieDateString);

                        return (
                            pageCookieDateString &&
                            pageCookieDate <= today &&
                            (cookieData?.[suggestion] ?? "") === appData[suggestion]
                        )

                    });

            console.log(cookieData);
            setDisplay((!isDismissed) && pageTitle !== null)

        }

    }, [ cookieData, pathname, prevPathname, pageTitle ]);

    const dismiss = () => {

        const
            today = new Date(),
            [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()],
            nextMonth = new Date(year, month + 1, day > 28 ? 28 : day),
            payload = areaTypes
                .reduce((acc, item) => ({ ...acc, [item.suggestion]: item.lastUpdate }), {});

        setOrUpdateCookie(cookieName, { [pathname]: payload }, nextMonth)

        setDisplay(false);

    };  // dismiss

    if ( !display || !pageTitle ) return null;

    return <>
        <Container>
            <p>
                { pageTitle } data are available for&nbsp;{
                areaTypes.map((area, index) =>
                    <Fragment key={ `${ area }-${ index }` }>
                        <strong>{ area.suggestion }</strong>
                        { joiner(index, lenAreaTypes) }
                    </Fragment>
                ) }.
            </p>
            <Closer htmlType={ "button" }
                    data-tip={ "Click to dismiss banner" }
                    data-for={ "dismiss-banner-tooltip" }
                    onClick={ dismiss }>
                <span className={ "govuk-visually-hidden" }>
                    Click to dismiss the banner.
                </span>
            </Closer>
        </Container>
        <ReactTooltip id={ "dismiss-banner-tooltip" }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </>

}; // LocationBanner


export default LocationBanner;
