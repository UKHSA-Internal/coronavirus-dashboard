// @flow

import React, { useEffect } from "react"

import { useLocation } from "react-router-dom";

import {
    Markdown,
    Article
} from './BrowserHistory.styles';

const MAX_SCROLL_ATTEMPTS = 50;
const MAIN_CONTENT = "main-content";

const BrowserHistory = ({data}) => {

    const location = useLocation();

    const scrollPage = (hash) => {
        let retries = 0;
        const id = hash.replace('#', '');
        const scroll = () => {
            retries += 0;
            if (retries > MAX_SCROLL_ATTEMPTS)
                return;
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => element.scrollIntoView(), 0);
            } else {
                setTimeout(scroll, 100);
            }
        };
        scroll();
    }; // scrollPage
    

    const scrollToLink = () => {
        if (location.hash) {
            scrollPage(location.hash);
        }
    }; // scrollToLink

    const scrollToHeading = () => {
        if (!location.hash) {
            scrollPage (MAIN_CONTENT);
        }
    }; // scrollToHeading

    useEffect(() => {
    
        if (location.hash ) {
            scrollToLink();
        }
        else {
            scrollToHeading();   
        }

        
    }, [ location.hash ]);

    return <Article>
               <Markdown dangerouslySetInnerHTML={{ __html: data }}/>
           </Article>
    
} // BrowserHistory

export default BrowserHistory;

