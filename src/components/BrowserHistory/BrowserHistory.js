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
            setTimeout(() => {
                const ele: HTMLElement = document.querySelector(hash);

                if ( ele ) {
                    ele.scrollIntoView();
                } else {
                    scrollToMainContent();
                }
            }, 1000);
        }
        else {
            scrollToMainContent();
        }
    }, [ hash, element, document ]);

    return element
    
};  // BrowserHistory


export default BrowserHistory;