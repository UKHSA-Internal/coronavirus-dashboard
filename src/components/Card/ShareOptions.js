// @flow

import React from "react"

import URLs from "common/urls";


const ShareOptions = ({ subject, label, pathname }) => {

    const hash = "#card-heading-" + label;
    const url = `${pathname}${hash}`;
    const baseUrl = URLs["baseUrl"];

    const copy_to_clipboard = (event) => {
      let textField = document.createElement('textarea');
      textField.innerText = "" + event.target.href;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    };

    const tweet = (event) => {
        const url = "" + event.target.href;
    };

   

    const shareTriggered = ( type, event ) => {

        if (type === "COPY") copy_to_clipboard(event);
        else if (type === "TWITTER") tweet(event); 
        
    };

   

    return <>

        <a id={`copy-url-${label}`}
           className={ 'govuk-link govuk-link--no-visited-state' }
           onClick={ (e) => shareTriggered("COPY", e) }
           rel={ 'noreferrer noopener' }
           href={ url }>
            Copy Link
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
           onClick={ (e) => shareTriggered("EMAIL", e) }
           rel={ 'noreferrer noopener' }
           href={encodeURI(`mailto:?Subject=Coronavirus Dashboard - ${subject}&body=${baseUrl}${url}`)}>
            Email
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
           onClick={ (e) => shareTriggered("TWITTER", e) }
           rel={ 'noreferrer noopener' }
           href="#">
            Twitter
        </a>
    </>

};  // DownloadOptions


export default ShareOptions;
