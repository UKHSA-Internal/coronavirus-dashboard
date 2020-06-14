// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { Card, NumericReports, ValueItem} from 'components/Card';
import type {
    Props,
    TabContentProps,
    TabContentType
} from './Cases.types';
import { getParams, getMaxDateValuePair, strFormat, hexToRgb, dropLeadingZeros } from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { Plotter } from "./plots";
import { movingAverage } from "common/stats";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";
import { Table } from "components/GovUk";
import moment from "moment";
import { Radios } from 'govuk-react-jsx';


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];



const Radio = ({ options, value, setValue }) => {

    return <Radios
        value={ value }
        onChange={ e => setValue(e.target.value) }
        className="govuk-radios--inline"
        formGroup={{ className: 'govuk-radios--small' }}
        fieldset={{
          legend: { children: [''] }
        }}
        items={
            options
                .choices
                .map(choice => ({ children: [ choice ], value: choice }))
        }
        name="option-choices"
    />

}


const DataTable = ({ fields, data }) => {

    const fieldNames = fields.map(item => item.value)

    return <Table
        head={[
            fields.map(item => ({ value: item.label, type: item.type }))
        ]}
        body={
            data.map(item => fieldNames.map(name =>
                name === "date"
                    ? moment(item[name]).format("DD-MM-YYYY")
                    : item[name]

            ))
        }
    />

};  // DataTable



const getPlotData = (fields: Array<{}>, rawData) => {

    const
        // yellow, cornFlowerBlue, darkBlue, red, gray
        colours = [
            '#FFBF47', '#2B8CC4', '#2E358B',
            '#DF3034', "#7f7f7f"];

    return fields.map(field => {

            const
                data = dropLeadingZeros(rawData || [], field.value),
                yData = data?.map(variable => variable?.[field.value] ?? null) ?? [],
                { r, g, b } = hexToRgb(colours[field.colour]);

            let plotFeatures;

            switch ( field.type ) {
                case "bar":
                    plotFeatures = {
                        type: field.type,
                        marker: {
                            color: colours[field.colour]
                        }
                    }
                    break;

                case "line":
                    plotFeatures = {
                        type: field.type,
                        mode: 'lines',
                        ...(field?.fill ?? true)
                            ? {
                                fill: 'tozeroy',
                                fillcolor: `rgba(${ r },${ g },${ b },0.1)`
                            }:
                            {},
                        line: {
                            color: colours[field.colour]
                        }
                    };
                    break;

            }

            return {
                name: field.label,
                x: data?.map(item => item?.date ?? null) ?? [],
                y: field.rollingAverage ? movingAverage(yData, 7) : yData,
                ...plotFeatures
            }

        });

};  // getYAxisData


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


const CardContent = ({ tabs: singleOptionTabs=null, cardType, params, options=null, ...props }) => {

    const
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    let Component;

    switch ( cardType ) {

        case "chart":
            Component = <TabLinkContainer>{
                tabs?.map(({ heading, ...rest }) =>
                    <TabLink key={ `tab-${ heading }` } label={ heading }>
                        <TabContent params={ params } { ...props } { ...rest }/>
                    </TabLink>
                ) ?? null
            }</TabLinkContainer>;
            break;

        case "map":
            Component = <TabLinkContainer>{
                tabs?.map(({ heading: tabHeading, fields }) =>
                    <TabLink key={ `tab-${ tabHeading }` }
                             label={ tabHeading }>
                        <p>Not implemented.</p>
                    </TabLink>
                ) ?? null
            }</TabLinkContainer>;
            break;

        default:
            Component = <p>Invalid chart type</p>;

    }

    return <Fragment>
        { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
        {/*<Component/>*/}
        { Component }
    </Fragment>

};  // TestingCard


const ValueBox = ({ data, primaryValue, secondaryValue=null, primaryTooltip="", secondaryTooltip="", ...rest }) => {

    const
        primaryData = getMaxDateValuePair(data, primaryValue),
        secondaryData = getMaxDateValuePair(data, secondaryValue),
        primaryReplacements = { kwargs: primaryData },
        secondaryReplacements = { kwargs: primaryData };

    return <ValueItem
        primaryValue={ primaryData.value }
        primaryTooltip={ strFormat(primaryTooltip, primaryReplacements) }
        primaryModal={ primaryValue }
        primaryModalReplacements={ primaryReplacements }
        secondaryValue={ secondaryData.value }
        secondaryTooltip={ strFormat(secondaryTooltip, secondaryReplacements) }
        secondaryModal={ secondaryValue }
        secondaryModalReplacements={ secondaryReplacements }
        { ...rest }
    />

};  // getValueItemSections


const HeadlineNumbers = ({ params, headlineNumbers=[] }) => {

    const structure = { date: "date" };

    for ( const { primaryValue, secondaryValue=null } of headlineNumbers ) {

        structure[primaryValue] = primaryValue;

        if ( secondaryValue )
            structure[secondaryValue] = secondaryValue;

    }

    const data = useApi({
        conjunctiveFilters: params,
        structure: structure,
        defaultResponse: []
    });

    return headlineNumbers?.map((item, index) =>
        <ValueBox data={ data }
                  key={ `headlineNumber-${index}` }
                  { ...item }/>
    ) ?? null

} // HeadlineNumbers


const Deaths: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.deaths,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <MainLoading/>;

    return <Fragment>
        <NumericReports horizontal={ true }>
            <HeadlineNumbers params={ params } { ...layout }/>
        </NumericReports>
        {
            layout?.cards.map(( { heading, fullWidth, ...rest }, index ) =>
                <Card key={ `card-${ index }` } heading={ heading } fullWidth={ fullWidth }>
                    <CardContent params={ params } { ...rest }/>
                </Card> ?? null
            )
        }
    </Fragment>
};

export default withRouter(Deaths);
