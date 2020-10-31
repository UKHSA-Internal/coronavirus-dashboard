// @flow

import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router";
import Map from "components/Map";
import useApi from "hooks/useApi";
import Loading from "components/Loading";
import { max, min } from "d3-array";
import moment from "moment";
import { DataTable } from "components/GovUk/Table";

import { Radio } from "components/GovUk";

import { createQuery, getParams, getParamValueFor, sort } from "common/utils";

import {
    Header,
    Row,
    InfoLine,
    Selector,
    Slider,
    MainContainer,
    MapContainer,
    SideDataContainer,
    ScaleLegend, ScaleGroup, ScaleColor, ScaleValue, ScaleLegendLabel, LegendContainer, Container
} from "./InteractiveMap.styles"

import type { ComponentType } from "react";
import { Tab } from "../../components/TabLink/TabLink.styles";
import { useMapData, useMapReference, useMapLookupTable } from "hooks/useMapData";
import { Plotter, XAxis } from "components/Plotter/Plotter";
import { movingAverage } from "../../common/stats";


const LookupTable = {
    cases: {
        label: "Cases: People tested positive",
        metric: {
            daily: "cases",
            all_time: "newCasesBySpecimenDateRate"
        }
    },
    // tests: {
    //     label: "Tests: Number of tests",
    //     metric: {
    //         by_week: "cumPeopleTestedByPublishDateRollingRate",
    //         all_time: "cumPeopleTestedByPublishDateRate"
    //     }
    // },
    deaths: {
        label: "Deaths: Confirmed deaths",
        metric: {
            daily: "cases",
            all_time: "newCasesBySpecimenDateRate"
        }
    },
};


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


const Options: ComponentType<*> = ({}) => {

    const
        history = useHistory(),
        { location: { pathname, search: query } } = history,
        params = getParams(query),
        [ metric, setMetric ] = useState(getParamValueFor(params, "metric", "cases")),
        areaType = getParamValueFor(params, "areaType", "nation"),
        [ period, setPeriod ] = useState(getParamValueFor(params, "period", "daily"));

    useEffect(() => {

        history.push({
            pathname: pathname,
            search: createQuery([
                ...getParams(query),
                { key: "period", sign: "=", value: period },
                { key: "metric", sign: "=", value: metric }
            ])
        })

    }, [period, pathname, metric]);

    return <Header>
        <p className={ "govuk-body" }>Browse data for specific areas within the UK.</p>

        <Row>
            <Selector onChange={ ({ target }) => {setMetric(target.value) }}>{
                Object.keys(LookupTable).map(id =>
                    <option value={ id } key={ id } disabled={ id !== "cases" && areaType === "msoa" }>
                        { LookupTable?.[id]?.label ?? "" }
                    </option>
                )
            }</Selector>
            {/*<Radio heading={ "period" }*/}
            {/*       options={{*/}
            {/*           choices: [*/}
            {/*               { label: "Daily", value: "daily" },*/}
            {/*               { label: "All time", value: "all_time", disabled: areaType === "msoa" }*/}
            {/*           ]*/}
            {/*       }}*/}
            {/*       value={ areaType !== "msoa" ? period : "daily" }*/}
            {/*       setValue={ setPeriod }*/}
            {/*       groupClassName={ "govuk-!-margin-left-7 govuk-!-margin-top-0 govuk-!-margin-left-4 govuk-!-padding-top-0" }/>*/}
        </Row>

        {/*<Row>*/}
        {/*    <InfoLine>*/}
        {/*        Map showing <strong>people tested positive by rate</strong> for the 7 days ending <strong>26 July</strong>.*/}
        {/*    </InfoLine>*/}
        {/*</Row>*/}

    </Header>

};  // Header


const SideTable: ComponentType<*> = ({ data=[] }) => {

    const
        lookupTable = useMapLookupTable(),
        history = useHistory(),
        { location: { pathname, search: query } } = history,
        params = getParams(query),
        [ areaType, setAreaType ] = useState(getParamValueFor(params, "areaType", "nation"));

    useEffect(() => {

        history.push({
            pathname: pathname,
            search: createQuery([
                ...getParams(query),
                { key: "areaType", sign: "=", value: areaType },
            ])
        })

    }, [ pathname, query, areaType ]);

    if ( !lookupTable ) return <Loading/>;

    // const dt = data
    //     .map(item => ({areaName: lookupTable[item[0]], value: item[1], rate: item[2]}))
    //     .sort((a, b) => sort(b.areaName, a.areaName));

    return <SideDataContainer>
        <Selector onChange={ event => setAreaType(event.target.value) }>{
            Object.keys(AreaLevel).map(id =>
                <option key={ id } value={ AreaLevel?.[id]?.type ?? "" }>
                    { AreaLevel?.[id]?.label ?? "" }
                </option>
            )
        }</Selector>
        {/*<DataTable*/}
        {/*    fields={[*/}
        {/*        { value: "areaName", label: "Area name", type: "string" },*/}
        {/*        { value: "value", label: "Value", type: "numeric" },*/}
        {/*        { value: "rate", label: "Rate", type: "numeric" }*/}
        {/*    ]}*/}
        {/*    data={ dt }*/}
        {/*    style={{ maxHeight: "75vh" }}*/}
        {/*/>*/}
    </SideDataContainer>

};  // Table


const InteractiveMap: ComponentType<*> = ({ location: { search: query } }) => {

    const
        params = getParams(query),
        period = getParamValueFor(params, "period", "daily"),
        areaType = getParamValueFor(params, "areaType", "nation");

    const
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

    }, [currentDate, refData?.complete])

    useEffect(() =>{
        if ( period === "all_time" ) {
            setCurrentDate(null)
        }
    }, [period])

    if ( !dates || !extrema ) return <Loading/>

    return <Container>
        <Header>
            <p className={ "govuk-body" } style={{ maxWidth: 40 + "em" }}>
                Browse cases data for specific areas within the UK.
            </p>
        </Header>
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
                <strong>Suppressed rates:</strong> MSOA level rates are suppressed where
                there have been fewer than&nbsp;3&nbsp;cases in a seven-day period. This
                is to protect the privacy of individuals and prevent disclosure.
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
