// @flow

import React from "react";

import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";

import { MetricName } from "./Sections/MetricName";
import { TopicSection } from "./Sections/GenericSection";

import useResponsiveLayout from "hooks/useResponsiveLayout";

import Pane, { ColumnEntry, PaneColumn, BREAKPOINT } from "components/Pane";

import type { ComponentType } from "react";


const SubTypes: ComponentType<*> = () => {

    const { pathname } = useLocation();

    return <>
        <Route path={ "/metrics/category" }>
            <TopicSection parent={ pathname } level={ 1 } urlName={ "genericApiMetricProps" } parentPath={ "/metrics/category" }/>
        </Route>
        <Route path={ "/metrics/name" }>
            <PaneColumn>
                <MetricName parent={ pathname } level={ 1 }/>
            </PaneColumn>
        </Route>
        <Route path={ "/metrics/type" }>
            <TopicSection parent={ pathname } level={ 1 } urlName={ "genericApiMetricProps" } parentPath={ "/metrics/type" }/>
        </Route>
        <Route path={ "/metrics/area_type" }>
            <TopicSection parent={ pathname } level={ 1 } urlName={ "genericApiMetricProps" } parentPath={ "/metrics/area_type" }/>
        </Route>
    </>;

};  // SubTypes


const MetricDocs: ComponentType<*> = () => {

    const basePath = "/metrics";
    const { pathname } = useLocation();
    const layout = useResponsiveLayout(BREAKPOINT);

    return <>
    <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">
                experimental
            </strong>
            <span className="govuk-phase-banner__text">
                This is a new prat of the service.
                Your <a className="govuk-link"
                        href="mailto:coronavirus-tracker@phe.gov.uk?Subject=Metrics%20documentation%20feedback">
                    feedback
                </a> will
                help us to improve it.
            </span>
        </p>
    </div>
    <Pane basePath={ basePath }>
        <Switch>
            <Route path={ "/metrics" }>
                { layout === "desktop" || pathname === basePath
                    ? <PaneColumn>
                        <ColumnEntry level={ 0 } id={ "name" } label={ "Metric name" } parentPath={ basePath }
                                     description={ "See all available metrics." }/>
                        <ColumnEntry level={ 0 } id={ "category" } label={ "Metric category" } parentPath={ basePath }
                                     description={ "Search metrics based on their category - that is, the page of the website on which they are displayed." }/>
                        <ColumnEntry level={ 0 } id={ "type" } label={ "Metric type" } parentPath={ basePath }
                                     description={ "Search metrics based on their type - for example, all cumulative metrics." }/>
                        <ColumnEntry level={ 0 } id={ "area_type" } label={ "Area type" } parentPath={ basePath }
                                     description={ "Search metrics based on the area type for which they are published." }/>
                    </PaneColumn>
                    : pathname.split("/").length === 3
                        ? <Link className="govuk-back-link govuk-!-margin-left-3" to={ basePath }>Back to metrics</Link>
                        : null
                }
                <SubTypes/>
            </Route>
        </Switch>
    </Pane>
        </>

};  // MetricDocs


export default MetricDocs;
