// @flow

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createQuery, getParams, getParamValueFor } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import FormItem, { Form } from "components/Formset";

import type { ComponentType } from "react";


export const CategorySearch: ComponentType<*> = ({categoryValue, setCategoryValue}) => {

    const history = useHistory();
    let params = getParams(history.location.search);
    const options = useGenericAPI(
        "genericApiChangeLogsComponent",
        null,
        {component: "titles"}
    );

    const handleChange = (e) => {
        setCategoryValue(e.target.value)

        if (e.target.value === "") {
            params = params.filter(item => item.key != "title");
            history.push({ search: createQuery(params) });
        }
    }

    useEffect(() => {
        if (categoryValue) {
            params.push({key: "title", sign: "=", value: categoryValue});
        } else {
            params = params.filter(item => item.key !== "title");
        }

        if( params !== undefined && params.length !== 0 ) {
            history.push({ search: createQuery(params) });
        }
    }, [categoryValue]);

    if ( !options ) return <Loading/>;

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
        <FormItem aria-labelledby={ "category-filter-label" }
             aria-describedby={ "category-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <label id={ "category-filter-label" } className={ "govuk-label govuk-label--s" }>
                Category
            </label>
            <div id={ "category-filter-descr" } className={ "govuk-hint govuk-!-font-size-16" }>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Filter data by a specific category &mdash; i.e. a page on the dashboard
                    <span className={ "govuk-visually-hidden" }>
                        Note that your selection will be applied automatically.
                    </span>
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <select
                    id={ "category" }
                    name={ "category" }
                    className={ "govuk-select" }
                    onChange={ e => handleChange(e) }
                    value={categoryValue}
                >
                    <option value={ "" }>-------</option>
                    {
                        options.map(({ title }) =>
                            <option key={ title } value={ title }>
                                { title }
                            </option>
                        )
                    }
                </select>
            </div>
        </FormItem>
    </Form>;

};  // DateSearch
