// @flow

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import moment from "moment";
import 'moment/locale/en-gb';

import { getParams } from "common/utils";

import deepEqual from "deep-equal";

import LocationPicker from "./LocationPicker";
import { getParamValueFor, getParamDateFor } from "./utils";

import { PathNameMapper, NoPickerPaths } from "./Constants";

import LocationProposer from "./LocationProposer";

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

import type { ComponentType } from 'react';
import type { Props } from './DashboardHeader.types';


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
        isExcluded = NoPickerPaths.indexOf(history.location.pathname) > -1,
        prevPathname = usePrevious(history.location.pathname),
        initialParam = getParams(history.location.query),
        [ prevPathnameState, setPrevPathnameState ] = useState(prevPathname),
        [ location, setLocation ] = useState({
            areaType: getParamValueFor(initialParam, "areaType", "overview"),
            areaName: getParamValueFor(initialParam, "areaName", "United Kingdom"),
        }),
        prevLocation = usePrevious(location);

    useEffect(() => {

        if ( !deepEqual(location, prevLocation) ) {

            setPrevPathnameState(prevPathname);
            setLocationPickerState(state => !state)
        }

    }, [ location, history.location.pathname ])

    return <MainContainer>
        <HeaderContainer>
            <Title>
                { PathNameMapper[history.location.pathname] }
            </Title>
            { !isExcluded &&
                <CollapsibleLinkContainer>
                    <CollapsibleLink className={ locationPickerState ? "opened" : "closed" }
                                     onClick={ () => setLocationPickerState(locationPickerState => !locationPickerState) }>
                        Change&nbsp;location:&nbsp;<CurrentLocation>{ areaName }</CurrentLocation>
                    </CollapsibleLink>
                </CollapsibleLinkContainer>
            }
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
                <LocationPicker show={ locationPickerState } currentLocation={ location }
                                setCurrentLocation={ setLocation }/>

                <LocationProposer lastParams={ [
                    { key: "areaType", sign: "=", value: location.areaType },
                    { key: "areaName", sign: "=", value: location.areaName }
                ] } referrer={ prevPathnameState }/>
            </>
        }
    </MainContainer>

};  // DashboardHeader


export default DashboardHeader;
