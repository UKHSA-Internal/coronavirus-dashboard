// @flow

import React from "react";

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";

export const Category: ComponentType<*> = ({ ...props }) => {

    const payload = [
        {
            label: "Testing",
            id: "testing",
        },
        {
            label: "Cases",
            id: "cases",
        },
        {
            label: "Healthcare",
            id: "healthcare",
        },
        {
            label: "Vaccinations",
            id: "vaccinations",
        },
        {
            label: "Deaths",
            id: "deaths",
        }
    ];

    return payload.map(item =>
        <ColumnEntry { ...props } id={ item.id }
                     label={ item.label } key={ item.id }/>
    );

};  // AreaType
