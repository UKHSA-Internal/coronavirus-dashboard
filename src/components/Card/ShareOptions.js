// @flow

import React from "react"

import URLs from "common/urls";


const ShareOptions = ({ subject, label, pathname }) => {

    const hash =  "#card-heading-" + encodeURI(label);
    const enc_hash = hash.replace("#", "%23");
    const baseUrl = URLs["baseUrl"];
    const tweetUri = "https://twitter.com/intent/tweet?url=" + 
                        encodeURI(`${baseUrl}${pathname}`) + enc_hash + encodeURI(`&text=${subject} -`)

    const copy_to_clipboard = (href) => {
      let textField = document.createElement('textarea');
      textField.innerText = "" + href;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    };

    return <>

        <a id={`copy-url-${label}`}
           className={ 'govuk-link govuk-link--no-visited-state' }
           onClick={ (e) => copy_to_clipboard(e.target.href) }
           rel={ 'noreferrer noopener' }
           href={ `${pathname}${hash}` }>
            Copy Link
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
           rel={ 'noreferrer noopener' }
           target="_blank"
           href={encodeURI(`mailto:?Subject=Coronavirus Dashboard - ${subject}&body=${baseUrl}${pathname}${hash}`)}>
            Email
        </a>

        <a className={ 'govuk-link govuk-link--no-visited-state' }
            rel={ 'noreferrer noopener' }
            target="_blank"
            href={ tweetUri }>
            Twitter
        </a>
    </>

};  // ShareOptions


export default ShareOptions;
