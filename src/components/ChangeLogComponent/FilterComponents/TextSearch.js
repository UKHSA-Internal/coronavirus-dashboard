// @flow

import React, { useState } from "react";
import { useHistory } from "react-router";
import { createQuery, getParams, getParamValueFor } from "common/utils";
import FormItem, { Form } from "components/Formset";
import type { ComponentType } from "react";


export const TextSearch: ComponentType<*> = ({ children }) => {

    const history = useHistory();
    let params = getParams(history.location.search);
    const [ search, setSearch ] = useState(getParamValueFor(params, "search", ""));

    const onSubmit = (e) => {
        e.preventDefault();

        if ( search ) {
            params.push({key: "search", sign: "=", value: search});
            history.push({ search: createQuery(params) });
        }
    };

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }
                  onSubmit={ onSubmit }>
        <FormItem aria-labelledby={ "aria-search-filter-label" }
             aria-describedby={ "aria-search-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <span
                id={ "search-filter-label" }
                className={ "govuk-label govuk-label--s" }>
                Search
            </span>
            <div className={ "govuk-hint govuk-!-font-size-16" }>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Enter a phrase to search &mdash; e.g. "headline figures"
                </p>
            </div>
            <div aria-describedby={ "search-filter-descr" }
                 aria-labelledby={ "search-filter-label" }
                 style={{ display: "flex", flexDirection: "row" }}>
                <input
                    id={ "search" }
                    name={ "search" }
                    value={ getParamValueFor(params,"search") }
                    // ref={ inputRef }
                    className={ "govuk-input govuk-input--width-15" }
                    type={ "search" }
                    maxLength={ 40 }
                    minLength={ 3 }
                    onChange={ e => setSearch(e.target.value) }
                />
                <label htmlFor={ "submit-search" }
                   className={ "govuk-visually-hidden" }>Submit search</label>
                <input className="govuk-button govuk-!-margin-bottom-0" id="submit-search"
                       name={ "submit-search" } data-module="govuk-button" type="submit" value=""/>
            </div>
        </FormItem>
    </Form>;

};  // PageComponent
