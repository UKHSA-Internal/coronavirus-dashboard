// @flow

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createQuery, getParams, getParamValueFor } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import FormItem, { Form } from "components/Formset";

import type { ComponentType } from "react";


export const CategorySearch: ComponentType<*> = ({}) => {

    const history = useHistory();
    let params = getParams(history.location.search);
    const options = useGenericAPI(
        "genericApiChangeLogsComponent",
        null,
        {component: "titles"}
    );
    const [title, setTitle] = useState(getParamValueFor(params, "title", ""));

    useEffect(() => {
        if ( title ) {
            params.push({key: "title", sign: "=", value: title});
        } else {
            params = params.filter(item => item.key !== "title");
        }
        history.push({ search: createQuery(params) });
    }, [title]);

    if ( !options ) return <Loading/>;

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
        <FormItem aria-labelledby={ "aria-search-filter-label" }
             aria-describedby={ "aria-search-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <label id={ "category-filter-label" } className={ "govuk-label govuk-label--s" }>
                Category
            </label>
            <div className={ "govuk-hint govuk-!-font-size-16" } style={{ width: "90%" }}>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Filter data by a specific category &mdash; i.e. a page on the dashboard
                </p>
            </div>
            <div aria-describedby={ "search-filter-descr" }
                 aria-labelledby={ "search-filter-label" }
                 style={{ display: "flex", flexDirection: "row" }}>
                <select
                    id={ "category" }
                    name={ "category" }
                    style={{ width: "90%" }}
                    className={ "govuk-select" }
                    onChange={ e => setTitle(e.target.value) }
                    value={ title }
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