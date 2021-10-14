// @flow

import React from "react";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { MainContainer } from "./InteractiveMap.styles";
import Map from "components/VaccinationsMap";
import { MainContainer as MainTabLinkContainer } from "components/TabLink/TabLink.styles";

import type { ComponentType } from "react";


export const VaccinationsMap: ComponentType<*> = () => {

    const width = useResponsiveLayout(860);

    return <>
        <MainTabLinkContainer>
            <MainContainer className={ "govuk-body govuk-!-margin-0" }>
                <div className={ "govuk-body govuk-!-margin-bottom-5" } style={{ maxWidth: 40 + "em" }}>
                    <p>
                        This map shows the percentage of people aged 12 and over who have
                        been vaccinated.
                    </p>
                    <p>
                        The left view shows 1st doses and the right view shows 2nd doses
                        by local authority. Zoom in for more local data and move the slider
                        to compare 1st and 2nd dose.
                    </p>
                </div>
                <Map width={ width }/>
            </MainContainer>
        </MainTabLinkContainer>
        <div className={ "markdown govuk-body govuk-!-margin-bottom-0 govuk-!-margin-top-7" }
             style={{ maxWidth: 50 + "em" }}>
            <h3 className={ "govuk-heading-m govuk-!-margin-top-3" }>
                Percentage of people aged 12 and over who have been vaccinated
            </h3>
            <p>
                The percentage of all people aged 12 and over who have been vaccinated.
                We calculate this by dividing the total number of people who have received
                a vaccination by the population and multiplying by 100.
            </p>
            <p>
                For English areas, the population used is the number of people of the National Immunisation
                Management Service (NIMS) database. For Scottish areas, the population used is the mid-2020
                population estimate from National Records of Scotland. Comparisons between English and Scottish
                areas should be made with caution.
            </p>
        </div>
    </>
};
