// @flow

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createQuery, getParams, getParamValueFor } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import FormItem, { Form } from "components/Formset";

import type { ComponentType } from "react";


export const TypeSearch: ComponentType<*> = ({}) => {

    const history = useHistory();
    let params = getParams(history.location.search);
        const options = useGenericAPI(
        "genericApiChangeLogsComponent",
        null,
        {component: "types"}
    );
    const [type, setType] = useState(getParamValueFor(params, "type", ""));

    useEffect(() => {
        if ( type ) {
            params.push({key: "type", sign: "=", value: type});
        } else {
            params = params.filter(item => item.key !== "type");
        }
        history.push({ search: createQuery(params) });
    }, [type]);

    if ( !options ) return <Loading/>;

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
        <FormItem aria-labelledby={ "aria-search-filter-label" }
             aria-describedby={ "aria-search-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <span id={ "search-filter-label" } className={ "govuk-label govuk-label--s" }>
                Type
            </span>
            <div className={ "govuk-hint govuk-!-font-size-16" } style={{ width: "80%" }}>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Filter data by a specific type &mdash; e.g. DATA ISSUES
                </p>
            </div>
            <div aria-describedby={ "search-filter-descr" }
                 aria-labelledby={ "search-filter-label" }
                 style={{ display: "flex", flexDirection: "row" }}>
                <select
                    id={ "search" }
                    name={ "search" }
                    style={{ width: "80%" }}
                    className={ "govuk-select" }
                    onChange={ e => setType(e.target.value) }
                    value={ type }
                >
                    <option value={ "" }>-------</option>
                    {
                        options.map(({ tag }) =>
                            <option key={ tag } value={ tag }>
                                { tag.toUpperCase() }
                            </option>
                        )
                    }
                </select>
            </div>
        </FormItem>
    </Form>;

};  // DateSearch
