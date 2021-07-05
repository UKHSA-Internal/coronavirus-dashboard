// @flow

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getParams, getParamValueFor, scaleColours as colours } from "common/utils";
import { useMapData } from "hooks/useMapData";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { MainContainer, Slider } from "./InteractiveMap.styles";
import Loading from "components/Loading";
import Map from "components/Map";
import { MainContainer as MainTabLinkContainer } from "components/TabLink/TabLink.styles";
import moment from "moment";
import Plotter from "components/Plotter";

import type { ComponentType } from "react";


const AreaLevel = {
    nation: {
        geoJSON: "geo/countries_v2.geojson",
        data: "maps/nation_data_latest.geojson",
        type: "nation",
        geoKey: "ctry19",
        label: "Nations"
    },
    region: {
        geoJSON: "geo/regions_v2.geojson",
        data: "maps/region_data_latest.geojson",
        type: "region",
        geoKey: "rgn18",
        label: "Regions"
    },
    ltla: {
        geoJSON: "geo/ltlas_v2.geojson",
        data: "maps/ltla_data_latest.geojson",
        type: "ltla",
        geoKey: "lad19",
        label: "Local authorities"
    },
    utla: {
        geoJSON: "geo/utlas_v2.geojson",
        data: "maps/utla_data_latest.geojson",
        type: "utla",
        geoKey: "ctyua19cd",
        label: "Local authorities"
    },
    msoa: {
        geoJSON: "geo/msoa_adjusted.geojson",
        data: "maps/MSOAs_data_latest.geojson",
        type: "msoa",
        geoKey: "msoa11",
        label: "MSOAs"
    }
};


const SliderComponent: ComponentType<*> = ({ dates, currentDate, setCurrentDate, width }) => {

    if ( width !==  "desktop" ) return null;

    return <>
        <label id={ "month" }
               className={ "govuk-body govuk-!-font-weight-bold" }
               htmlFor={ "slider" }>
            Case rate per 100,000 people for 7&ndash;day period ending
            on <time dateTime={ currentDate }>{ moment(currentDate).format("D MMMM YYYY") }</time>:
        </label>
        <Slider id="slider"
                   min={ 0 }
                   max={ (dates.length ?? 0) - 1 }
                   value={ dates.indexOf(currentDate) ?? 0 }
                   length={ dates.length }
                   onChange={ event => setCurrentDate(dates[parseInt(event.target.value)]) }/>
        <Plotter type={ "XAxis" }
                 data={ [{ x: dates, y: Array(dates.length).fill(null) }] }/>
    </>;

};  // SliderComponent


export const CasesMap: ComponentType<*> = () => {

    const
        { search: query } = useLocation(),
        params = getParams(query),
        period = getParamValueFor(params, "period", "daily"),
        areaType = getParamValueFor(params, "areaType", "nation"),
        refData = useMapData(`maps/${areaType}_percentiles.json`),
        [ dates, setDates ] = useState(null) ,
        [ currentDate, setCurrentDate ] = useState(null),
        [ extrema, setExtrema ] = useState({ min: 0, first: .25, second: .5, third: .75, max: 1 }),
        width = useResponsiveLayout(860);

    useEffect(() => {
        if ( refData?.complete ) {
            setDates(Object.keys(refData).filter(key => key !== "complete"));
        }
    }, [refData?.complete]);

    useEffect(() => {
        if ( dates )
            setCurrentDate(dates[dates.length - 1]);
    }, [dates]);

    useEffect(() => {

        if ( refData?.complete )
            setExtrema(refData?.[currentDate] ?? refData.complete);

    }, [currentDate, refData?.complete]);

    useEffect(() =>{
        if ( period === "all_time" ) {
            setCurrentDate(null)
        }
    }, [period]);

    if ( !dates || !extrema || !currentDate ) return <Loading/>;

    return <>
        <MainTabLinkContainer>
            <div className={ "govuk-!-margin-bottom-5" }>
                <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                    This map shows 7-day case rate per 100,000 people.
                </p>
                <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                    The default view shows data by local authority. Zoom in for more local data.
                </p>
            </div>
            <MainContainer className={ "govuk-body govuk-!-margin-0" }>
                <Map date={ currentDate }
                     geoKey={ AreaLevel?.[areaType]?.geoKey ?? "ctry19" }
                     geoJSON={ AreaLevel?.[areaType]?.geoJSON }
                     geoData={ AreaLevel?.[areaType]?.data }
                     valueIndex={ areaType !== "msoa" ? 2 : 1 }
                     dates={ dates }
                     extrema={ extrema }
                     colours={ colours }
                     maxDate={ dates[dates.length - 1] }
                     width={ width }
                >
                    <SliderComponent dates={ dates }
                                     currentDate={ currentDate }
                                     setCurrentDate={ setCurrentDate }
                                     width={ width }/>
                </Map>
            </MainContainer>
        </MainTabLinkContainer>
        <div className={ "markdown govuk-!-margin-top-5 govuk-body govuk-!-margin-bottom-0" } style={{ maxWidth: 50 + "em" }}>
            <h3 className={ "govuk-heading-m govuk-!-margin-top-1" }>Case rates</h3>
            <p>
                Case rates are shown per 100,000 people for the 7-day period ending on the date shown. <br/>
                We calculate this by dividing the 7-day total by the area population and multiplying by 100,000.
            </p>
            <p className={ "govuk-!-margin-bottom-0" }>
                This makes it easier to compare cases across areas of different population size.
            </p>

            <h3 className={ "govuk-heading-m govuk-!-margin-top-7" }>Data not shown</h3>
            <p>
                There are 2 reasons why data may not be shown:
            </p>

            <ul className={ "govuk-list govuk-list--bullet" }>
                <li className={ "govuk-!-margin-bottom-1" }>
                    for areas with fewer than 3 cases at MSOA level, we do not show data to protect individuals'
                    identities.
                </li>
                <li>
                    data may be missing, for example because it is delayed or unavailable. If you zoom in to MSOA level,
                    data for Northern Ireland, Scotland and Wales are not available.
                </li>
            </ul>

        </div>
    </>

};
