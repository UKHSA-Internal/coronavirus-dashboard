// @flow

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import usePrevious from "hooks/usePrevious";


const BrowserHistory = ({ children }) => {

    const location = useLocation();
    let { hash, search } = location;
    const [hashValue, setHashValue] = useState(null);
    let prevHash = usePrevious(hashValue);


    const scrollToMainContent = () => {
        document.querySelector("#main-content").scrollIntoView({block: "start"});
    }

    useEffect(() => {
        setHashValue(
            hash && hash.length > 0
                ? hash
                : (`#${ /%23(.*)$/ig.exec(search)?.[1] ?? "" }`)
        )
    }, [ hash, search ]);

    useEffect(() => {

        if ( hashValue !== null && hashValue !== prevHash ) {

            setTimeout(() => {
                try {
                    const ele: HTMLElement = document.querySelector(hashValue);

                    if ( ele ) {
                        ele.scrollIntoView()
                    }
                } catch (err) { }

            }, 1000)
        }

    }, [ hashValue ]);

    return children

}; // BrowserHistory


export default BrowserHistory;
