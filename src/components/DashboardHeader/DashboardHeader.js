// @flow

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ReactTooltip from "react-tooltip";
import deepEqual from "deep-equal";
import 'moment/locale/en-gb';

import usePrevious from "hooks/usePrevious";
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
    TitleButton,
    SectionBreak, TriangleMarker,
} from './DashboardHeader.styles'

import type { ComponentType } from 'react';
import type { Props } from './DashboardHeader.types';


const PageHeader = ({ areaName, localisationState, localisationCallback }) => {

    const
        preppedLabel = areaName
            .toLowerCase()
            .replace(/[\s:]/g, "_"),
        { location: { pathname } } = useHistory(),
        uri = /^(\/(details\/)?[^/]+).*/.exec(pathname)?.[1],
        pageName = PathNameMapper[uri]?.title ?? "",
        noPicker = NoPickerPaths.indexOf(uri) > -1;

    return <>
        <HeaderContainer role={ "heading" }
                         aria-level={ 1 }>
            <Title data-for={ !noPicker && "open-localisation-tooltip" }
                   data-tip={ !noPicker && "Click to change location" }
                   id={ `page-heading-${ preppedLabel }` }
                   className={ localisationState ? "open" : "" }>
                { `${ pageName }${ noPicker ? "" : " in" }` }
                { noPicker
                    ? null
                    : (pathname && pathname !== "/") &&
                        <TitleButton aria-describedby={ `${ preppedLabel }-loc-desc` }
                                     onClick={ localisationCallback }>
                            { areaName }&nbsp;<TriangleMarker direction={ localisationState ? "up" : "down" }/>
                            <span id={ `${ preppedLabel }-loc-desc` }
                                  className={ "govuk-visually-hidden" }>
                                Click to open the localisation banner, which provides options to
                                switch location and receive data at different geographical
                                levels.
                            </span>
                        </TitleButton>
                }
            </Title>
        </HeaderContainer>
        <SectionBreak/>
    </>;

};  // PageHeader


const DashboardHeader: ComponentType<Props> = ({}: Props) => {

    const
        history = useHistory(),
        [locationPickerState, setLocationPickerState] = useState(false),
        params = getParams(history.location.search),
        areaName = getParamValueFor(params, "areaName", "United Kingdom"),
        pathname = history.location.pathname,
        areaTypeOrder = getOrder(history),
        uri = /^(\/(details\/)?[^/]+).*/.exec(pathname)?.[1],
        isExcluded = NoPickerPaths.indexOf(uri) > -1,
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

    const locationPickerCallback = () => {
        analytics("Interaction", "Location picker", locationPickerState ? "OPEN" : "CLOSE");
        setLocationPickerState(state => !state)
    };

    return <MainContainer>
        <PageHeader areaName={ areaName }
                    localisationState={ locationPickerState }
                    localisationCallback={ locationPickerCallback }/>
        {
            !isExcluded
                ? <LocationPicker show={ locationPickerState }
                                  currentLocation={ location }
                                  setCurrentLocation={ setLocation }/>
                : null
        }
        {
            !isExcluded
                ? <LocationBanner pageTitle={ LocationBannerMapper?.[pathname] ?? null }
                                  areaTypes={ Object.keys(areaTypeOrder).map(key => areaTypeOrder[key]) }
                                  pathname={ pathname }/>
                : null
        }
        <ReactTooltip id={ "open-localisation-tooltip" }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </MainContainer>;

};  // DashboardHeader


export default DashboardHeader;
