// @flow

import React from "react";

import Filters from "./Filters";
import Structure from "./Structure";
import LatestBy from "./LatestBy";
import Format from "./Format";
import Page from "./Page";

import type { ComponentType } from "react";


const QueryParameters: ComponentType<*> = () =>
    <>
        <Filters/>
        <Structure/>
        <LatestBy/>
        <Format/>
        <Page/>
    </>;


export default QueryParameters;
