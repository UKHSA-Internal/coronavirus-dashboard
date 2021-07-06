// @flow

import React from "react";

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";
import useGenericAPI from "hooks/useGenericAPI";
import { capitalise } from "common/utils";
import { Column } from "components/Pane/Pane.styles";
import { Route, Switch } from "react-router";
import URLs from "common/urls";
import { Option } from "./Options.styles";
import { Link } from "react-router-dom";
import { Container } from "./Options.styles";


const CategoryList: ComponentType<*> = ({ metricTypeData }) => {

    return <Switch>{
        metricTypeData.map((item, index) =>
            <Route path={ `/metrics/category/${ encodeURI(item.category.toLowerCase()) }` } key={ `category-routes-${item.category}` }>
                <Container>
                    <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className={ "govuk-!-margin-bottom-4" }>
                    <h2 className={ "govuk-heading-l govuk-!-margin-bottom-0" }>Metrics</h2>
                    <a className={ "govuk-link govuk-link--no-visited-state" }
                       href={ URLs["genericApiMetricSearch"] + `?category=${item.category}` }
                       rel={ "noopener noreferrer" }
                       target={ "_blank" }
                       download={ `metrics_${item.category}-category.json` }>Export results as JSON</a>
                    </div>{
                        item.payload.map(metric => <Option key={ metric.metric }>
                            <div className={ "govuk-!-margin-bottom-1" } style={{ display: "flex", justifyContent: "space-between"}}>
                                <Link className={ "govuk-link govuk-link--no-underline govuk-link--no-visited-state govuk-!-font-weight-bold" }
                                      to={ `/metric/doc/${metric.metric}` }>{ metric.metric_name }</Link>
                                <span className={ "govuk-tag govuk-!-margin-left-2" } style={{ fontSize: 14 }}>{ item.category }</span>
                            </div>
                            <div className={ "govuk-!-margin-bottom-2" }>
                                <strong className={ "govuk-!-font-size-14 govuk-!-margin-right-1" }>API name:</strong>
                                <code>{ metric.metric }</code>
                            </div>
                            <div className={ "govuk-!-margin-top-1" }>{
                                metric.tag.map(tag =>
                                    <span className={ "govuk-tag govuk-tag--blue govuk-!-margin-right-1" } style={{ fontSize: 12 }} key={ tag }>{ tag }</span>
                                )
                            }</div>
                        </Option>)
                    }</div>
                </Container>
            </Route>
        )
    }</Switch>

};  // CategoryList


export const Category: ComponentType<*> = ({ parent, ...props }) => {

    const metricTypeData = useGenericAPI(
        "genericApiMetricProps",
        [],
        {},
        "json",
        {by: "category"}
    );

    return <>
        <Column>{
            metricTypeData.map((item, index) =>
                <ColumnEntry { ...props }
                             parentPath={ "/metrics/category" }
                             key={ `category-path-${index}` }
                             id={ encodeURI(item.category.toLowerCase()) }
                             label={ capitalise(item.category) }/>
            )
        }</Column>
        <Switch>
            <Route path={ `/metrics/category/:category` } exact>
                <Column>
                    <CategoryList metricTypeData={ metricTypeData } parent={ parent }/>
                </Column>
            </Route>
        </Switch>
    </>;

};  // Category
