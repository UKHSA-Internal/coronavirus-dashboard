// @flow

import React from "react";

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";


export const AreaTypes: ComponentType<*> = ({ ...props }) => {

    const payload = [
        {
            label: "Overview",
            id: "overview",
            description: "Metrics available for the United Kingdom."
        },
        {
            label: "Nation",
            id: "nation",
            description: "Metrics available for different nations of the United Kingdom."
        },
        {
            label: "Region",
            id: "region",
            description: "Metrics available for regions of England."
        },
        {
            label: "NHS Region",
            id: "nhsRegion",
            description: "Metrics available for healthcare regions of England."
        },
        {
            label: "Upper Tier Local Authority (UTLA)",
            id: "utla",
            description: "Metrics available for upper tier local authorities in England and unitary authorities in the devolved administrations."
        },
        {
            label: "Lower Tier Local Authority (LTLA)",
            id: "ltla",
            description: "Metrics available for lower tier local authorities in England.",
        },
        {
            label: "NHS Trust",
            id: "nhsTrust",
            description: "Metrics available for healthcare trusts in England.",
        },
        {
            label: "Middle-layer Super Output Area (MSOA)",
            id: "msoa",
            description: "Metrics available for local areas in England.",
        }
    ];

    return payload.map(item =>
        <ColumnEntry { ...props } { ...item } key={ item.id }/>
    );

};  // AreaType
