// @flow

import React from "react";

import { LogArea, LogAreasContainer, AffectedAreas } from "./AssociatedAreas.styles";

import type { ComponentType } from "react";


const sortFunc = (a, b) =>
    a === "UK" ? -1 : b === "UK" ? 1 : a > b || -1; // sortFunc


const AssociatedAreas: ComponentType<*> = ({ areas, ...props }) => {

    return <AffectedAreas { ...props }>
        <span className={ "govuk-!-font-weight-regular" }>Affected&nbsp;areas:</span>
        <LogAreasContainer>{
            !areas.length
                ? <span className={ "na" }>N/A</span>
                : areas.sort(sortFunc).map(item => <LogArea key={ item }>{ item }</LogArea>)
        }</LogAreasContainer>
    </AffectedAreas>;

};  // AssociatedAreas


export default AssociatedAreas;
