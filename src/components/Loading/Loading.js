import React from "react";
import { PulseLoader } from "react-spinners";


export const MainLoading = () => {

    return <div className="govuk-width-container" role="main">
        <div className={ "govuk-body govuk-!-font-size-24 govuk-!-margin-top-10" }>
            <PulseLoader size={ 12 } margin={ 2 } color={ '#adadad' }/>
            The website is loading. Please wait&hellip;
        </div>
    </div>

}; // MainLoading