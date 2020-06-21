// @flow

import React, { useState, Fragment } from "react";

import {
    MainContainer,
    TabsContainer,
    Tab,
    Body
} from "./TabLink.styles";

import type { React$Node } from "react";
import type {
    TabLinkContainerProps,
    TabLinkProps
} from "./TabLink.types";
import { Plotter } from "components/Plotter";
import { getPlotData, groupBy } from "common/utils";
import { DataTable } from "components/GovUk";
import useApi from "hooks/useApi";


// This is a pseudo-component created to make the implementation of
// containers easier and more consistent.
export const TabLink = function ({ label, children }: TabLinkProps) {

    return <Fragment/>

}  // TabLink


export const TabLinkContainer = ({ children }: TabLinkContainerProps): React$Node => {

    if ( !(children?.length ?? 0) )
        throw new Error(`Component "TabLinkContainer" must have at least two children (of type "TabLink").`);

    const [ current, setCurrent ] = useState(children[0].props.label);

    return <MainContainer>
        <TabsContainer>{
            children.map(({ props: { label } }, index) =>
                <Tab type={ "link" }
                     key={ `${label}-${index}` }
                     className={ `${label === current ? 'active govuk-!-font-weight-bold' : '' }` }
                     onClick={ () => setCurrent(label)  }
                >
                     { label }
                </Tab>
            )
        }</TabsContainer>
        {
            children.map(({ props: { label, children } }, index) =>
                label === current
                    ? <Body key={ `${label}-child-${index}` }>
                        { children }
                    </Body>
                    : null
            )
        }
    </MainContainer>

};  // TabLinkContainer



const TabContentWithData: TabContentType<TabContentProps> = ({ fields, tabType, barType=null, data=[], xKey="date", ...props }: TabContentProps): React$Component => {

    switch ( tabType ) {

        case "chart":
            const layout = {};
            if ( barType ) layout["barmode"] = barType;

            return <Plotter data={ getPlotData(fields, data, xKey) } layout={ layout } { ...props }/>;

        case "table":
            return <DataTable fields={ fields } data={ data } { ...props }/>;

        default:
            return null;

    }

};


export const TabContent: TabContentType<TabContentProps> = ({ fields, params, tabType, barType=null }: TabContentProps): React$Component => {

    const  structure = { date: "date" };

    for ( const { value } of fields )
        structure[value] = value;

    const data = useApi({
        conjunctiveFilters: params,
        structure: structure,
        defaultResponse: []
    });

    return <TabContentWithData data={ data } fields={ fields } tabType={ tabType } barType={ barType }/>

};  // TabContent


const ageSortByKey = (a, b) => {

    const
        ageA = parseInt(/(\d+)/.exec(a.age)[1]),
        ageB = parseInt(/(\d+)/.exec(b.age)[1]);

    return ( ageA > ageB ) || -(ageA < ageB || 0)

}; // ageSexSort


export const AgeSexBreakdownTabContent = ({ params, groupKey, groupValues, requiredMetrics=[], fields=[], ...props }) => {

    // Assumptions:
    // Both categories have the same data type, same groups, same
    // length, and same structure.

    const structure = {};

    for ( const metric of requiredMetrics )
        structure[metric] = metric;

    const
        dataRaw = useApi({
            conjunctiveFilters: params,
            structure: structure,
            extraParams: [
                fields && { key: "latestBy", sign: "=", value: requiredMetrics[0] }
            ],
            defaultResponse: []
        }),
        dataGrouped = groupBy(
            requiredMetrics
                .map(metric =>
                    dataRaw?.[0]?.[metric]
                        .map(item => {
                            for ( const key of groupValues ) {
                                const keyName = key.replace(/^(\w)/, letter => letter.toUpperCase());
                                item[metric + keyName] = !!(item[key] % 1) ? parseFloat(item[key].toFixed(1)) : item[key];
                                item[groupKey] = item[groupKey].replace(/(_|to)/g, found => found === "to" ? "-" : " ");
                                delete item[key]
                            }
                            return item
                        })
                )
            .reduce((acc, item) => [...acc, ...(item ? item : [])], []),
            item => item[groupKey]
        ),
        data = Object
            .keys(dataGrouped)
            .reduce((acc, key) =>
                [
                    ...acc,
                    dataGrouped[key].reduce((innerAcc, item) => ({...innerAcc, ...item}), {})
                ], []
            )
            .sort(ageSortByKey);

    return <TabContentWithData { ...props } fields={ fields } data={ data } isTimeSeries={ false } xKey={ groupKey }/>

};

