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
    ScaleLegend, ScaleGroup, ScaleColor, ScaleValue, ScaleLegendLabel, LegendContainer
} from "./InteractiveMap.styles"

import type { ComponentType } from "react";
import { Tab } from "../../components/TabLink/TabLink.styles";
import { useMapData, useMapReference, useMapLookupTable } from "hooks/useMapData";
import { Plotter } from "components/Plotter/Plotter";
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
    "#1c5a96",
    "#0b2c5c",
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
            <Radio heading={ "period" }
                   options={{
                       choices: [
                           { label: "Daily", value: "daily" },
                           { label: "All time", value: "all_time", disabled: areaType === "msoa" }
                       ]
                   }}
                   value={ areaType !== "msoa" ? period : "daily" }
                   setValue={ setPeriod }
                   groupClassName={ "govuk-!-margin-left-7 govuk-!-margin-top-0 govuk-!-margin-left-4 govuk-!-padding-top-0" }/>
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


const GenericMap: ComponentType<*> = ({ areaType, period, metricName, weeklyDates, currentDate }) => {

    // const
    //     data = useApi({
    //         conjunctiveFilters: metricName && [
    //             { key: 'areaType', sign: '=', value: AreaLevel?.[areaType]?.type ?? "nation" },
    //             { key: 'date', sign: '=', value: weeklyDates[currentDate] },
    //         ],
    //         structure: metricName && [
    //             "areaName",
    //             "areaCode",
    //             metricName
    //             // "date"
    //         ],
    //         defaultResponse: [],
    //         cache: true,
    //         extraParams: (metricName && period === "all_time")
    //             ? [
    //                 { key: 'latestBy', sign: '=', value: metricName }
    //             ]
    //             : []
    //     });

    const data = useMapData(`${areaType}/m`);

    if ( !data ) return <Loading/>

    const
        minData = min(data, item => item[2]),
        maxData = max(data, item => item[2]);

    return <Map data={ data }
                date={ weeklyDates[currentDate] }
                geoKey={ AreaLevel?.[areaType]?.geoKey ?? "ctry19" }
                geoJSON={ AreaLevel?.[areaType]?.geoJSON ?? "countries_v2.geojson" }
                minData={ minData !== maxData ? minData : 0 }
                maxData={ maxData !== minData ? maxData : 1 }/>

};  // GenericMap


const InteractiveMap: ComponentType<*> = ({ location: { search: query } }) => {

    const
        // startDate = '2020-01-03',
        // endDate = moment().subtract(1, "day").format("YYYY-MM-DD"),
        // weeklyDates = dateRange(startDate, endDate, 1, 'weeks'),
        params = getParams(query),
        // metric = getParamValueFor(params, "metric", "cases"),
        period = getParamValueFor(params, "period", "daily"),
        [ metric, setMetric ] = useState(getParamValueFor(params, "metric", "cases")),
        metricName = LookupTable?.[metric]?.[period] ?? LookupTable.cases.metric.daily,
        areaType = getParamValueFor(params, "areaType", "nation"),
        ukData = useApi({
                conjunctiveFilters: [
                    { key: 'areaType', sign: '=', value: "overview" },
                    { key: 'date', sign: '>=', value: "2020-02-27" }
                ],
                structure: [
                    "date",
                    "newCasesBySpecimenDate"
                ],
                defaultResponse: null,
                cache: true,
            });

    const
        // ukData = useApi({
        //    conjunctiveFilters: [
        //        {key: "areaType", sign: "=", value: "overview"}
        //    ],
        //    structure: {
        //        date: "date",
        //        value: "newCasesByPublishDate"
        //    }
        // }),
        // refData = useMapReference(areaType, metricName),
        refData = useMapData(`maps/${areaType}_percentiles.json`),

        [ dates, setDates ] = useState(null) ,
        [ currentDate, setCurrentDate ] = useState(null),
        [ dataPath, setDataPath ] = useState(null),
        [ extrema, setExtrema ] = useState({ min: 0, first: .25, second: .5, third: .75, max: 1 });
        // data = useMapData(dataPath);

    useEffect(() => {
        if ( refData?.complete ) {
            setDates(Object.keys(refData).filter(key => key !== "complete"));
            console.log(refData)
        }
    }, [refData?.complete]);

    useEffect(() => {
        if ( dates )
            setCurrentDate(dates[dates.length - 1]);
    }, [dates]);

    useEffect(() => {
        if ( currentDate && (refData?.paths ?? null) ) {
            setDataPath(refData.paths[currentDate]);
        }
        else if ( period === "all_time" && areaType !== "msoa" ) {
            setDataPath(`map_content/${areaType}/${metricName}/incidence_rate.json`)
        }
    }, [ refData?.paths ?? null, currentDate, period ]);

    useEffect(() => {

        if ( refData?.complete )
            setExtrema(refData?.[currentDate] ?? refData.complete);

    }, [currentDate, refData?.complete])

    // useEffect(() => {
    //     if ( (refData?.value && refData?.rate && data?.rate) || data?.value ) {
    //         if ( areaType === "msoa" ) {
    //             setExtrema({
    //                 min: data.value.min,
    //                 max: data.value.max
    //             });
    //         } else if ( period === "all_time" ) {
    //             setExtrema({
    //                 min: 0,
    //                 max: data.rate.max
    //             });
    //             setDataPath(`map_content/${areaType}/${metricName}/incidence_rate.json`)
    //         } else if ( period === "daily" ) {
    //             setExtrema({
    //                 min: 0,
    //                 max: refData.rate.max
    //             });
    //         }
    //     }
    // }, [ areaType, period, refData?.rate , refData?.value, data?.rate, data?.value ]);

    useEffect(() =>{
        if ( period === "all_time" ) {
            setCurrentDate(null)
        }
    }, [period])

    if ( !dates || !extrema || !ukData ) return <Loading/>

    // console.log(currentDate);
    // console.log(areaType);
    // console.log(extrema);

    // console.log({
    //     x: ukData.map(item => item[0]),
    //     y: movingAverage(ukData.map(item => item[1]), 7),
    // })

    return <article className={ "govuk-body" }>
        {/*<Plotter data={{*/}
        {/*    data: {x: ukData.map(item => item.data),*/}
        {/*    y: ukData.map(item => item.value)}*/}
        {/*}}/>*/}
        <Options/>
        <Plotter data={[{
            name: "New cases by specimen date",
            x: ukData.map(item => item[0]).slice(3, -3,),
            y: movingAverage(ukData.map(item => item[1]), 7).slice(3,-3),
            type: "line",
            mode: "lines",
            hovertemplate: "%{y}",
            line: {
                width: 3,
                color: "#003078"
            }
        }]} style={{ maxWidth: 600, height: 200 }} layout={{ showlegend: false }}/>
        <MainContainer>
            <>
                {/*<GenericMap*/}
                <Map
                    // data={ data.data }
                     date={ currentDate }
                     geoKey={ AreaLevel?.[areaType]?.geoKey ?? "ctry19" }
                     geoJSON={ AreaLevel?.[areaType]?.geoJSON }
                     geoData={ AreaLevel?.[areaType]?.data }
                     valueIndex={ areaType !== "msoa" ? 2 : 1 }
                     // currentDate={ currentDate }
                     dates={ dates }
                     extrema={ extrema }
                     colours={ colours }
                     // minData={ extrema.min }
                     // maxData={ extrema.max }
                >
                    <label id={ "month" }
                           className={ "govuk-body govuk-!-font-size-14" }
                           htmlFor={ "slider" }>
                        7-day rolling rate of cases by specimen date ending
                        on <strong>{ moment(currentDate).format("DD MMM YYYY") }</strong>
                    </label>
                    <Slider id="slider"
                        min={ 0 }
                        max={ ( dates.length ?? 0 ) - 1 }
                        value={ dates.indexOf(currentDate) ?? 0 }
                        onChange={ event => setCurrentDate(dates[parseInt(event.target.value)]) }/>
                </Map>
            </>

            {/*<MapContainer areaType={ areaType }*/}
            {/*              period={ period }*/}
            {/*              metricName={ metricName }*/}
            {/*              weeklyDates={ weeklyDates, currentDate/>*/}
            {/*<SideTable/>*/}
        </MainContainer>
        <div className={ "markdown modal govuk-!-margin-top-8" }>
            <h3>Attributions</h3>
            <ul className={ "govuk-list govuk-list--bullet" }>
                <li>Contains Ordnance Survey data &copy; Crown copyright and database right 2020</li>
                <li>Contains Royal Mail data &copy; Royal Mail copyright and database right 2020</li>
                <li>Contains Public Health England data &copy; Crown copyright and database right 2020</li>
                <li>Office for National Statistics licensed under the Open Government Licence v.3.0</li>
            </ul>

            <p>
                Lookup products and data are supplied under the Open Government Licence.
                You must use the above copyright statements when you reproduce or use the
                materials, data, or digital boundaries or postcode products used in this
                page.
            </p>
        </div>
    </article>

};


export default withRouter(InteractiveMap);
