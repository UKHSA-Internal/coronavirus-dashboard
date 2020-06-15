// @flow

// React
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router';
import { useHistory } from "react-router";

// Third party
import moment from "moment";
import 'moment/locale/en-gb';

import { getParams } from "common/utils";
import useHierarchy from "hooks/useHierarchy";

// Internal
import LocationPicker from "./LocationPicker";
// import DateRangePicker from "./DateRangePicker";
import { getParamValueFor, getParamDateFor } from "./utils";

// Styles
import {
    MainContainer,
    HeaderContainer,
    Title,
    CollapsibleLinkContainer,
    CollapsibleLink,
    CollapsibleLinkText,
    TriangleRight,
    TriangleDown,
    SectionBreak
} from './DashboardHeader.styles'

// Types
import type { ComponentType } from 'react';
import type { Props } from './DashboardHeader.types';


// Global constants
const PathNameMapper = {
    "/": "UK Summary",
    "/cases": "Cases",
    "/testing": "Testing",
    "/healthcare": "Healthcare",
    "/deaths": "Deaths",
    "/about-data": "About data",
    "/cookies": "Cookies",
    "/accessibility": "Accessibility",
    "/archive": "Archive"
};

export const PathNames = {
    // Only use lower case in paths.
    summary: "/",
    cases: "/cases",
    testing: "/testing",
    healthcare: "/healthcare",
    deaths: "/deaths",
    aboutData: "/about-data",
    cookies: "cookies",
    accessibility: "/accessibility",
    archive: "/archive"
}


const NoPickerPaths = [
    "/",
    "/about-data",
    "/cookies",
    "/accessibility",
    "/archive"
];


const DashboardHeader: ComponentType<Props> = ({ title }: Props) => {

    const
        history = useHistory(),
        hierarchy = useHierarchy(),
        [locationPickerState, setLocationPickerState] = useState(false),
        // [datePickerState, setDatePickerState] = useState(false),
        params = getParams(history.location.search),
        currentLocation = getParamValueFor(params, "areaName", "United Kingdom"),
        startDate = getParamDateFor(params, 'specimenDate', moment("2020-01-03"), ">"),
        endDate = getParamDateFor(params, "specimenDate", moment(), "<"),
        isExcluded = NoPickerPaths.indexOf(history.location.pathname) > -1;

    useEffect(() => {

        setLocationPickerState(false)

    },  [  history.location.pathname ])

    return <MainContainer>
        <HeaderContainer>
            <Title>{ PathNameMapper[history.location.pathname] }</Title>
            { isExcluded
                ? null
                : <CollapsibleLinkContainer>
                    <CollapsibleLink htmlType={ "button" }
                        onClick={ () => setLocationPickerState(!locationPickerState) }>
                        { locationPickerState ? <TriangleDown/> : <TriangleRight/> }
                        <CollapsibleLinkText>
                            <strong>Location:</strong>&nbsp;{ currentLocation }
                        </CollapsibleLinkText>
                    </CollapsibleLink>
                    {/*<CollapsibleLink htmlType={ "button" }*/}
                    {/*    onClick={ () => setDatePickerState(!datePickerState) }>*/}
                    {/*    { datePickerState ? <TriangleDown/> : <TriangleRight/> }*/}
                    {/*    <CollapsibleLinkText>*/}
                    {/*        <strong>Date:</strong>&nbsp;{ startDate.format("D MMM YYYY") }&nbsp;-&nbsp;{ endDate.format("D MMM YYYY") }*/}
                    {/*    </CollapsibleLinkText>*/}
                    {/*</CollapsibleLink>*/}
                </CollapsibleLinkContainer>
            }
        </HeaderContainer>
        <SectionBreak />

        {
            ( locationPickerState && !isExcluded )
                ? <LocationPicker hierarchy={ hierarchy }/>
                : null
        }
        {/*{*/}
        {/*    ( datePickerState && !isExcluded )*/}
        {/*        ? <DateRangePicker query={ query }*/}
        {/*                           startDate={ startDate }*/}
        {/*                           endDate={ endDate }/>*/}
        {/*        : null*/}
        {/*}*/}
    </MainContainer>

};  // DashboardHeader


export default DashboardHeader;
