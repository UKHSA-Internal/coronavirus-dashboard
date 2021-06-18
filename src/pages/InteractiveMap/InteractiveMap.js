// @flow

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Map from "components/Map";
import Loading from "components/Loading";
import moment from "moment";

import { getParams, getParamValueFor } from "common/utils";

import {
    Header,
    Slider,
    MainContainer,
    Container
} from "./InteractiveMap.styles"

import type { ComponentType } from "react";
import { useMapData } from "hooks/useMapData";
import { glAvailable } from "components/Map/utils";
import { scaleColours as colours } from "common/utils";
import Plotter from "components/Plotter";
import useResponsiveLayout from "../../hooks/useResponsiveLayout";
import { Helmet } from "react-helmet";


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


const MainHeader: ComponentType<*> = ({ ...props }) => {

    return <Header>
        {/* <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }} { ...props }>
            Browse cases data for specific areas within the UK.
        </p> */}
    </Header>

};  // SectionHeader


const InteractiveMap: ComponentType<*> = ({ location: { search: query } }) => {

    const
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

    if ( !glAvailable() ) {
        return <Container>
            <MainHeader/>
            <div>
                You must have WebGL installed and enabled on your browser to use the
                interactive map.
            </div>
        </Container>
    }

    const title = "Interactive map | Coronavirus in the UK";
    const description = (
        "Interactive map of coronavirus (COVID-19) prevalence rate for the " +
        "United Kingdom by local authorities and small areas."
    );

    if ( !dates || !extrema ) return <Loading/>;

    return <Container>
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ description } />
            <meta property="og:title" content={ title }/>
            <meta name="twitter:title" content={ title }/>
            <meta property="og:description" content={ description }/>
            <meta name="twitter:description" content={ description }/>
        </Helmet>
        <MainHeader/>
        <div className={ "govuk-!-margin-bottom-5" }>
            {/*<h2 className={ "govuk-heading-m" }>How to use the map?</h2>*/}
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                This map shows 7-day case rate per 100,000 people.
            </p>
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                The default view shows data by local authority. Zoom in for more local data.
            </p>
        </div>
        <MainContainer>
            <>
                <Map
                     date={ currentDate }
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
                    <label id={ "month" }
                           className={ "govuk-body govuk-!-font-weight-bold" }
                           htmlFor={ "slider" }>
                        Case rate per 100,000 people for 7&ndash;day period ending on <strong>{ moment(currentDate).format("D MMMM YYYY") }</strong>:
                    </label>
                    {
                        width === "desktop"
                            ? <>
                                <Slider id="slider"
                                          min={ 0 }
                                          max={ (dates.length ?? 0) - 1 }
                                          value={ dates.indexOf(currentDate) ?? 0 }
                                          length={ dates.length }
                                          onInput={ e => {
                                              e.target.style.background = `linear-gradient(to right, #12407F 0%, #12407F ${ Math.ceil(parseInt(e.target.value) * 100 / dates.length + .7) }%, white  ${ Math.ceil((parseInt(e.target.value) + .7) * 100 / dates.length) }%, white 100%)`
                                          } }
                                          onChange={ event => setCurrentDate(dates[parseInt(event.target.value)]) }/>
                                <Plotter type={ "XAxis" }
                                    // fallback={ <Loading/> }
                                         data={ [{
                                             x: dates,
                                             y: Array(dates.length).fill(null)
                                         }] }/>
                            </>
                            : null
                    }
                </Map>
            </>
        </MainContainer>
        
        <div className={ "markdown govuk-!-margin-top-5 govuk-body" } style={{ maxWidth: 50 + "em" }}>
            <h3 className={ "govuk-heading-m govuk-!-margin-top-1" }>Case rates</h3>
            <p className={ "govuk-body" }>
                Case rates are shown per 100,000 people for the 7-day period ending on the date shown. <br/>
                We calculate this by dividing the 7-day total by the area population and multiplying by 100,000.
            </p>
            <p className={ "govuk-body" }>
                This makes it easier to compare cases across areas of different population size.
            </p>

            <h3 className={ "govuk-heading-m govuk-!-margin-top-6" }>Map areas</h3>
            <p>
                Find your area by using the postcode search or the zoom.
                The map shows data for different area types:
            </p>

            <ul className={ "govuk-list govuk-list--bullet" }>
                <li className={ "govuk-!-margin-bottom-1" }>local authorities. These are divided into Upper Tier Local Authorities (UTLA) and Lower Tier Local Authorities (LTLA) for areas with 2 tiers of local government, such as county council (upper tier) and district council (lower tier).</li>
                <li>Middle layer Super Output Areas (MSOA). These areas are smaller than local authorities, so show data at the most local level.</li>
            </ul>

            <h3 className={ "govuk-heading-m govuk-!-margin-top-6" }>Data not shown</h3>
            <p>
                There are 2 reasons why data may not be shown:
            </p>
            
            <ul className={ "govuk-list govuk-list--bullet" }>
                <li className={ "govuk-!-margin-bottom-1" }>for areas with fewer than 3 cases at MSOA level, we do not show data to protect individuals' identities.</li>
                <li>data may be missing, for example because it is delayed or unavailable. If you zoom in to MSOA level, data for Northern Ireland, Scotland and Wales are not available.</li>
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
    </Container>

};


export default withRouter(InteractiveMap);
