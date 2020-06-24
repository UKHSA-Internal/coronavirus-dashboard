import 'react-app-polyfill/ie11';
import React from "react";
import { PulseLoader } from "react-spinners";


const Loading = ({ large=false }) => {

    if ( !large )
        return <span>
            <PulseLoader size={ 8 } margin={ 2 } color={ '#adadad' }/>
            <span className={ "govuk-visually-hidden" }>The website is loading. Please wait.</span>
        </span>

    return <div className="govuk-width-container" role="main">
        <div className={ "govuk-body govuk-!-font-size-24 govuk-!-margin-top-10" }>
            <PulseLoader size={ 12 } margin={ 2 } color={ '#adadad' }/>
            <span className={ "govuk-visually-hidden" }>The website is loading. Please wait.</span>
        </div>
    </div>

}; // MainLoading

export default Loading;