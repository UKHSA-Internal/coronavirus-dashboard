// @flow
import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import {
    Markdown,
    Article
} from './BrowserHistory.styles';


const BrowserHistory = ({ data }) => {

    const { hash } = useLocation();

    useEffect(() => {
        if ( hash ) {
            const element: HTMLElement = document.querySelector(hash);

            if ( element )
                element.scrollIntoView();
        }
        else {
            document.querySelector("#main-content").scrollIntoView({block: "start"});
        }
    }, [ hash, data ]);

    return <Article>
        <Markdown dangerouslySetInnerHTML={{ __html: data }}/>
    </Article>
    
};  // BrowserHistory


export default BrowserHistory;
