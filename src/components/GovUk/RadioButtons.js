import React from "react";
import { Radios } from "govuk-react-jsx";
import type { ComponentType } from "react";


export const Radio: ComponentType<*> = ({ heading, options, value, setValue }) => {

    if ( !heading ) return null;

    const id = heading.toLowerCase().replace(/[^a-z0-9_]+/g, "-");

    return <Radios
        value={ value }
        onChange={ e => setValue(e.target.value) }
        className="govuk-radios--inline govuk-!-margin-bottom-0"
        formGroup={{ className: 'govuk-radios--small govuk-!-margin-bottom-0' }}
        fieldset={{
          legend: { children: [''] }
        }}
        items={
            options
                .choices
                .map((choice, index) => ({ children: [ choice ], value: choice, id: `${id}-${index}` }))
        }
        name={ `${id}-option-choices` }
    />

};  // Radio
