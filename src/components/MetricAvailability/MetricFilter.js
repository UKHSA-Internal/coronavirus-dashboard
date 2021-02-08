// @flow

import React, { useState } from 'react';

import FormItem from "../Formset";

export const MetricFilter: ComponentType = ({ label, metricType, metricTypes, setMetricType }) => {

    const [checked, setChecked ] = useState(false);

    const setFilter = (event) => {
        setChecked(!checked);
        setMetricType(checked ? event.target.name : null);
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
                     key={ `checkbox-${ key }-${ index }` }
                     className="govuk-!-margin-bottom-1">
                    <label htmlFor={ key }>
                        <input
                            id={ `type-filter-${ index }` }
                            name={ key }
                            type="checkbox"
                            checked={ checked }
                            onChange={ (event) => setFilter(event)}
                            />
                        { key }
                    </label>
                </div>
            )

        }

    </FormItem>

}; // MetricFilter

export default MetricFilter;