// @flow

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import moment from "moment";
import 'moment/locale/en-gb';

import { analytics, getParams } from "common/utils";

import deepEqual from "deep-equal";

import LocationPicker from "./LocationPicker";
import { getParamValueFor, getParamDateFor } from "./utils";

import { PathNameMapper, NoPickerPaths, LocationBannerMapper } from "./Constants";

// import LocationProposer from "./LocationProposer";

// Styles
import {
    MainContainer,
    HeaderContainer,
    Title,
    CollapsibleLinkContainer,
    CollapsibleLink,
    SectionBreak,
    CurrentLocation
} from './DashboardHeader.styles'
import { getOrder } from "./GenericHooks";
import type { ComponentType } from 'react';
import type { Props } from './DashboardHeader.types';
import LocationBanner from "components/LocationBanner";


const usePrevious = (value) => {

    const ref = useRef(value);

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};  // usePrevious


const DashboardHeader: ComponentType<Props> = ({ title }: Props) => {

    const
        history = useHistory(),
        [locationPickerState, setLocationPickerState] = useState(false),
        // [datePickerState, setDatePickerState] = useState(false),
        params = getParams(history.location.search),
        areaName = getParamValueFor(params, "areaName", "United Kingdom"),
        startDate = getParamDateFor(params, 'specimenDate', moment("2020-01-03"), ">"),
        endDate = getParamDateFor(params, "specimenDate", moment(), "<"),
        pathname = history.location.pathname,
        areaTypeOrder = getOrder(history),
        // prevPathname
        isExcluded = NoPickerPaths.indexOf(pathname) > -1,
        prevPathname = usePrevious(pathname),
        initialParam = getParams(history.location.query),
        // [ prevPathnameState, setPrevPathnameState ] = useState(prevPathname),
        [ location, setLocation ] = useState({
            areaType: getParamValueFor(initialParam, "areaType", "overview"),
            areaName: getParamValueFor(initialParam, "areaName", "United Kingdom"),
        }),
        prevLocation = usePrevious(location);

    useEffect(() => {

        if ( location.areaName && !deepEqual(location.areaName, prevLocation.areaName) )
            setLocationPickerState(false);

    }, [ location.areaName, prevLocation.areaName ])

    useEffect(() => {

        if ( pathname !== prevPathname )
            setLocation({
                areaType: getParamValueFor(initialParam, "areaType", "overview"),
                areaName: getParamValueFor(initialParam, "areaName", "United Kingdom"),
            });

    }, [ pathname, prevPathname ])

    return <MainContainer>
        <HeaderContainer>
            <Title pageName={ `${ PathNameMapper[history.location.pathname] } in` }
                   className={ locationPickerState ? "open" : "" }
                   onClick={ () => setLocationPickerState(state => !state) }>{
                (pathname && pathname !== "/") &&  areaName
            }</Title>
                    {/*<CollapsibleLink htmlType={ "button" }*/}
                    {/*    onClick={ () => setDatePickerState(!datePickerState) }>*/}
                    {/*    { datePickerState ? <TriangleDown/> : <TriangleRight/> }*/}
                    {/*    <CollapsibleLinkText>*/}
                    {/*        <strong>Date:</strong>&nbsp;{ startDate.format("D MMM YYYY") }&nbsp;-&nbsp;{ endDate.format("D MMM YYYY") }*/}
                    {/*    </CollapsibleLinkText>*/}
                    {/*</CollapsibleLink>*/}
        </HeaderContainer>
        <SectionBreak/>
        {/*{*/}
        {/*    ( datePickerState && !isExcluded )*/}
        {/*        ? <DateRangePicker query={ query }*/}
        {/*                           startDate={ startDate }*/}
        {/*                           endDate={ endDate }/>*/}
        {/*        : null*/}
        {/*}*/}
        {
            !isExcluded &&
            <>
                <LocationPicker show={ locationPickerState }
                                currentLocation={ location }
                                setCurrentLocation={ setLocation }/>

                {/*<LocationProposer lastParams={ [*/}
                {/*    { key: "areaType", sign: "=", value: location.areaType },*/}
                {/*    { key: "areaName", sign: "=", value: location.areaName }*/}
                {/*] } referrer={ prevPathnameState }/>*/}
            </>
        }
        <LocationBanner pageTitle={ LocationBannerMapper?.[pathname] ?? null }
                        areaTypes={ Object.keys(areaTypeOrder).map(key => areaTypeOrder[key]) }
                        pathname={ pathname }/>
    </MainContainer>

};  // DashboardHeader


export default DashboardHeader;
