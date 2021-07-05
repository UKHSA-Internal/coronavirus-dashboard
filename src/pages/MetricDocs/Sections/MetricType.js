// @flow

import React, { useState, useEffect } from "react";
import Select from 'react-select';

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";
import { SelectOptions } from "pages/Download/Download.styles";
import { Container, Option } from "./Options.styles";
import { Link } from "react-router-dom";
import { Redirect, useLocation } from "react-router";
import Loading from "components/Loading";
import useMetricSearch from "hooks/useMetricSearch";
import usePrevious from "hooks/usePrevious";
import URLs from "common/urls";
import { createQuery, getUriParams } from "common/utils";


const ExtendedOptionStyles = Object.create(SelectOptions);

ExtendedOptionStyles.control = ( base, state ) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none"
});

const Metrics: ComponentType<*> = ({ userInput, setIsLoading, isLoading, setUri, uri }) => {

    const prevInput = usePrevious(userInput);
    const { pathname, search: queries } = useLocation();
    const { search=null, category=null, tags=null } = getUriParams(queries);
    const [categories, setCategory] = useState(category ? category : null);
    const [types, setType] = useState(tags ? tags.split(",") : []);

    const metrics = useMetricSearch({
        defaultResponse: null,
        params: { search, category, tags }
    });

    const tagOptions = metrics && [
        ...metrics.reduce((acc, cur) => {
            cur.tags.map(tag => acc.add(tag));
            return acc
        }, new Set())
    ].map(tag => ({ label: tag, value: tag }));

    const categoryOptions = metrics && [
        ...metrics.reduce((acc, cur) => acc.add(cur.category), new Set())
    ].map(cat => ({ label: cat, value: cat }));


    useEffect( () => {

        const params = [
            { key: "tags", sign: "=", value: types.join(",") }
        ];

        if ( types.search ) {
            params.push({key: "search", sign: "=", value: userInput.replace(/[^a-z6028\s]/gi, "")});
        }

        if ( categories ) {
            params.push({key: "category", sign: "=", value: categories});
        }

        setUri(pathname + createQuery(params))

    }, [ userInput, types.length, categories ]);

    useEffect(() => setIsLoading(prevInput !== userInput), [userInput, prevInput]);

    if ( isLoading )
        return <Loading/>;

    if ( !isLoading && userInput.length < 3 )
        return null;

    if ( !isLoading && !metrics?.length )
        return <div><p>
            No metrics to match <code style={{ border: "1px solid #b1b4b6", borderRadius: "2px", padding: "1px 2px"}}>{ userInput }</code>
            {
                categories || types
                    ? "."
                    : " and / or the defined criteria."
            }
        </p></div>;

    return <>
        <div className={ "govuk-form-group" }>
            <fieldset className="govuk-fieldset">
                <label htmlFor={ "metric-category" } className={ "govuk-label govuk-!-font-weight-bold" }>Filter by category</label>
                <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" } style={{ maxWidth: "30em" }}>
                    Optional. Select the category you want to include - for example,
                    select <strong>Cases</strong> to only include metrics associated with cases.
                </div>
                <Select name={ "metric-category" }
                        options={ categoryOptions }
                       placeholder={ "Select metric categories for your search" }
                        isClearable
                        styles={ ExtendedOptionStyles }
                        className={ "select" }
                       onChange={ ({ value }) => setCategory(value) }/>
            </fieldset>
            <fieldset className="govuk-fieldset govuk-!-margin-top-5">
                <label htmlFor={ "metric-tag" } className={ "govuk-label govuk-!-font-weight-bold" }>Filter by type</label>
                <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" } style={{ maxWidth: "30em" }}>
                    Optional. Select the types you want to include - for example,
                    select <strong>cumulative</strong> to only include cumulative metrics.
                </div>
                <Select name={ "metric-tag" } options={ tagOptions }
                       placeholder={ "Select metric types for your search" }
                        isClearable
                        isMulti
                        styles={ ExtendedOptionStyles }
                        className={ "select" }
                       onChange={ item => setType(item.map(({value}) => value)) }/>
            </fieldset>
        </div>
        <div className={ "govuk-!-margin-top-7" } style={{ display: "flex", justifyContent: "stretch", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                 className={ "govuk-!-margin-bottom-4" }>
                <h3 className={ "govuk-heading-m govuk-!-margin-bottom-0" }>Results</h3>
                <a className={ "govuk-link govuk-link--no-visited-state" }
                   href={ URLs["genericApiMetricSearch"] + `?search=${userInput}` }
                   download={ `metrics_${userInput}.json` }>Export results as JSON</a>
            </div>
            {
                metrics.map(item => <Option key={ item?.metric }>
                    <div className={ "govuk-!-margin-bottom-1" } style={{ display: "flex", justifyContent: "space-between"}}>
                        <Link className={ "govuk-link govuk-link--no-underline govuk-link--no-visited-state govuk-!-font-weight-bold" }
                              to={ "#" }
                              dangerouslySetInnerHTML={{ __html: item.metric_name.replace(new RegExp(userInput, "gi"), (match) => `<mark>${match}</mark>`) }}/>
                        <span className={ "govuk-tag govuk-!-margin-left-2" } style={{ fontSize: 14 }}>{ item.category }</span>
                    </div>
                    <div className={ "govuk-!-margin-bottom-2" }>
                        <strong className={ "govuk-!-font-size-14 govuk-!-margin-right-1" }>API name:</strong>
                        <code dangerouslySetInnerHTML={{ __html: item.metric.replace(new RegExp(userInput, "gi"), (match) => `<mark>${match}</mark>`) }}/>
                    </div>
                    <div className={ "govuk-!-margin-top-1" }>
                    { item.tags.map(tag => <span className={ "govuk-tag govuk-tag--blue govuk-!-margin-right-1" } style={{ fontSize: 12 }} key={ tag }>{ tag }</span>) }
                    </div>
                </Option>)
            }
        </div>
    </>

};


export const MetricType: ComponentType<*> = ({ ...props }) => {

    const { pathname } = useLocation();
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ uri, setUri ] = useState(pathname);
    const responseDelay = 1000;  // milliseconds
    const minInputChars = 3;

    const metricInputCallback = ({ target }) => {
        if ( target.value.length >=  minInputChars ) {
            setIsLoading(true);
            setTimeout(() => setUserInput(target.value), responseDelay);
        }
    };

    return <ColumnEntry { ...props }>
        <Container>
            <div className={ "govuk-form-group" } style={{ display: "flex" }}>
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                        <h2 className="govuk-heading-l govuk-!-margin-bottom-0">
                            Search metrics
                        </h2>
                    </legend>
                    <label htmlFor={ "metric-search" } className={ "govuk-label govuk-!-font-weight-bold" }>Metric</label>
                    <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" } style={{ maxWidth: "30em" }}>
                        Enter 3 or more characters from a metric name to see results.
                        For example, enter <strong>case</strong> to see all case metrics.
                    </div>
                    <input name={ "metric-search" } inputMode={ "search" } type={ "search" } autoComplete={ "off" }
                           placeholder={ "Enter 3 or more characters to search" }
                           onChange={ metricInputCallback }
                           className={ "govuk-input" } minLength={ "3" } maxLength={ "120" }/>
                </fieldset>
            </div>
            <Metrics userInput={ userInput } setIsLoading={ setIsLoading } isLoading={ isLoading } setUri={ setUri } uri={ uri }/>
        </Container>
        { userInput ? <Redirect to={ uri }/> : null }
    </ColumnEntry>

};  // AreaType

