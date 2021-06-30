// @flow

import React from "react";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { MainContainer } from "./InteractiveMap.styles";
import Map from "components/VaccinationsMap";
import { MainContainer as MainTabLinkContainer } from "components/TabLink/TabLink.styles";

import type { ComponentType } from "react";


export const VaccinationsMap: ComponentType<*> = () => {

    const width = useResponsiveLayout(860);

    return <MainTabLinkContainer>
        <MainContainer className={ "govuk-body govuk-!-margin-0" }>
            <div className={ "govuk-!-margin-bottom-5" }>
                <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                    This map shows the percentage of adults vaccinated. The left view
                    shows 1st doses at local authority. Zoom in for more local data and
                    use the slider to compare 1st and 2nd dose.
                </p>
            </div>
            <Map width={ width }/>
        </MainContainer>
    </MainTabLinkContainer>

};
