// @flow

import React, { useEffect } from "react";

import { analytics, getParams, getParamValueFor } from "common/utils";

import { Helmet } from "react-helmet";

import Path from "assets/paths.json";


const DefaultParams = [
    { key: 'areaName', sign: '=', value: 'United Kingdom' },
    { key: 'areaType', sign: '=', value: 'overview' }
];


const DataPageHeaders = ({ pathname, query }) => {

    const { title="", description="", localised=false } = Path?.[pathname] ?? {};
    const urlParams = getParams(query);
    const areaParams = urlParams.length ? urlParams : DefaultParams;

    let areaName = getParamValueFor(areaParams, "areaName");

    if ( areaName.toLowerCase() === "united kingdom" ) {
        areaName = "the UK";
    }

    let [preppedTitle, preppedDescription] = localised
        ? [`${title} in ${areaName}`, `${description} in ${ areaName }`]
        : [title, description];

    useEffect(() => {
        if ( Array.isArray(window?.dataLayer) ) {
            analytics({
                action: "page_view",
                page_title: preppedTitle,
                page_location: document.location.href,
                page_path: pathname,
                send_to: 'UA-161400643-2'
            });
        }
    }, [ pathname, query, preppedTitle ]);

    preppedTitle =  decodeURIComponent(`${preppedTitle} | Coronavirus in the UK`);
    preppedDescription = decodeURIComponent(preppedDescription);

    return <Helmet>
        <title>{ preppedTitle }</title>
        <meta name="description" content={ preppedDescription } />
        <meta property="og:title" content={ preppedTitle }/>
        <meta name="twitter:title" content={ preppedTitle }/>
        <meta property="og:description" content={ preppedDescription }/>
        <meta name="twitter:description" content={ preppedDescription }/>
    </Helmet>;

};


export default DataPageHeaders;
