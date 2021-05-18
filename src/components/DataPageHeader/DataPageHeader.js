// @flow

import React from "react";

import { getParamValueFor } from "common/utils";

import { Helmet } from "react-helmet";


const DataPageHeaders = ({category, areaParams, description}) => {

    let areaName = getParamValueFor(areaParams, "areaName");

    if ( areaName.toLowerCase() === "united kingdom" ) {
        areaName = "the UK";
    }

    const title = `${category} in ${areaName} | Coronavirus in the UK`;
    description = `${description} in ${ areaName }`;

    return <Helmet>
        <title>{ title }</title>
        <meta name="description"
              content={ description } />
        <meta property="og:title" content={ title }/>
        <meta name="twitter:title" content={ title }/>
        <meta property="og:description" content={ description }/>
        <meta name="twitter:description" content={ description }/>
    </Helmet>

};


export default DataPageHeaders;
