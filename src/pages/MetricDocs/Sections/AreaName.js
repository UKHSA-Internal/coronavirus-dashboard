// @flow

import React from "react";

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";


export const AreaNames: ComponentType<*> = ({ ...props }) => {

    const payload = [
        {
            label: "United Kingdom",
            areaType: "overview",
            id: "United Kingdom",
        },
        {
            label: "England",
            areaType: "nation",
            id: "England",
        },
        {
            label: "London",
            areaType: "region",
            id: "London",
        }
    ];

    return payload.map(item =>
        <ColumnEntry { ...props } id={ item.id }
                     label={ item.label } key={ item.id }/>
    );

};  // AreaType
