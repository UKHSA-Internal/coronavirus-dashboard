// @flow

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import ReactTooltip from "react-tooltip";
import deepEqual from "deep-equal";
import 'moment/locale/en-gb';

import LocationPicker from "./LocationPicker";
import LocationBanner from "components/LocationBanner";
import { analytics, getParams } from "common/utils";
import { getParamValueFor } from "./utils";
import { getOrder } from "./GenericHooks";
import {
    PathNameMapper,
    NoPickerPaths,
    LocationBannerMapper
} from "./Constants";

import {
    MainContainer,
    HeaderContainer,
    Title,
    SectionBreak,
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
                   data-for={ "open-localisation-tooltip" }
                   data-tip={ "Click to change location" }
                   className={ locationPickerState ? "open" : "" }
                   onClick={ LocationPickerCallback }>{
                ( pathname && pathname !== "/" ) &&  areaName
            }
            <span className={ "govuk-visually-hidden" }>
                Click to change location
            </span>
            </Title>
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

        <ReactTooltip id={ "open-localisation-tooltip" }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </MainContainer>

};  // DashboardHeader


export default DashboardHeader;
