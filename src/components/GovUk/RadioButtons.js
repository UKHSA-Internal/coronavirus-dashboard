import React from "react";
import { Radios } from "govuk-react-jsx";
import type { ComponentType } from "react";


export const Radio: ComponentType<*> = ({ options, value, setValue }) => {

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
                .map(choice => ({ children: [ choice ], value: choice }))
        }
        name="option-choices"
    />

};  // Radio
