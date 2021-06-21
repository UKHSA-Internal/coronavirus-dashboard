// @flow

import React from "react";
import { Formset } from "./formset.styles";

import type { ComponentType } from "react";


const FormItem: ComponentType<*> = ({ children, width="one-half", className="", ...props }) => {

    return <Formset className={ `${className} ${width}` } { ...props }>
        { children }
    </Formset>

};  // FormItem


export default FormItem;
