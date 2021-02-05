// @flow

import React from 'react';

import FormItem from "../Formset";

export const MetricFilter: ComponentType = ({ label, metricType, metricTypes, setMetricType }) => {

   
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
                            checked={key === metricType}
                            onChange={ (event) => setMetricType(event.target.name)}
                            />
                        { key }
                    </label>
                </div>
            )

        }

    </FormItem>

}; // MetricFilter

export default MetricFilter;