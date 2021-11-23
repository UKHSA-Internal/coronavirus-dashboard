// @flow

import React from "react";

import { getParams, getParamValueFor } from "common/utils";

import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import { stripPII, stripPIIUri } from "common/utils/cookies";
import Path from "assets/paths.json";

const DefaultParams = [
    { key: 'areaName', sign: '=', value: 'United Kingdom' },
    { key: 'areaType', sign: '=', value: 'overview' }
];


const DataPageHeaders = () => {

    const { href, search: query, pathname } = useLocation();
    const uri = /^(\/(details\/)?[^/]+).*/.exec(pathname)?.[1];
    let { title="", description="", localised=false } = Path?.[pathname] ?? Path?.[uri] ?? {};
    const urlParams = getParams(query);
    const areaParams = urlParams.length ? urlParams : DefaultParams;

    let areaName;

    if ( localised ) {
        areaName = getParamValueFor(areaParams, "areaName");

        if ( areaName.toLowerCase() === "united kingdom" ) {
            areaName = "the UK";
        }
    }

    let [preppedTitle, preppedDescription] = localised
        ? [`${title} in ${areaName}`, `${description} in ${ areaName }`]
        : [title, description];

    preppedTitle +=  ' | Coronavirus in the UK';

    gtag('event', 'page_view', {
            page_title: stripPII(preppedTitle),
            page_location: stripPIIUri(href),
            page_path: pathname + (query !== "" ? "?" + stripPII(query) : ""),
            send_to: 'UA-161400643-2'
    });

    gtag('event', 'page_view', {
            page_title: stripPII(preppedTitle),
            page_location: stripPIIUri(window.location.href),
            page_path: pathname + (query !== "" ? "?" + stripPII(query) : ""),
        send_to: 'UA-145652997-1'
    });

    return <Helmet>
        <title itemProp={ "name" }>{ preppedTitle }</title>
        <meta name="description" itemProp={ "abstract" } content={ preppedDescription } />
        <meta property="og:title" content={ preppedTitle }/>
        <meta name="twitter:title" content={ preppedTitle }/>
        <meta property="og:description" content={ preppedDescription }/>
        <meta name="twitter:description" content={ preppedDescription }/>
    </Helmet>;

};


export default DataPageHeaders;
