// @flow

import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";

import URLs from "common/urls";
import Loading from "components/Loading";
import RenderMetrics from "components/MetricView";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import useGenericAPI from "hooks/useGenericAPI";
import { capitalise, createQuery, getUriParams } from "common/utils";
import { BREAKPOINT, ColumnEntry } from "components/Pane";

import { Column } from "components/Pane/Pane.styles";
import { FieldSet, PageHeading, Container } from "./Page.styles";

import type { ComponentType } from "react";


const LabelLookup = {
    area_type: {
        heading: "Area type",
        overview: {
            label: "Overview",
            description: "Metrics available for the United Kingdom."
        },
        nation: {
            label: "Nation",
            description: "Metrics available for different nations of the United Kingdom."
        },
        region: {
            label: "Region",
            description: "Metrics available for regions of England."
        },
        nhsRegion: {
            label: "NHS Region",
            description: "Metrics available for healthcare regions of England."
        },
        utla: {
            label: "Upper Tier Local Authority (UTLA)",
            description: "Metrics available for upper tier local authorities in England and unitary authorities in the devolved administrations."
        },
        ltla: {
            label: "Lower Tier Local Authority (LTLA)",
            description: "Metrics available for lower tier local authorities in England.",
        },
        nhsTrust: {
            label: "NHS Trust",
            description: "Metrics available for healthcare trusts in England.",
        },
        msoa: {
            label: "Middle-layer Super Output Area (MSOA)",
            description: "Metrics available for local areas in England.",
        }
    },
    type: {
        heading: "Type"
    },
    category: {
        heading: "Category"
    },
    name: {
        heading: "Name"
    }
};


const Content: ComponentType<*> = ({ data, heading, sectionType, typeKey, setUri }) => {

    const { pathname, search: queries } = useLocation();
    const { search=null } = getUriParams(queries);
    const [ filter, setFilter ] = useState(search);

    const searchCallback = ({ target }) => setFilter(target.value.toLowerCase().trim());

    useEffect(() => {

        const params = [];

        if ( filter ) {
            params.push({ key: "search", sign: "=", value: filter.replace(/[^a-z6028\s]/gi, "") });
        }

        setUri(pathname + createQuery(params));

    }, [ filter ]);

    const filterFunc = item => {
        if ( !filter ) return true;

        return (
            item.metric.toLowerCase().indexOf(filter) > -1 ||
            item.metric_name.toLowerCase().indexOf(filter) > -1
        )
    };

    return <Switch>
        { data.map( item =>
            <Route path={ `/metrics/${sectionType}/${ encodeURI(item[typeKey].replace(/\s/g, '-')) }` }
                   key={ `${typeKey}-routes-${item[typeKey]}` }>
                <Container>
                    <PageHeading>
                        <h2 className={ "govuk-heading-l govuk-!-margin-bottom-0" }>
                            Metrics by { heading.toLowerCase() }
                            <small style={{ display: 'flex' }} className={ "govuk-caption-m govuk-!-margin-top-1" }>{
                                LabelLookup?.[sectionType]?.[item[typeKey]]?.label ?? capitalise(item[typeKey])
                            }</small>
                        </h2>
                    </PageHeading>
                    <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column" }}>
                        <FieldSet>
                            <label htmlFor={ "metric-search" } className={ "govuk-label govuk-!-font-weight-bold" }>
                                Metric
                            </label>
                            <div id={ "metric-search-hint" } className={ "govuk-hint govuk-!-font-size-16" }>
                                Enter metric name or API name to see results.
                                For example, enter <strong>case</strong> to see all case
                                metrics in this category.
                            </div>
                            <input name={ "metric-search" }
                                   inputMode={ "search" }
                                   type={ "search" }
                                   autoComplete={ "off" }
                                   placeholder={ "Search metrics" }
                                   onChange={ searchCallback }
                                   value={ filter }
                                   style={{ maxWidth: "20em" }}
                                   className={ "govuk-input" }
                                   minLength={ "0" }
                                   maxLength={ "120" }/>
                        </FieldSet>
                        <RenderMetrics data={ item.payload }
                                       download={ URLs["genericApiMetricSearch"] + `?areaType=${item[typeKey]}` }
                                       downloadName={ `metrics_${item[typeKey]}.json` }
                                       filterFunc={ filterFunc }
                                       userInput={ filter }/>
                    </div>
                </Container>
            </Route>
        )
    }</Switch>

};  // Content


const getAreaParam = ( sectionType: string ): Object<string, string> => {

    switch ( sectionType ) {
        case "area_type":
            return {
                api: "areaType",
                label: "Area type",
                typeKey: 'area_type'
            };

        case "category":
            return {
                api: "category",
                label: "Category",
                typeKey: 'category'
            };

        case "type":
            return {
                api: "tag",
                label: "Type",
                typeKey: 'tag'
            };

        default:
            return {
                api: null,
                label: "Metric name",
                typeKey: null
            }
    }

};  // getAreaParam


export const TopicSection: ComponentType<*> = ({ parent, urlName, parentPath, ...props }) => {

    const layout = useResponsiveLayout(BREAKPOINT);
    const { pathname, search: queries } = useLocation();
    const sectionType = /.*\/(\w+)$/.exec(parentPath)[1];
    const areaParams = getAreaParam(sectionType);
    const [ uri, setUri ] = useState(pathname + queries);

    const data = useGenericAPI(
        urlName,
        [],
        {},
        "json",
        { by: areaParams.api }
    );

    if ( !data?.length ) {
        return <Column><Loading/></Column>;
    }

    return <>
        {
            layout === "desktop" || pathname === parentPath
                ? <Column>{
                    data.map((item, index) =>
                        <ColumnEntry { ...props }
                                     parentPath={ parentPath }
                                     key={ `${sectionType}-path-${ index }` }
                                     id={ encodeURI(item[areaParams.typeKey]?.replace(/\s/g, '-')) }
                                     label={ LabelLookup?.[sectionType]?.[item?.[sectionType]]?.label ?? capitalise(item?.[areaParams.api]?.toLowerCase()) }
                                     description={ LabelLookup?.[sectionType]?.[item?.[sectionType]]?.description ?? null}/>
                    )
                }</Column>
                : <Link className="govuk-back-link govuk-!-margin-left-3" to={ parentPath }>Back to { areaParams.label }</Link>
        }
        <Switch>
            <Route path={ `${parentPath}/:${sectionType}` } exact>
                <Column>
                    <Content data={ data }
                             heading={ LabelLookup[sectionType].heading }
                             sectionType={ sectionType }
                             typeKey={ areaParams.typeKey }
                             setUri={ setUri }/>
                </Column>
            </Route>
        </Switch>
        <Redirect to={ uri }/>
    </>;

};  // AreaType


