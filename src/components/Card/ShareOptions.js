// @flow

import React, { useEffect } from "react"
import { useLocation } from "react-router";

import URLs from "common/urls";
import { getParams, getParamValueFor } from "common/utils";
import { analytics } from "common/utils";


const ShareOptions = ({ subject, label }) => {

    const cardLabel = `card-${label}`;
    const hash =  `#${encodeURI(cardLabel)}`;
    const { pathname, search: query } = useLocation();
    const url = `${URLs.baseUrl}${pathname}${query.replace(/[&]/g, "%26")}${hash}`;
    const urlParams = getParams(query);
    const areaName = getParamValueFor(urlParams, "areaName", "the United Kingdom");
    const tweetUri = (
        `https://twitter.com/intent/tweet?url=${encodeURI(url).replace(/[#]/g, "%23")}&text=` +
        encodeURI(
            `See latest charts & data for "${subject}" in ${ areaName } on ` +
            `#UKCovid19 Dashboard.\n`
        )
            .replace(/[#]/g, "%23")
            .replace(/[&]/g, "%26")
    );

    const body = `See latest charts and data for "${subject}" in ${ areaName } 
on the official UK Coronavirus Dashboard:

${url}

Click on the link or copy and paste it into your browser.
`;

    useEffect(() => {
        analytics({
            category: 'Share',
            action: 'open',
            label: 'Selection dropdown'
        });
    });

    useEffect(() => {
        analytics({
            category: 'Share',
            action: 'open',
            label: 'Selection dropdown'
        });
    });


    const shareTriggered = ( type, action = () => null ) => {

        analytics({
            category: 'Share',
            action: JSON.stringify({
                areaName,
                label
            }),
            label: type
        });

        action();

    };

    const copy_to_clipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = url;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    return <>

        <a id={`copy-url-${label}`}
           className={ 'govuk-link govuk-link--no-visited-state' }
           onClick={ () => shareTriggered("COPY TO CLIPBOARD", copy_to_clipboard) }
           href={ hash }>
            Copy link
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
           rel={ 'noreferrer noopener' }
           target={ "_blank" }
           onClick={ () => shareTriggered("EMAIL") }
           href={encodeURI(`mailto:?Subject=Coronavirus Dashboard - ${subject}&body=${body}`)}>
            Email
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
            rel={ 'noreferrer noopener' }
            target={ "_blank" }
            onClick={ () => shareTriggered("TWEET") }
            href={ tweetUri }>
            Tweet
        </a>
    </>;

};  // ShareOptions


export default ShareOptions;
