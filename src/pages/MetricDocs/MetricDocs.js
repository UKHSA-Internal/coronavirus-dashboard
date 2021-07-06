// @flow

import React from "react";

import type { ComponentType } from "react";
import Pane, { ColumnEntry, PaneColumn } from "components/Pane";
import { AreaTypes } from "./Sections/AreaType";
import { AreaNames } from "./Sections/AreaName";
import { Category } from "./Sections/Category";
import { Route, Switch, useLocation } from "react-router";
import { MetricName } from "./Sections/MetricName";
import { MetricType } from "./Sections/MetricType";


const SubTypes: ComponentType<*> = () => {

    const { pathname } = useLocation();

    return <>
        <Route path={ "/metrics/areaType" }>
            <PaneColumn>
                <AreaTypes parent={ pathname } level={ 1 }/>
            </PaneColumn>
        </Route>
        <Route path={ "/metrics/areaName" }>
            <AreaNames parent={ pathname } level={ 1 }/>
        </Route>
        <Route path={ "/metrics/category" }>
            <Category parent={ pathname } level={ 1 }/>
        </Route>
        <Route path={ "/metrics/name" }>
            <PaneColumn>
                <MetricName parent={ pathname } level={ 1 }/>
            </PaneColumn>
        </Route>
        <Route path={ "/metrics/type" }>
            <PaneColumn>
                <MetricType parent={ pathname } level={ 1 }/>
            </PaneColumn>
        </Route>
    </>;

};  // SubTypes


const MetricDocs: ComponentType<*> = () => {

    const basePath = "/metrics";

    return <Pane basePath={ basePath }>
        <Switch>
            <Route path={ "/metrics" }>
                <PaneColumn>
                    <ColumnEntry level={ 0 } id={ "name" } label={  "Metric name" } parentPath={ basePath }
                                 description={ "See all available metrics." }/>
                    <ColumnEntry level={ 0 } id={ "category" } label={  "Metric category" } parentPath={ basePath }
                                 description={ "Search metrics based on their category - that is, the page of the website on which they are displayed." }/>
                    <ColumnEntry level={ 0 } id={ "type" } label={  "Metric type" } parentPath={ basePath }
                                 description={ "Search metrics based on their type - for example, all cumulative metrics." }/>
                    <ColumnEntry level={ 0 } id={ "areaType" } label={  "Area type" } parentPath={ basePath }
                                 description={ "Search metrics based on the area type for which they are published." }/>
                    <ColumnEntry level={ 0 } id={ "areaName" } label={  "Area name" } parentPath={ basePath }
                                 description={ "Search metrics based on the area name for which they are published." }/>
                </PaneColumn>
                <SubTypes/>
            </Route>
        </Switch>
    </Pane>

};  // MetricDocs


export default MetricDocs;
