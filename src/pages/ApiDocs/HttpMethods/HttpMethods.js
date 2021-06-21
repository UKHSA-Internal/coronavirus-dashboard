// @flow

import React from "react";

import Head from "./Head";
import Options from "./Options";
import Get from "./Get";

import type { ComponentType } from "react";


const HttpMethods: ComponentType<*> = () =>
    <>
        <Head/>
        <Options/>
        <Get/>
    </>;


export default HttpMethods;
