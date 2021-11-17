// @flow

import React, { useState, useEffect } from "react";
import Select from 'react-select';

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";
import { SelectOptions } from "pages/Download/Download.styles";
import { Redirect, useLocation } from "react-router";
import Loading from "components/Loading";
import URLs from "common/urls";
import { capitalise, createQuery, getUriParams } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import RenderMetrics from "components/MetricView";
import { FieldSet, PageHeading, Container } from "./Page.styles";


const ExtendedOptionStyles = Object.create(SelectOptions);

ExtendedOptionStyles.control = ( base, state ) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none"
});


const Metrics: ComponentType<*> = ({ metrics, setUri }) => {

    const { pathname, search: queries } = useLocation();
    const { search=null, category=null, tags=null } = getUriParams(queries);
    const [ categories, setCategory ] = useState(category ? category : null);
    const [ types, setType ] = useState(tags ? tags.split(",") : []);
    const [ userInput, setUserInput ] = useState(search);
    const [ data, setData ] = useState(metrics);

    const tagOptions = metrics && [
        ...metrics.reduce((acc, cur) => {
            cur.tags.map(tag => acc.add(tag));
            return acc
        }, new Set())
    ].map(tag => ({ label: capitalise(tag), value: tag }));

    const categoryOptions = metrics && [
        ...metrics.reduce((acc, cur) => acc.add(cur.category), new Set())
    ].map(cat => ({ label: cat, value: cat }));

    useEffect( () => {

        const params = [];

        if ( userInput ) {
            params.push({key: "search", sign: "=", value: userInput.replace(/[^a-z6028\s]/gi, "")});
        }

        if ( types.length ) {
            params.push({ key: "tags", sign: "=", value: types.join(",") });
        }

        if ( categories ) {
            params.push({key: "category", sign: "=", value: categories});
        }

        setUri(pathname + createQuery(params))

        setData(
            metrics.filter(item =>
                (
                    userInput
                        ?  (
                            item.metric.indexOf(userInput.replace(/[^a-z6028\s]/gi, "")) > -1 ||
                            item.metric_name.indexOf(userInput.replace(/[^a-z6028\s]/gi, "")) > -1
                        )
                        : true
                ) &&
                (
                    categories
                        ? item.category.toLowerCase() === categories.toLowerCase()
                        : true
                ) &&
                (
                    types.length
                        ? item.tags.filter(tag => types.indexOf(tag) > -1).length === types.length
                        : true
                )
            )
        )

    }, [ types, categories, metrics, userInput ]);

    return <>
        <PageHeading>
            <h2 className={ "govuk-heading-l govuk-!-margin-bottom-0" }>Metrics by name</h2>
        </PageHeading>
        <div className={ "govuk-form-group" }>
            <FieldSet>
                <label htmlFor={ "metric-search" }
                       className={ "govuk-label govuk-!-font-weight-bold" }>
                    Metric
                </label>
                <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" }>
                    Enter metric name or API name to see results.
                    For example, enter <strong>case</strong> to see all case metrics.
                </div>
                <input name={ "metric-search" } inputMode={ "search" } type={ "search" } autoComplete={ "off" }
                       placeholder={ "Search metrics" }
                       onChange={ ({ target }) => setUserInput(target.value) }
                       value={ userInput || "" }
                       style={{ maxWidth: "20em" }}
                       className={ "govuk-input" } maxLength={ "120" }/>
            </FieldSet>
            <FieldSet>
                <label htmlFor={ "metric-category" }
                       className={ "govuk-label govuk-!-font-weight-bold" }>
                    Filter by category
                </label>
                <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" }>
                    Optional. Select the category you want to include - for example,
                    select <strong>Cases</strong> to only include metrics associated with cases.
                </div>
                <Select name={ "metric-category" }
                        options={ categoryOptions }
                        placeholder={ "Select metric categories for your search" }
                        isClearable
                        styles={ ExtendedOptionStyles }
                        className={ "select" }
                        value={ categoryOptions.find(item => item.value === category) }
                        onChange={ ( target ) => setCategory(target?.value ?? null) }/>
            </FieldSet>
            <FieldSet>
                <label htmlFor={ "metric-tag" }
                       className={ "govuk-label govuk-!-font-weight-bold" }>
                    Filter by type
                </label>
                <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" }>
                    Optional. Select the types you want to include - for example,
                    select <strong>cumulative</strong> to only include cumulative metrics.
                </div>
                <Select name={ "metric-tag" } options={ tagOptions }
                        placeholder={ "Select metric types for your search" }
                        isClearable
                        isMulti
                        styles={ ExtendedOptionStyles }
                        value={ tagOptions?.filter(item => types.indexOf(item.value.toLowerCase()) > -1) ?? [] }
                        className={ "select" }
                        onChange={ item => setType(item.map(({ value }) => value)) }/>
            </FieldSet>
        </div>
        <RenderMetrics data={ data }
                       filterFunc={ () => true }
                       download={ URLs["genericApiMetricSearch"] + `?search=${userInput}` }
                       downloadName={ `metrics_${userInput}.json` }
                       userInput={ userInput }
                       category={ categories }
                       types={ types }/>
    </>

};


export const MetricName: ComponentType<*> = ({ ...props }) => {

    const { pathname, search: queries } = useLocation();
    const [ uri, setUri ] = useState(pathname + queries);

    const data = useGenericAPI(
        "genericApiMetricSearch",
        [],
        {},
        "json",
    );

    if ( !data.length ) return <ColumnEntry { ...props }><Loading/></ColumnEntry>;

    return <ColumnEntry { ...props }>
        <Container>
            <Metrics metrics={ data } setUri={ setUri } uri={ uri }/>
        </Container>
        <Redirect to={ uri }/>
    </ColumnEntry>

};  // AreaType

