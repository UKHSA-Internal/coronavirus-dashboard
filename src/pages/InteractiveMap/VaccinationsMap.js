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
        <MainContainer className={ "govuk-body" }>
            <div className={ "govuk-!-margin-bottom-5" }>
                <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                    <strike>This map shows 7-day case rate per 100,000 people.</strike>
                </p>
                <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                    <strike>The default view shows data by local authority. Zoom in for more local data.</strike>
                </p>
            </div>
            <Map width={ width }/>
        </MainContainer>
    </MainTabLinkContainer>

};
