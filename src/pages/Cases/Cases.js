// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { Plotter } from "components/Plotter"
import { Card, CardHeader, NumericReports, ValueBox } from 'components/Card';
import type {
    Props,
    TabContentProps,
    TabContentType
} from './Cases.types';
import { colours, dropLeadingZeros, getParams, getPlotData, groupBy } from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";
import { DataTable, Radio } from "components/GovUk";
import { zip, transpose } from "d3-array";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];



const TabContent: TabContentType<TabContentProps> = ({ fields, params, tabType, barType=null }: TabContentProps): React$Component => {

    const  structure = { date: "date" };

    for ( const { value } of fields )
        structure[value] = value;

    const data = useApi({
        conjunctiveFilters: params,
        structure: structure,
        defaultResponse: []
    });

    switch ( tabType ) {

        case "chart":
            const layout = {};
            if ( barType ) layout["barmode"] = barType;

            return <Plotter data={ getPlotData(fields, data) } layout={ layout }/>;

        case "table":
            return <DataTable fields={ fields } data={ data }/>;

        default:
            return null;

    }

};  // TabContent


const ageSort = (a, b) => {

    const
        ageA = parseInt(/(\d+)/.exec(a)[1]),
        ageB = parseInt(/(\d+)/.exec(b)[1]);

    return ( ageA > ageB ) || -(ageA < ageB || 0)

}; // ageSexSort


const ageSortByKey = (a, b) => {

    const
        ageA = parseInt(/(\d+)/.exec(a.age)[1]),
        ageB = parseInt(/(\d+)/.exec(b.age)[1]);

    return ( ageA > ageB ) || -(ageA < ageB || 0)

}; // ageSexSort


const AgeSexBreakdown = ({ params, numericValue }) => {

    const
        data = useApi({
            conjunctiveFilters: params,
            structure: {
                femaleCases: "femaleCases",
                maleCases: "maleCases",
                name: "areaName"
            },
            extraParams: [
                { key: "latestBy", sign: "=", value: "femaleCases" }
            ],
            defaultResponse: []
        }),
        malesGrouped = groupBy(data?.[0]?.maleCases ?? [], item => item.age),
        femalesGrouped = groupBy(data?.[0]?.femaleCases ?? [], item => item.age),
        sortedGroups = Object.keys(femalesGrouped).sort(ageSort),
        groupNames = sortedGroups
            .map(item =>
                item
                    .replace(/_/g, " ")
                    .replace(/to/, "-")
            );

    return <Plotter
        data={[
            {
                name: "Male",
                x: groupNames,
                y: sortedGroups.map(item => malesGrouped[item][0][numericValue]),
                hovertemplate: "%{y}",
                type: "bar",
                marker: {
                    color: colours[1]
                }
            },
            {
                name: "Female",
                x: groupNames,
                y: sortedGroups.map(item => femalesGrouped[item][0][numericValue]),
                hovertemplate: "%{y}",
                type: "bar",
                marker: {
                    color: colours[2]
                }
            }
        ]}
        layout={{ barmode: "group" }}
        isTimeSeries={ false }
    />

};


const AgeSexBreakdownGeneric = ({ params, groupKey, groupValue, tabType="", fields=[], ...props }) => {

    // Assumptions:
    // Both categories have the same data type, same groups, same
    // length, and same structure.

    const structure = {};

    for ( const { value } of fields )
        structure[value] = value;


    const
        data = useApi({
            conjunctiveFilters: params,
            structure: structure,
            extraParams: [
                fields && { key: "latestBy", sign: "=", value: fields[0].value }
            ],
            defaultResponse: []
        });

    // console.log(            zip(...fields.map(field => (data?.[0]?.[field.value] ?? []).sort(ageSortByKey)))
    //             // .reduce((acc, item) => item.map(values => [...acc, values]), [])
    //             // .map(item => ({...item, [groupKey]: item[groupKey].replace(/_/g, " ").replace(/to/, "-")}))
    // )

    if ( tabType === 'table' ) {
        return <div/>
        // return <DataTable fields={ fields } data={
        //     transpose(zip(...fields.map(field => (data?.[0]?.[field.value] ?? []).sort(ageSortByKey))))
        //         .reduce((acc, item) => item.map(values => [...acc, values]), [])
        //         .map(item => ({...item, [groupKey]: item[groupKey].replace(/_/g, " ").replace(/to/, "-")}))
        // }/>
    }

    return <Plotter
        data={
            fields.map(field => {

                const
                    grouped = groupBy(
                        data?.[0]?.[field.value] ?? [],
                            item => item?.[groupKey] ?? ""
                    ),
                    sortedGroup = Object
                        .keys(grouped)
                        .sort(ageSort),
                    groupNames = sortedGroup
                        .map(item =>
                            item
                                .replace(/_/g, " ")
                                .replace(/to/, "-")
                        );

                return {
                    name: field.label,
                    x: groupNames,
                    y: sortedGroup.map(item => grouped[item][0][groupValue]),
                    hovertemplate: "%{y}",
                    type: field.type,
                    marker: {
                        color: colours[field.colour]
                    }
                }
            })
        }
        layout={ props.hasOwnProperty("barType") ? { barmode: props.barType } : {} }
        isTimeSeries={ false }
    />

};


const CardContent = ({ tabs: singleOptionTabs=null, cardType, params, options=null,
                         heading, fullWidth, ...props }) => {

    const
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    switch ( cardType ) {

        case "chart":
            return <Card fullWidth={ fullWidth }>
                <CardHeader heading={ heading } fullWidth={ fullWidth }>
                    { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>
                            <TabContent params={ params } { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "map":
            return <Card fullWidth={ fullWidth }>
                <CardHeader heading={ heading } fullWidth={ fullWidth }>
                    { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <TabLinkContainer>{
                    tabs?.map(({ heading: tabHeading, fields }) =>
                        <TabLink key={ `tab-${ tabHeading }` }
                                 label={ tabHeading }>
                            <p>Not implemented.</p>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "ageSexBreakdown":
            // FixMe: Small cards need min height
            return <Card fullWidth={ false }>
                <CardHeader heading={ heading } fullWidth={ false }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, tabType, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>{
                            tabType === "chart"
                                ? <AgeSexBreakdownGeneric params={ params } { ...rest }/>
                                : <div/>
                        }</TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>

        default:
            return <p>Invalid chart type</p>;

    }


};  // TestingCard


const HeadlineNumbers = ({ params, headlineNumbers=[] }) => {

    return headlineNumbers?.map((item, index) =>
        <ValueBox params={ params }
                  key={ `headline-number-${index}` }
                  { ...item }/>
    ) ?? null

} // HeadlineNumbers


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.cases,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <MainLoading/>;

    return <>
        <NumericReports horizontal={ true }>
            <HeadlineNumbers params={ params } { ...layout }/>
        </NumericReports>
        <div className={ 'util-flex util-flex-wrap' }>
        {
            layout?.cards.map(( cardProps, index ) =>
                <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
            ) ?? null
        }
        </div>
        {/*<div className={ 'util-flex util-flex-wrap' }>*/}
        {/*    <Card fullWidth={ false }>*/}
        {/*        <CardHeader heading={ "Age and sex breakdown" } fullWidth={ false }/>*/}
        {/*        <TabLinkContainer>*/}
        {/*            <TabLink label={ "Chart" }>*/}
        {/*                <AgeSexBreakdown params={ params } numericValue={ "value" }/>*/}
        {/*            </TabLink>*/}
        {/*            <TabLink label={ "Data" }>*/}
        {/*                <AgeSexBreakdown params={ params }/>*/}
        {/*            </TabLink>*/}
        {/*        </TabLinkContainer>*/}
        {/*    </Card>*/}
        {/*    <Card fullWidth={ false }>*/}
        {/*        <CardHeader heading={ "Age and sex breakdown by rate" } fullWidth={ false }/>*/}
        {/*        <TabLinkContainer>*/}
        {/*            <TabLink label={ "Chart" }>*/}
        {/*                <AgeSexBreakdown params={ params } numericValue={ "rate" }/>*/}
        {/*            </TabLink>*/}
        {/*            <TabLink label={ "Data" }>*/}
        {/*                <AgeSexBreakdown params={ params }/>*/}
        {/*            </TabLink>*/}
        {/*        </TabLinkContainer>*/}
        {/*    </Card>*/}
        {/*</div>*/}
    </>
};

export default withRouter(Cases);
