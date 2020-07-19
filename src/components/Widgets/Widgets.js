// @flow

import React from "react";

import { NotAvailableContainer } from "./Widgets.styles";
import type { ComponentType } from 'react';


export const NotAvailable: ComponentType = () => {

    return <NotAvailableContainer data-tip={ "Data not available" }
                                  data-for={ "table-tooltip-text" }>
        N/A
        <span className={ "govuk-visually-hidden" }>
            Data not currently available for this metric.
        </span>
    </NotAvailableContainer>

};  // NotAvailable
