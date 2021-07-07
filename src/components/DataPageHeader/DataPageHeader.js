// @flow

import React, { useEffect } from "react";

import { getParams, getParamValueFor } from "common/utils";

import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

import Path from "assets/paths.json";


const DefaultParams = [
    { key: 'areaName', sign: '=', value: 'United Kingdom' },
    { key: 'areaType', sign: '=', value: 'overview' }
];


const DataPageHeaders = () => {

    const { search: query, pathname } = useLocation();
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

    preppedTitle +=  ' | Coronavirus in the UK';

    useEffect(() => {
        if ( Array.isArray(window?.dataLayer) ) {
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    url: pathname + query,
                    title: title
                }
            });
        }
    }, [pathname, query ]);

    return <Helmet>
        <title>{ preppedTitle }</title>
        <meta name="description" content={ preppedDescription } />
        <meta property="og:title" content={ preppedTitle }/>
        <meta name="twitter:title" content={ preppedTitle }/>
        <meta property="og:description" content={ preppedDescription }/>
        <meta name="twitter:description" content={ preppedDescription }/>
    </Helmet>

};


export default DataPageHeaders;
