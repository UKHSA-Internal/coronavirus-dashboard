// @flow

import React, { useEffect } from "react";

import { analytics } from "common/utils";


const DownloadOptions = ({ heading, baseUrl, noCsv }) => {

    useEffect(() => {
        analytics({
            category: 'downloads',
            action: 'click',
            label: 'Selection dropdown'
        });
    });

    const downloadTriggered = ( type ) => analytics({
        category: 'downloads',
        action: 'click',
        label: `${type} [${heading}]`
    });

    return <>
        {
            !noCsv
                ? <a className={ 'govuk-link govuk-link--no-visited-state' }
                     onClick={ () => downloadTriggered("CSV") }
                     href={ `${ baseUrl }&format=csv` }
                     aria-disabled={ !noCsv }>
                    as CSV
                </a>
                : <span className={ 'govuk-link govuk-link--no-visited-state disabled' }>
                    as CSV
                    <span className={ "govuk-visually-hidden" }>
                        CSV format is not available for this card.
                    </span>
                </span>
        }
        <a className={ 'govuk-link govuk-link--no-visited-state' }
           href={ `${baseUrl}&format=json` }
           onClick={ () => downloadTriggered("JSON") }
           target={ '_blank' }
           rel={ 'noreferrer noopener' }>
            as JSON
        </a>
        <a className={ 'govuk-link govuk-link--no-visited-state' }
           target={ '_blank' }
           onClick={ () => downloadTriggered("XML") }
           rel={ 'noreferrer noopener' }
           href={ `${baseUrl}&format=xml` } download>
            as XML
        </a>
    </>

};  // DownloadOptions


export default DownloadOptions;
