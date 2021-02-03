// @flow

import React, { useEffect, useRef } from 'react';

import FormItem from "../Formset";

export const searchContent = (data, token) => {

    return ( !token || (token?.length ?? 0) === 0 ) ||
        new RegExp(token, 'ig').exec(`${data?.headline ?? ""} ${data.body}`) !== null

};

export const MetricTextSearch: ComponentType = ({ metricSearch, setMetricSearch }) => {

    const inputRef = useRef();

    useEffect(() => {
        if ( metricSearch ) inputRef.current.focus();
    }, [metricSearch]);

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
                value={ metricSearch }
                ref={ inputRef }
                className={ "govuk-input govuk-input--width-15" }
                type={ "text" }
                onChange={ item => setMetricSearch(item.target.value) }/>
        </div>
    </FormItem>

}; // MetricTextSearch

export default MetricTextSearch