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
    CollapsibleLink,
    HeaderContainer,
    Title,
    TriangleRight,
    TriangleDown,
    CollapsibleLinkContainer,
    MainContainer
} from './DashboardHeader.styles'

// Types
import type { ComponentType } from 'react';
import type { Props } from './DashboardHeader.types';


// Global constants
const PathNameMapper = {
    "/": "UK Summary",
    "/cases": "Cases",
    "/tests": "Tests",
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
        [datePickerState, setDatePickerState] = useState(false),
        params = getParams(query),
        currentLocation = getParamValueFor(params, "areaName", "United Kingdom"),
        startDate = getParamDateFor(params, 'specimenDate', moment("2020-01-30"), ">"),
        endDate = getParamDateFor(params, "specimenDate", moment(), "<"),
        isExcluded = NoPickerPaths.indexOf(pathname) > -1;

    return <MainContainer className={ "sticky-header govuk-!-padding-top-3" }>
        <HeaderContainer className={ "util-flex util-flex-justify-between util-flex-wrap util-flex-align-items-center" }>
            <Title>{ PathNameMapper[pathname] }</Title>
            { isExcluded
                ? null
                : <CollapsibleLinkContainer>
                    <CollapsibleLink htmlType={ "button" }
                        onClick={ () => setLocationPickerState(!locationPickerState) }
                        className={ "govuk-!-margin-right-6" }>
                        { locationPickerState ? <TriangleDown/> : <TriangleRight/> }
                        <span className={ "govuk-body-s govuk-body govuk-body govuk-!-margin-bottom-0" }>
                            <b>Location:</b>&nbsp;{ currentLocation }
                        </span>
                    </CollapsibleLink>
                    <CollapsibleLink htmlType={ "button" }
                        onClick={ () => setDatePickerState(!datePickerState) }>
                        { datePickerState ? <TriangleDown/> : <TriangleRight/> }
                        <span className={ "govuk-body-s change-location govuk-body govuk-!-margin-bottom-0 " }>
                            <b>Date:</b>&nbsp;{ startDate.format("D MMM YYYY") }&nbsp;-&nbsp;{ endDate.format("D MMM YYYY") }
                        </span>
                    </CollapsibleLink>
                </CollapsibleLinkContainer>
            }
        </HeaderContainer>
        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>

        {
            ( locationPickerState && !isExcluded )
                ? <LocationPicker hierarchy={ hierarchy } query={ query }/>
                : null
        }
        {
            ( datePickerState && !isExcluded )
                ? <DateRangePicker query={ query } startDate={ startDate } endDate={ endDate }/>
                : null
        }
    </MainContainer>

};  // DashboardHeader


export default withRouter(DashboardHeader);
