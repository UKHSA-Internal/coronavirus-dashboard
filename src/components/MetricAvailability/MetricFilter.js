// @flow

import React, { useState, useEffect } from 'react';

import FormItem from "../Formset";

export const MetricFilter: ComponentType = ({ label, metricTypes, setMetricType }) => {

    let filterStats = {};
    Object.keys(metricTypes).map(key => {
        filterStats[key] = false;
    });

    const [checked, setChecked ] = useState(filterStats);

    const setFilter = (option) => {
        if (!checked[option]) {
            setMetricType(option);
        } else {
            setMetricType(null);
        }
        setChecked( {...filterStats, [option]: !checked[option] });
       
    }

    return <FormItem aria-labelledby={ "aria-type-filter-label" }
                     aria-describedby={ "aria-type-filter-descr" }
                     width={ "full" }>               

        <span id={ "type-filter-label" }
              className={ "govuk-label govuk-label--s" }>
            {label}
        </span>

        {
            metricTypes.map((key, index) => 

                <div aria-describedby={ "type-filter-descr" }
                     aria-labelledby={ "type-filter-label" }
                     id={ `checkbox-${ key }-${ index }` }
                     key={ `checkbox-${ key }-${ index }` }
                     className="govuk-!-margin-bottom-1">
                    <label htmlFor={ key }>
                        <input
                            id={ `type-filter-${ index }` }
                            name={ key }
                            type="checkbox"
                            checked={ checked[key] }
                            onChange={(event) => setFilter(key)}/>
                        { key }
                    </label>
                </div>
            )

        }

    </FormItem>

}; // MetricFilter

export default MetricFilter;