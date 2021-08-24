// @flow

import React, { lazy, Suspense } from "react";

import { ComponentType } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, useLocation } from "react-router";
import Loading from "components/Loading";
import { Content } from "./DevelopersGuide.styles";

const
    ApiDocs        = lazy(() => import('pages/ApiDocs')),
    GenericApiDocs = lazy(() => import('pages/GenericApiDocs'));


const DevelopersGuide: ComponentType<*> = ({}) => {

    const { pathname } = useLocation();

    const pages = [
        {label: "Open Data API", uri: "/details/developers-guide/main-api"},
        {label: "Generic API", uri: "/details/developers-guide/generic-api"}
    ];

    return <Content className={ "govuk-body" }>
        <h2>API documentations</h2>
        <p>
            Technical documentations for the application programming interfaces (APIs)
            provided as a part of the Coronavirus Dashboard.
        </p>
        <ul className={ "govuk-list govuk-list--dashed" }>{
            pages.map(item =>
                <li key={ item.label }>{
                    pathname !== item.uri
                        ? <Link to={ item.uri } className={ "govuk-link govuk-link--no-visited-state" }>{ item.label }</Link>
                        : <strong>{ item.label }</strong>
                }</li>
            )
        }</ul>
        <Switch>
            <Route path="/details/developers-guide/:page" exact>
                <hr className={ "govuk-section-break govuk-section-break--visible govuk-section-break--l" }/>
            </Route>
        </Switch>
        <Suspense fallback={ <Loading/> }>
            <Switch>
                <Route path="/details/developers-guide/main-api" exact component={ ApiDocs }/>
                <Route path="/details/developers-guide/generic-api" exact component={ GenericApiDocs }/>
            </Switch>
        </Suspense>
    </Content>;

};


export default DevelopersGuide;
