// @flow

import React, { createContext, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import type { ComponentType } from "react";
import { prepAsKey } from "components/Map/utils";
import { hopscotch } from "react-syntax-highlighter/dist/esm/styles/hljs";


const BrowserHistory = (props) => {

    const history = useHistory();
    const [previousPath, setPreviousPath ] = useState(null)
    const [push, setPush ] = useState(false)

    const getPrevousPath = () => {
        const ret = previousPath;
        setPreviousPath(history.location.pathname + history.location.hash)
        return ret;
    }

    useEffect(() => {
        if (history.location.hash !== "") {
            const previousPath = getPrevousPath()
            alert ("Previuis " + previousPath)
            alert ("Current " + history.location.pathname + history.location.hash)
            if (!previousPath) {
                setPush(true)     
            }
        }
        else {
            setPreviousPath(history.location.pathname + history.location.hash)
        }
    }, [ history.location.hash ])


    useEffect(() => {
        console.log(history)
    }, [ ])


    if (push) {
        setPush(false)
        alert ("pushing")
        window.location.href = "/details/about-data#r-number-and-growth-rate"
    } else {
        return (
            <div>{props.children}</div>
        )
    }
} // BrowserHistory

export default BrowserHistory;
