// @flow
import { useEffect } from "react";

import { useLocation } from "react-router-dom";


const BrowserHistory = ( { element } ) => {

    const { hash } = useLocation();

    const scrollToMainContent = () => {
        document.querySelector("#main-content").scrollIntoView({block: "start"});
    }

    useEffect(() => {
        if ( hash ) {
            const ele: HTMLElement = document.querySelector(hash);

            if ( ele ) {
                ele.scrollIntoView();
            } else {
                scrollToMainContent();
            }
        }
        else {
            scrollToMainContent();
        }
    }, [ hash, element ]);

    return element
    
};  // BrowserHistory


export default BrowserHistory;
