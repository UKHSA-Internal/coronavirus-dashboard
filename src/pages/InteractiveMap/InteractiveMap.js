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
import { XAxis } from "components/Plotter/Plotter";

import { glAvailable } from "components/Map/utils";


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

const colours = [
    "#e0e543",
    "#74bb68",
    "#399384",
    "#2067AB",
    "#12407F",
    "#53084A"
];


const MainHeader: ComponentType<*> = ({ ...props }) => {

    return <Header>
        <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }} { ...props }>
            Browse cases data for specific areas within the UK.
        </p>
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
        [ extrema, setExtrema ] = useState({ min: 0, first: .25, second: .5, third: .75, max: 1 });

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

    if ( !dates || !extrema ) return <Loading/>;

    return <Container>
        <MainHeader/>
        <div className={ "govuk-!-margin-bottom-5" }>
            {/*<h2 className={ "govuk-heading-m" }>How to use the map?</h2>*/}
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                The map displays weekly data, which are updated everyday. Use the slider to
                select a week-ending date.
            </p>
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                <strong>Local view:</strong> The default zoom level shows Upper Tier Local
                Authorities (UTLA). Zoom in for more details, including Lower
                Tier Local Authorities (LTLA) and Middle layer Super Output Areas (MSOA).
            </p>
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                <strong>Suppressed rates:</strong> For smaller areas (eg MSOAs) with
                fewer than 3 cases, we do not show data. This is to protect individuals'
                identities.
            </p>
            <p className={ "govuk-body govuk-body" } style={{ maxWidth: 40 + "em" }}>
                <strong>More details:</strong> Click on an area to see more detailed cases
                data for the most recent time period available &ndash; including seven day
                case rates and direction of change. When zoomed to very small areas, data
                for Northern Ireland, Scotland and Wales are not available.
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
                >
                    <label id={ "month" }
                           className={ "govuk-body" }
                           htmlFor={ "slider" }>
                        Seven&ndash;day rolling rate of new cases by specimen date ending
                        on <strong>{ moment(currentDate).format("DD MMM YYYY") }</strong>
                    </label>
                    <Slider id="slider"
                        min={ 0 }
                        max={ ( dates.length ?? 0 ) - 1 }
                        value={ dates.indexOf(currentDate) ?? 0 }
                        length={ dates.length }
                        onInput={ e => {
                            e.target.style.background = `linear-gradient(to right, #12407F 0%, #12407F ${ Math.ceil(parseInt(e.target.value) * 100 / dates.length + .7) }%, white  ${ Math.ceil((parseInt(e.target.value) + .7) * 100 / dates.length) }%, white 100%)`
                        } }
                        onChange={ event => setCurrentDate(dates[parseInt(event.target.value)]) }/>
                    <XAxis data={[{
                        x: dates,
                        y: Array(dates.length).fill(null)
                        // xticktext: [
                        //     "2020-03-15"
                        // ]
                    }]}/>
                </Map>
            </>
        </MainContainer>
        <div className={ "markdown govuk-!-margin-top-5" } style={{ maxWidth: 40 + "em" }}>
            <p>
                Seven&ndash;day rates are expressed per 100,000 population and are calculated
                by dividing the seven day count by the area population and multiplying
                by 100,000.
            </p>
            <p>
                All data used in the map are available in the public domain and may be
                downloaded from the relevant section of the website or via the API.
            </p>
            <h3 className={ "govuk-heading-m govuk-!-margin-top-6" }>Attributions</h3>
            <div className={ "govuk-body-s" }>
                <ul className={ "govuk-list govuk-list--bullet govuk-body-s" }>
                    <li>Contains MSOA names &copy; Open Parliament copyright and database right 2020</li>
                    <li>Contains Ordnance Survey data &copy; Crown copyright and database right 2020</li>
                    <li>Contains Royal Mail data &copy; Royal Mail copyright and database right 2020</li>
                    <li>Contains Public Health England data &copy; Crown copyright and database right 2020</li>
                    <li>Office for National Statistics licensed under the Open Government Licence v.3.0</li>
                </ul>

                <p>
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
