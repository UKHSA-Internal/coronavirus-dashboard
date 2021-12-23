// @flow

import React, { useEffect, useState } from "react";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { MainContainer } from "./InteractiveMap.styles";
import Map from "components/VaccinationsMap";
import { MainContainer as MainTabLinkContainer } from "components/TabLink/TabLink.styles";
import { frameOptionToLabel, FrameOptions } from "components/VaccinationsMap/FrameOptionTools";
import type { ComponentType } from "react";
import { analytics } from "common/utils";


const MapOptions: ComponentType<*> = ({ frameOption, setFrameOption }) => {

    return <div>
        <p className={ "govuk-!-margin-top-7 govuk-!-font-weight-bold" }>
            Use the dropdowns to select the vaccination dose you would like
            see on each side of the map frame:
        </p>
        <div className={ "govuk-grid-row" }>
            <div className="govuk-form-group govuk-grid-column-one-half">
                <label className="govuk-label" htmlFor="sort">
                    Left side
                </label>
                <select className="govuk-select" id="sort" name="sort"
                        style={{ width: "90%" }} value={ frameOption.left }
                        onChange={ e => setFrameOption( prev => ({ ...prev, left: e.target.value})) }>
                    {
                        Object
                            .values(FrameOptions)
                            .map(item =>
                                <option key={ item } value={ item } disabled={ item === frameOption.right }>
                                    { frameOptionToLabel(item) }
                                </option>
                            )
                    }
                </select>
            </div>
            <div className="govuk-form-group govuk-grid-column-one-half">
                <label className="govuk-label" htmlFor="sort">
                    Right side
                </label>
                <select className="govuk-select" id="sort" name="sort"
                        style={{ width: "90%" }} value={ frameOption.right }
                        onChange={ e => setFrameOption( prev => ({ ...prev, right: e.target.value})) }>
                    {
                        Object
                            .values(FrameOptions)
                            .map(item =>
                                <option key={ item } value={ item } disabled={ item === frameOption.left }>
                                    { frameOptionToLabel(item) }
                                </option>
                            )
                    }
                </select>
            </div>
        </div>
    </div>;

};  // MapOptions


export const VaccinationsMap: ComponentType<*> = () => {

    const width = useResponsiveLayout(860);
    const [ frameOption, setFrameOption ] = useState({
        left: FrameOptions.SecondDose, right: FrameOptions.ThirdDoseAndBoosters
    });

    useEffect(() => {
        analytics({
            category: "map::vaccinations",
            action: "frame-switch",
            label: JSON.stringify(frameOption)
        });
    }, [ frameOption ]);

    return <>
        <MainTabLinkContainer>
            <MainContainer className={ "govuk-body govuk-!-margin-0" }>
                <div className={ "govuk-body govuk-!-margin-bottom-5" } style={{ maxWidth: 40 + "em" }}>
                    <p>
                        This map shows the percentage of people aged 12 and over who have
                        been vaccinated.
                    </p>
                    <MapOptions frameOption={ frameOption } setFrameOption={ setFrameOption } />
                    <p>
                        The left view shows <strong>{ frameOptionToLabel(frameOption.left) }</strong> and
                        the right view shows <strong>{ frameOptionToLabel(frameOption.right) }</strong> by
                        local authority. Zoom in for more local data and move the slider
                        to compare { frameOptionToLabel(frameOption.left) } and { frameOptionToLabel(frameOption.right) }.
                    </p>
                </div>
                <Map width={ width } frameOption={ frameOption }/>
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
