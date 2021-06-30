// @flow

import React, { useState } from "react";
import { Redirect, useLocation } from "react-router";
import { MainContainer as MainTabLinkContainer, TabsContainer, Tab } from "components/TabLink/TabLink.styles";
import { CasesMap } from "./CasesMap";
import { VaccinationsMap } from "./VaccinationsMap";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import { getParams } from "common/utils";

import { MainContainer, Container } from "./InteractiveMap.styles"

import type { ComponentType } from "react";
import { glAvailable } from "components/Map/utils";
import { DefaultTag } from "components/Card/Card.styles";


const NoWebGL: ComponentType<*> = ({ ...props }) => {

    return <Container { ...props }>
        <div>
            You must have WebGL installed and enabled on your browser to use the
            interactive map.
        </div>
    </Container>

};  // SectionHeader


const InteractiveMap: ComponentType<*> = () => {

    const { pathname } = useLocation();

    if ( !glAvailable() ) return <NoWebGL/>;

    return <MainTabLinkContainer>
        <TabsContainer className={ "govuk-!-margin-top-6 govuk-!-margin-left-2 govuk-!-margin-bottom-7" }>
            <Link to={ "/details/interactive-map/cases" }
                  aria-label={ "cases-map-container" }
                  className={ `${ pathname.indexOf("cases") > -1 ? 'active govuk-!-font-weight-bold' : '' } tab-link` }>
                Cases
            </Link>
            <Link to={ "/details/interactive-map/vaccinations" }
                 aria-label={ "vaccinations-map-container" }
                 className={ `${ pathname.indexOf("vaccinations") > -1 ? 'active govuk-!-font-weight-bold' : '' } tab-link` }>
                Vaccinations <DefaultTag className={ "govuk-tag" } style={{ marginLeft: "4px" }}>EXPERIMENTAL</DefaultTag>
            </Link>
        </TabsContainer>
        <MainContainer className={ "govuk-body" }>
            <Switch>
                <Route path="/details/interactive-map/cases" exact component={ CasesMap }/>
                <Route path="/details/interactive-map/vaccinations" component={ VaccinationsMap }/>
                <Route path="/details/interactive-map" component={ () => <Redirect to={ `/details/interactive-map/cases` }/> }/>
            </Switch>
        </MainContainer>

        <div className={ "markdown govuk-!-margin-top-5 govuk-body" } style={{ maxWidth: 50 + "em" }}>
            <h3 className={ "govuk-heading-m govuk-!-margin-top-6" }>Map areas</h3>
            <p>
                Find your area by using the postcode search or the zoom.
                The map shows data for different area types:
            </p>

            <ul className={ "govuk-list govuk-list--bullet" }>
                <li className={ "govuk-!-margin-bottom-1" }>
                    local authorities. These are divided into Upper Tier Local Authorities (UTLA) and Lower Tier Local
                    Authorities (LTLA) for areas with 2 tiers of local government, such as county council (upper tier)
                    and district council (lower tier).
                </li>
                <li>
                    Middle layer Super Output Areas (MSOA). These areas are smaller than local authorities, so show data
                    at the most local level.
                </li>
            </ul>

            <h3 className={ "govuk-heading-s govuk-!-margin-top-8" }>Copyright information</h3>
            <div className={ "govuk-body-s" }>
                <p className={ "govuk-body-s" }>
                    All data used in the map are available in the public domain and may be
                    downloaded from the relevant section of the website or via the API.
                </p>
                <ul className={ "govuk-list govuk-list--bullet govuk-body-s" }>
                    <li className={ "govuk-!-margin-bottom-1" }>Contains MSOA names &copy; Open Parliament copyright and database right 2020</li>
                    <li className={ "govuk-!-margin-bottom-1" }>Contains Ordnance Survey data &copy; Crown copyright and database right 2020</li>
                    <li className={ "govuk-!-margin-bottom-1" }>Contains Royal Mail data &copy; Royal Mail copyright and database right 2020</li>
                    <li className={ "govuk-!-margin-bottom-1" }>Contains Public Health England data &copy; Crown copyright and database right 2020</li>
                    <li>Office for National Statistics licensed under the Open Government Licence v.3.0</li>
                </ul>

                <p className={ "govuk-body-s" }>
                    Lookup products and data are supplied under the Open Government Licence.
                    You must use the above copyright statements when you reproduce or use the
                    materials, data, digital boundaries, or postcode products used in this
                    page.
                </p>
            </div>
        </div>
    </MainTabLinkContainer>

};


export default InteractiveMap;
