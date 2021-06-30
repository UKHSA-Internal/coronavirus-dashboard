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
                <p className={ "govuk-body" } style={{ maxWidth: 50 + "em" }}>
                    This is an experimental feature. It may change in the future based on
                    the feedback we receive.
                </p>
                <p className={ "govuk-body" } style={{ maxWidth: 50 + "em" }}>
                    This map shows the percentage of adults vaccinated. The left view
                    shows 1st doses and the right view shows 2nd doses at local authority.
                    Zoom in for more local data and use the slider to compare 1st and 2nd dose.
                </p>
            </div>
            <Map width={ width }/>
            <div className={ "markdown govuk-!-margin-top-5 govuk-body govuk-!-margin-bottom-0 govuk-!-margin-left-0" } style={{ maxWidth: 50 + "em" }}>
                <h3 className={ "govuk-heading-m govuk-!-margin-top-3" }>Vaccination updake</h3>
                <p>
                    Vaccination uptake is shown as a percentage of all people aged 18 and over. We calculate
                    this by dividing the total number of people who have received a vaccination by the population
                    and multiplying by 100.
                </p>
                <p>
                    For English areas, the population used is the number of people of the National Immunisation
                    Management Service (NIMS) database. For Scottish areas, the population used in the mid-2019
                    population estimate from National Records of Scotland. Comparisons between English and Scottish
                    areas should be made with caution.
                </p>
            </div>
        </MainContainer>
    </MainTabLinkContainer>

};
