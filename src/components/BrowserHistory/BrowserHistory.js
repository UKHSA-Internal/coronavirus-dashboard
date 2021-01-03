// @flow

import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";


const BrowserHistory = ({ element }) => {

    let { hash, search } = useLocation();

    const scrollToMainContent = () => {
        document.querySelector("body").scrollIntoView({ block: "start" });
    }

    useEffect(() => {

        if ( hash || search.search(/%23(.*)$/ig) > -1 ) {
            setTimeout(() => {
                console.log(`#${/%23(.*)$/ig.exec(search)?.[1]}`)
                const ele: HTMLElement = document.querySelector(
                    hash || (`#${/%23(.*)$/ig.exec(search)?.[1] ?? ""}`)
                );

                if (ele) {
                    ele.scrollIntoView();
                } else {
                    scrollToMainContent();
                }
            }, 1000);
        }
        else {
            scrollToMainContent();
        }
    }, [hash, element, document]);

    return element

}; // BrowserHistory


export default BrowserHistory;