// @flow

import React, { useEffect, useState } from "react"

import { useHistory } from "react-router-dom";

const BrowserHistory = (props) => {

    const history = useHistory();
    const [previousPath, setPreviousPath ] = useState(null);
    let push = false;

    const getPrevousPath = () => {
        const ret = previousPath;
        setPreviousPath(history.location.pathname + history.location.hash);
        return ret;
    };

    const scrollToLink = () => {
        alert ("scrolling")
        if (history.location.hash !== '') {
            let retries = 0;
            const id = history.location.hash.replace('#', '');
            const scroll = () => {
              retries += 0;
              if (retries > 50) return;
              const element = document.getElementById(id);
              if (element) {
                setTimeout(() => element.scrollIntoView(), 0);
              } else {
                setTimeout(scroll, 100);
              }
            };
            scroll();
          }
    };

    useEffect(() => {
        if (history.location.hash !== "" && !getPrevousPath()) {
            push = true;
        }
        else {
            setPreviousPath(history.location.pathname + history.location.hash);
        }
    }, [ history.location.hash ]);


    useEffect(() => {

        if (push) {
            push = false
            history.push (
                {
                    pathname: history.location.pathname,
                    hash: history.location.hash
                }
            );
            scrollToLink();
        }
        
    }, []);

    return (
        <div>{props.children}</div>
    )
    
} // BrowserHistory

export default BrowserHistory;
