// @flow

import React from "react";

import { NotAvailableContainer, AdmonitionText, AdmonitionContainer } from "./Widgets.styles";
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


export const Admonition: ComponentType<*> = ({ type="Warning", children }) => {

    return <AdmonitionContainer>
        <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
        <AdmonitionText>
            <span className="govuk-warning-text__assistive">{ type }</span>
            { children }
        </AdmonitionText>
    </AdmonitionContainer>

};  // Admonition