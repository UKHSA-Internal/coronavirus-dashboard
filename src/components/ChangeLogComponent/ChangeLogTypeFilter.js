// @flow

import React from "react";

import FormItem from "components/Formset";

import type { ComponentType } from "react";


export const ChangeLogTypeFilter: ComponentType = ({ data, changeTypes, changeLogType, setChangeLogType }) => {


    return <FormItem aria-labelledby={ "aria-type-filter-label" }
                     aria-describedby={ "aria-type-filter-descr" }
                     width={ "full" }>

        <span id={ "type-filter-label" }
              className={ "govuk-label govuk-label--s" }>
            Type
        </span>

        {
            changeTypes.map((key, index) =>

                <div aria-describedby={ "type-filter-descr" }
                     aria-labelledby={ "type-filter-label" }
                     key={ `checkbox-${ key }-${ index }` }
                     className="govuk-!-margin-bottom-1">
                    <label htmlFor={ key }>
                        <input
                            id={ `type-filter-${ index }` }
                            name={ key }
                            type="checkbox"
                            checked={ changeLogType[key] }
                            onChange={ (event) =>
                                setChangeLogType( prev => ({...prev, [key]: !changeLogType[key] }))
                            }/>
                        { key }
                    </label>
                </div>
            )

        }

    </FormItem>

}; // ChangeLogType
