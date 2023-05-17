// @flow

import React from "react";
import { useHistory } from "react-router";
import { createQuery, getParams } from "common/utils";
import FormItem, { Form } from "components/Formset";
import type { ComponentType } from "react";


export const TextSearch: ComponentType<*> = ({textValue, setTextValue}) => {

    const history = useHistory();
    let params = getParams(history.location.search);

    const onSubmit = (e) => {
        e.preventDefault();

        if (textValue) {
            params = params.filter(item => item.key !== "search")
            params.push({key: "search", sign: "=", value: textValue});
        } else {
            params = params.filter(item => item.key !== "search")
        }

        history.push({ search: createQuery(params) });
    };

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }
                  onSubmit={ onSubmit }>
        <FormItem aria-labelledby={ "search-filter-label" }
             aria-describedby={ "search-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <label htmlFor={ "search" } id={ "search-filter-label" }
                   className={ "govuk-label govuk-label--s" }>Search</label>
            <div id={ "search-filter-descr" } className={ "govuk-hint govuk-!-font-size-16" }>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Enter a phrase to search &mdash; e.g. "headline figures"
                    <span className={ "govuk-visually-hidden" }>
                        Press return or click "Submit search" to apply the filter.
                    </span>
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                    id={ "search" }
                    name={ "search" }
                    value={textValue}
                    style={{ minWidth: "80%"}}
                    className={ "govuk-input govuk-input--width-15" }
                    type={ "search" }
                    maxLength={ 40 }
                    minLength={ 3 }
                    onChange={ e => setTextValue(e.target.value) }
                />
                <label htmlFor={ "submit-search" }
                   className={ "govuk-visually-hidden" }>Submit search</label>
                <input className="govuk-button govuk-!-margin-bottom-0" id="submit-search"
                       name={ "submit-search" } data-module="govuk-button" type="submit" value=""/>
            </div>
        </FormItem>
    </Form>;

};  // PageComponent
