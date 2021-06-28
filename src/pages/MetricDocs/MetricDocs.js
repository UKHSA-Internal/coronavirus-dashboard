// @flow

import React from "react";

import type { ComponentType } from "react";
import Pane, { ColumnEntry } from "components/Pane";
import { AreaTypes } from "./Sections/AreaType";
import { AreaNames } from "./Sections/AreaName";
import { Category } from "./Sections/Category";
import { useLocation, useRouteMatch } from "react-router";
import { MetricName } from "./Sections/MetricName";


const SubTypes: ComponentType<*> = () => {

    const { pathname } = useLocation();
    const { params={} } = useRouteMatch("/metrics/:type?");

    switch ( params?.type ) {
        case "areaType":
            return <AreaTypes parentPath={ pathname } level={ 1 }/>;
        case "areaName":
            return <AreaNames parentPath={ pathname } level={ 1 }/>;
        case "category":
            return <Category parentPath={ pathname } level={ 1 }/>;
        case "name":
            return <MetricName parentPath={ pathname } level={ 1 }/>;
        default:
            return null;
    }

};  // SubTypes


const MetricDocs: ComponentType<*> = () => {

    const basePath = "/metrics";

    const baseData = [
        {
            label: "Metric name",
            id: "metricName",
            description: "See all available metrics.",
            active: false,
            level: 1,
            payload: []
        },
        {
            label: "Area type",
            id: "areaType",
            description: "Search metrics based on the area type for which they are published.",
            level: 1,
            payload: [
                {
                    label: "Overview",
                    id: "overview",
                    description: "Metrics available for the United Kingdom."
                },
                {
                    label: "Nation",
                    id: "nation",
                    description: "Metrics available for different nations of the United Kingdom."
                },
                {
                    label: "Region",
                    id: "region",
                    description: "Metrics available for regions of England."
                },
                {
                    label: "NHS Region",
                    id: "nhsRegion",
                    description: "Metrics available for healthcare regions of England."
                },
                {
                    label: "Upper Tier Local Authority (UTLA)",
                    id: "utla",
                    description: "Metrics available for upper tier local authorities in England and unitary authorities in the devolved administrations."
                },
                {
                    label: "Lower Tier Local Authority (LTLA)",
                    id: "Metrics available for lower tier local authorities in England.",
                },
                {
                    label: "NHS Trust",
                    id: "Metrics available for healthcare trusts in England.",
                },
                {
                    label: "Middle-layer Super Output Area (MSOA)",
                    id: "Metrics available for local areas in England.",
                }
            ]
        },
        {
            label: "Area name",
            id: "areaName",
            description: "Search metrics based on the area name for which they are published.",
            level: 1,
            payload: []
        },
        {
            label: "Category",
            id: "category",
            description: "Search metrics based on their category - that is, the page of the website on which they are displayed.",
            active: false,
            level: 1,
            payload: [
                {
                    label: "Testing",
                    id: "testing",
                },
                {
                    label: "Cases",
                    id: "cases",
                },
                {
                    label: "Healthcare",
                    id: "healthcare",
                },
                {
                    label: "Vaccinations",
                    id: "vaccinations",
                },
                {
                    label: "Deaths",
                    id: "deaths",
                },
            ]
        },
    ];

    return <Pane basePath={ basePath }>
        <ColumnEntry level={ 0 } id={ "name" } label={  "Metric name" } parentPath={ basePath }
                     description={ "See all available metrics." }/>
        <ColumnEntry level={ 0 } id={ "category" } label={  "Metric category" } parentPath={ basePath }
                     description={ "Search metrics based on their category - that is, the page of the website on which they are displayed." }/>
        <ColumnEntry level={ 0 } id={ "type" } label={  "Metric type" } parentPath={ basePath }
                     description={ "Search metrics based on their type - for example, all cumulative metrics." }/>
        <ColumnEntry level={ 0 } id={ "areaType" } label={  "Area type" } parentPath={ basePath }
                     description={ "Search metrics based on the area type for which they are published." }/>
        <ColumnEntry level={ 0 } id={ "areaName" } label={  "Area name" } parentPath={ basePath }
                     description={ "Search metrics based on the area name for which they are published." }/>
        { SubTypes() || null }
    </Pane>

};  // MetricDocs


export default MetricDocs;
