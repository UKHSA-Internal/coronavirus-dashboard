import React from "react";
import { Radios } from "govuk-react-jsx";
import type { ComponentType } from "react";


export const Radio: ComponentType<*> = ({ heading, options, value, setValue, inline=true, ...props }) => {

    if ( !heading ) return null;

    const radioId = heading.toLowerCase().replace(/[^a-z0-9_]+/g, "-");

    let clsName = "govuk-!-margin-bottom-0";

    if (inline) {
        clsName = `${clsName} govuk-radios--inline`;
    }

    const choices = [...options.choices];

    return <Radios
        value={ value }
        onChange={ e => setValue(e.target.value) }
        className={ clsName }
        items={
            choices.map((choice, index) => {

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
                }

            })
        }
        name={ `${radioId}-option-choices` }
        formGroup={{ className: `govuk-radios--small govuk-!-margin-bottom-0 ${ props?.groupClassName ?? "" }` }}
    />

};  // Radio
