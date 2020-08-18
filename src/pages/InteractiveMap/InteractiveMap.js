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

import { createQuery, getParams, getParamValueFor, dateRange } from "common/utils";

import { Header, Row, InfoLine, Selector, Slider, MainContainer, MapContainer, SideDataContainer } from "./InteractiveMap.styles"

import type { ComponentType } from "react";
import { Tab } from "../../components/TabLink/TabLink.styles";


const LookupTable = {
    cases: {
        label: "Cases: People tested positive",
        metric: {
            by_week: "newCasesBySpecimenDateRollingRate",
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
            by_week: "newCasesBySpecimenDateRollingRate",
            all_time: "newCasesBySpecimenDateRate"
        }
    },
};


const AreaLevel = {
    nation: {
        geoJSON: "countries_v2.geojson",
        type: "nation",
        geoKey: "ctry19",
        label: "Nations"
    },
    region: {
        geoJSON: "regions_v2.geojson",
        type: "region",
        geoKey: "rgn18",
        label: "Regions"
    },
    ltla: {
        geoJSON: "ltlas_v2.geojson",
        type: "ltla",
        geoKey: "lad19",
        label: "Local authorities"
    }
};


const Options: ComponentType<*> = ({}) => {

    const
        defaultMetric = "cases",
        defaultPeriod = "by_week",
        [ period, setPeriod ] = useState(defaultPeriod),
        [ metric, setMetric ] = useState(defaultMetric),
        history = useHistory(),
        { location: { pathname, search: query } } = history;

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
            <Selector onChange={ event => setMetric(event.target.value) }>{
                Object.keys(LookupTable).map(id =>
                    <option value={ id } key={ id }>{ LookupTable?.[id]?.label ?? "" }</option>
                )
            }</Selector>
            <Radio heading={ "period" }
                   options={{
                       choices: [
                           { label: "By week", value: "by_week" },
                           { label: "All time", value: "all_time" }
                       ]
                   }}
                   value={ period }
                   setValue={ setPeriod }
                   groupClassName={ "govuk-!-margin-left-7 govuk-!-margin-top-0 govuk-!-margin-left-4 govuk-!-padding-top-0" }/>
        </Row>

        <Row>
            <InfoLine>
                Map showing <strong>people tested positive by rate</strong> for the 7 days ending <strong>26 July</strong>.
            </InfoLine>
        </Row>

    </Header>

};  // Header


const SideTable: ComponentType<*> = ({ data }) => {

    const
        defaultAreaType = "nation",
        [ areaType, setAreaType ] = useState(defaultAreaType),
        history = useHistory(),
        { location: { pathname, search: query } } = history;

    useEffect(() => {

        history.push({
            pathname: pathname,
            search: createQuery([
                ...getParams(query),
                { key: "areaType", sign: "=", value: areaType },
            ])
        })

    }, [ pathname, query, areaType ]);

    return <SideDataContainer>
        <Selector onChange={ event => setAreaType(event.target.value) }>{
            Object.keys(AreaLevel).map(id =>
                <option key={ id } value={ AreaLevel?.[id]?.type ?? "" }>
                    { AreaLevel?.[id]?.label ?? "" }
                </option>
            )
        }</Selector>
        <DataTable
            fields={[
                { value: "areaName", label: "Area name", type: "string" },
                { value: "rate", label: "Rate", type: "numeric" }
            ]}
            data={ data.map(item => ({ areaName: item[0], rate: item[2] })) }
            style={{ maxHeight: "75vh" }}
        />
    </SideDataContainer>

};  // Table



const InteractiveMap: ComponentType<*> = ({ location: { search: query } }) => {

    const
        startDate = '2020-01-03',
        endDate = moment().subtract(1, "day").format("YYYY-MM-DD"),
        weeklyDates = dateRange(startDate, endDate, 1, 'weeks'),
        params = getParams(query),
        metric = getParamValueFor(params, "metric", "cases"),
        period = getParamValueFor(params, "period", "by_week"),
        metricName = LookupTable?.[metric]?.[period] ?? LookupTable.cases.metric.by_week,
        [ currentDate, setCurrentDate ] = useState(weeklyDates.length - 1),
        areaType = getParamValueFor(params, "areaType", "nation");

    const
        data = useApi({
            conjunctiveFilters: metricName && [
                { key: 'areaType', sign: '=', value: AreaLevel?.[areaType]?.type ?? "nation" },
                { key: 'date', sign: '=', value: weeklyDates[currentDate] },
            ],
            structure: metricName && [
                "areaName",
                "areaCode",
                metricName
                // "date"
            ],
            defaultResponse: [],
            cache: true,
            extraParams: (metricName && period === "all_time")
                ? [
                    { key: 'latestBy', sign: '=', value: metricName }
                ]
                : []
        });


    // const
        // grouped = groupBy(data, item => item[3]),
        // dates = Object.keys(grouped).sort(sortByDate).reverse();



    if ( !data ) return <Loading/>

    const
        minData = min(data, item => item[2]),
        maxData = max(data, item => item[2]);

    return <article>
        <Options/>
        <MainContainer>
            <MapContainer>
                <label id={ "month" } htmlFor={ "slider" }>Date range: {weeklyDates[currentDate]}</label>
                <Slider id="slider"
                        min={ 0 }
                        max={ weeklyDates.length - 1 }
                        value={ currentDate }
                        onChange={ event => setCurrentDate(parseInt(event.target.value)) }/>
                <Map data={ data }
                     date={ weeklyDates[currentDate] }
                     geoKey={ AreaLevel?.[areaType]?.geoKey ?? "ctry19" }
                     geoJSON={ AreaLevel?.[areaType]?.geoJSON ?? "countries_v2.geojson" }
                     minData={ minData !== maxData ? minData : 0 }
                     maxData={ maxData !== minData ? maxData : 1 }
                />
            </MapContainer>
            <SideTable data={ data }/>
        </MainContainer>
    </article>

};


export default withRouter(InteractiveMap);
