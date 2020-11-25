// @flow

import React from "react";
import { useHistory } from "react-router-dom";

import { BrowserHistoryStyles } from "./BrowserHistory.styles"

import type { ComponentType } from "react";


const BrowserHistory: ComponentType<*> = (props) => {

    const history = useHistory();
    

    const hash = "dave";
    // alert (hash)

    // if (hash) {
    //     history.push("/about-data/#introduction");
    // }

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { hash: hash });
        }
        return child;
    });

    console.log(childrenWithProps)

    return (

        <div>{childrenWithProps}</div>
    )
} // BrowserHistory


export default BrowserHistory;
