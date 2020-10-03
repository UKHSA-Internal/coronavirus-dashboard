import React from "react";
import { Radios } from "govuk-react-jsx";
import type { ComponentType } from "react";


export const Radio: ComponentType<*> = ({ heading, options, value, setValue, ...props }) => {

    if ( !heading ) return null;

    const radioId = heading.toLowerCase().replace(/[^a-z0-9_]+/g, "-");

    return <Radios
        value={ value }
        onChange={ e => setValue(e.target.value) }
        className={ `govuk-radios--inline govuk-!-margin-bottom-0` }
        items={
            options
                .choices
                .map((choice, index) => {

                    const id = `${radioId}-${index}`;

                    if ( typeof choice === "string" )
                        return {
                            children: [ choice ],
                            value: choice,
                            id
                        };

                    return {
                        children: [ choice.label ],
                        value: choice.value,
                        id,
                        ...choice
                    }

                })
        }
        name={ `${radioId}-option-choices` }
        formGroup={{ className: `govuk-radios--small govuk-!-margin-bottom-0 ${ props?.groupClassName ?? "" }` }}
    />

};  // Radio
