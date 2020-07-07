// @flow

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import 'moment/locale/en-gb';

import { analytics, getParams } from "common/utils";

import deepEqual from "deep-equal";

import LocationPicker from "./LocationPicker";
import { getParamValueFor } from "./utils";

import { PathNameMapper, NoPickerPaths, LocationBannerMapper } from "./Constants";


// Styles
import {
    MainContainer,
    HeaderContainer,
    Title,
    SectionBreak,
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


const DashboardHeader: ComponentType<Props> = ({}: Props) => {

    const
        history = useHistory(),
        [locationPickerState, setLocationPickerState] = useState(false),
        params = getParams(history.location.search),
        areaName = getParamValueFor(params, "areaName", "United Kingdom"),
        pathname = history.location.pathname,
        areaTypeOrder = getOrder(history),
        isExcluded = NoPickerPaths.indexOf(pathname) > -1,
        prevPathname = usePrevious(pathname),
        initialParam = getParams(history.location.query),
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

    const LocationPickerCallback = () => {
        analytics("Interaction", "Location picker", locationPickerState ? "OPEN" : "CLOSE");
        setLocationPickerState(state => !state)
    };

    return <MainContainer>
        <HeaderContainer>
            <Title pageName={ `${ PathNameMapper[history.location.pathname] } in` }
                   className={ locationPickerState ? "open" : "" }
                   onClick={ LocationPickerCallback }>{
                ( pathname && pathname !== "/" ) &&  areaName
            }</Title>
        </HeaderContainer>
        <SectionBreak/>
        {
            !isExcluded &&
            <LocationPicker show={ locationPickerState }
                            currentLocation={ location }
                            setCurrentLocation={ setLocation }/>
        }
        <LocationBanner pageTitle={ LocationBannerMapper?.[pathname] ?? null }
                        areaTypes={ Object.keys(areaTypeOrder).map(key => areaTypeOrder[key]) }
                        pathname={ pathname }/>
    </MainContainer>

};  // DashboardHeader


export default DashboardHeader;
