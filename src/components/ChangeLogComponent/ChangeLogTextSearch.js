// @flow

import React, { useEffect, useRef } from "react";

import FormItem from "../Formset";

import type { ComponentType } from "react";



export const searchContent = (data, token) => {

    return ( !token || (token?.length ?? 0) === 0 ) ||
        new RegExp(token, 'ig').exec(`${data?.headline ?? ""} ${data.body}`) !== null

};


export const ChangeLogTextSearch: ComponentType = ({ changeLogSearch, setChangeLogSearch }) => {

    const inputRef = useRef();

    useEffect(() => {
        if ( changeLogSearch ) inputRef.current.focus();
    }, [changeLogSearch]);

    return <FormItem aria-labelledby={ "aria-search-filter-label" }
                     aria-describedby={ "aria-search-filter-descr" }
                     className={ "govuk-!-margin-top-2" }
                     width={ "full" }>
            <span
                id={ "search-filter-label" }
                className={ "govuk-label govuk-label--s" }>
                Search
            </span>

        <div aria-describedby={ "search-filter-descr" }
             aria-labelledby={ "search-filter-label" }>
            <input
                id={ "search-filter-id" }
                value={ changeLogSearch }
                ref={ inputRef }
                className={ "govuk-input govuk-input--width-15" }
                type={ "text" }
                onChange={ item => setChangeLogSearch(item.target.value) }/>
        </div>
    </FormItem>

}; // ChangeLogTextSearch
