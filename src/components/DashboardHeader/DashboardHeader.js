// @flow

// React
import React, { useState } from "react";
import { withRouter } from 'react-router';

// Third party
import moment from "moment";
import 'moment/locale/en-gb';

import { getParams } from "common/utils";
import useHierarchy from "hooks/useHierarchy";

// Internal
import LocationPicker from "./LocationPicker";
import DateRangePicker from "./DateRangePicker";
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


const NoPickerPaths = [
    "/",
    "/about-data",
    "/cookies",
    "/accessibility",
    "/archive"
];


const DashboardHeader: ComponentType<Props> = ({ title, location: { search: query, pathname } }: Props) => {

    const
        hierarchy = useHierarchy(),
        [locationPickerState, setLocationPickerState] = useState(false),
        // [datePickerState, setDatePickerState] = useState(false),
        params = getParams(query),
        currentLocation = getParamValueFor(params, "areaName", "United Kingdom"),
        startDate = getParamDateFor(params, 'specimenDate', moment("2020-01-03"), ">"),
        endDate = getParamDateFor(params, "specimenDate", moment(), "<"),
        isExcluded = NoPickerPaths.indexOf(pathname) > -1;

    return <MainContainer>
        <HeaderContainer>
            <Title>{ PathNameMapper[pathname] }</Title>
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
                ? <LocationPicker hierarchy={ hierarchy }
                                  query={ query }
                                  pathname={ pathname }/>
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


export default withRouter(DashboardHeader);
