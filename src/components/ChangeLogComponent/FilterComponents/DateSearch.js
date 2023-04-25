// @flow

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import FormItem, { Form } from "components/Formset";
import moment from "moment";

import type { ComponentType } from "react";


export const DateSearch: ComponentType<*> = ({dateValue, setDateValue}) => {

    const history = useHistory();
    const options = useGenericAPI(
        "genericApiChangeLogsComponent",
        null,
        {component: "dates"}
    );
    const params = useParams()

    const haldleChange = (e) => {
        setDateValue(e.target.value)

        if (e.target.value === "") {
            history.push({
                pathname: `/details/whats-new`,
                search: history.location.search
            })
        }
    }

    useEffect(() => {
        if (
            (!!params && dateValue && (params?.date != dateValue))
        ) {
            history.push({
                pathname: `/details/whats-new/${dateValue}`,
                search: history.location.search
            })
        }
    }, [dateValue, history, params]);

    if ( !options ) return <Loading/>;

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
        <FormItem aria-labelledby={ "date-filter-label" }
                  aria-describedby={ "date-filter-descr" }
                  className={ "inline govuk-!-margin-top-2" }
                  width={ "full" }>
            <label htmlFor={ "date" } id={ "date-filter-label" }
                   className={ "govuk-label govuk-label--s" }>Months</label>
            <div id={"date-filter-descr"} className={ "govuk-hint govuk-!-font-size-16" }>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Filter data by a specific month &mdash; e.g. June 2021
                    <span className={ "govuk-visually-hidden" }>
                        Your selection will be applied automatically.
                    </span>
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <select id={ "date" }
                        name={ "date" }
                        className={ "govuk-select" }
                        onChange={ e => haldleChange(e) }
                        value={dateValue}>
                    <option value={ "" }>-------</option>
                    {
                        options.map(item =>
                            <option key={ item.date }
                                value={ moment(item.date).format("YYYY-MM") }>
                                { moment(item.date).format("MMMM YYYY") }
                            </option>
                        )
                    }
                </select>
            </div>
        </FormItem>
    </Form>;

};  // DateSearch
