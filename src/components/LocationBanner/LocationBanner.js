// @flow

import React, { useEffect, useState, Fragment, useRef } from "react";

import { Container, Closer } from "./LocationBanner.styles";

import type { ComponentType } from "react";

import moment from "moment";


const joiner = (index, len) => {

    switch ( index ) {
        case len - 2:
            return ", and "
        case len - 1:
            return null;
        default:
            return ", "

    }

};


const getCookie = ( cookieName: string ) => {

    const
        name = `${cookieName}=`,
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');

    for ( let ind = 0; ind < ca.length; ind++ ) {
        let c = ca[ind];

        while ( c.charAt(0) === ' ' ) {
            c = c.substring(1);
        }

        if ( c.indexOf(name) === 0 ) {
            return JSON.parse(c.substring(name.length, c.length));
        }
  }
  return "";

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


const usePrevious = (value) => {

    const ref = useRef(value);

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};  // usePrevious


const LocationBanner: ComponentType = ({ pageTitle, areaTypes, pathname }) => {

    const
        [ display, setDisplay ] = useState(false),
        lenAreaTypes = areaTypes.length,
        cookieName = "LocationBanner",
        cookieData = getCookie(cookieName)?.[pathname] ?? {},
        prevPathname = usePrevious(pathname);


    useEffect(() => {

        if ( prevPathname !== pathname && Object.keys(cookieData) ) {

            const
                today = new Date,
                appData = areaTypes
                    .reduce((acc, item) => ({ ...acc, [item.suggestion]: item.lastUpdate }), {});

            const isDismissed = Object
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

            setDisplay(!isDismissed)

        }

    }, [ cookieData, pathname, prevPathname ])

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

    return <Container>
        <p>
            { pageTitle } data are also available for&nbsp;{
            areaTypes.map((area, index) =>
                <Fragment key={ `${ pageTitle }-${ area }` }>
                    <strong>{ area.suggestion }</strong>
                    { joiner(index, lenAreaTypes) }
                </Fragment>
            ) }.
        </p>
        <Closer type={ "button" } onClick={ dismiss }>
            <span className={ "govuk-visually-hidden" }>
                Click to dismiss the banner.
            </span>
        </Closer>
    </Container>

}; // LocationBanner


export default LocationBanner;
