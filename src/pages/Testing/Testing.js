// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { Card, NumericReports, ValueItem} from 'components/Card';
import type {
    Props,
    TabContentProps,
    TabContentType
} from './Testing.types';
import { getParams, groupBy, getMaxDateValuePair, strFormat, hexToRgb, dropLeadingZeros } from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { Plotter } from "./plots";
import { movingAverage } from "common/stats";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";
import { Table } from "components/GovUk";
import moment from "moment";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];



const RadioButtons = () => {

    return <div>
        <form>
            <fieldset className={ "govuk-fieldset" }>
                <div className={ "govuk-radios govuk-radios--small govuk-radios--inline" }>
                    <div className={ "govuk-radios__item" }>
                        <input className={ "govuk-radios__input" } id="changed-name" name="changed-name" type="radio" value="month" />
                        <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name">By specimen date
                        </label>
                    </div>
                    <div className={ "govuk-radios__item" }>
                        <input className={ "govuk-radios__input" } id="changed-name-2" name="changed-name" type="radio" value="year" />
                        <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name-2">By reported date
                        </label>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>

}


const OneTheseStacksNation = () => {

    // newTestsByPublishDate
    const
        data = useApi({
            conjunctiveFilters: [
                { key: "areaType", sign: "=", value: "nation" }
            ],
            structure: {
                value: "newPillarOneTestsByPublishDate",
                date: "date",
                name: "areaName"
            },
            defaultResponse: []
        }),
        groups = groupBy(dropLeadingZeros(data,"value"), item => item.name),
        colours = ['#2B8CC4', '#FFBF47', '#2E358B', '#DF3034', "#7f7f7f"];

    return <Plotter
        data={
            Object.keys(groups).map((areaName, index) => ({
                name: areaName,
                x: groups[areaName].map(item => item.date),
                y: groups[areaName].map(item => item.value),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: colours[index]
                }
            }))
        }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


const CumOneTheseStacksNation = () => {

    // cumTestsByPublishDate
    const
        data = useApi({
            conjunctiveFilters: [
                { key: "areaType", sign: "=", value: "nation" }
            ],
            structure: {
                value: "cumPillarOneTestsByPublishDate",
                date: "date",
                name: "areaName"
            },
            defaultResponse: []
        }),
        groups = groupBy(dropLeadingZeros(data, "value"), item => item.name),
        colours = ['#2B8CC4', '#FFBF47', '#2E358B', '#DF3034', "#7f7f7f"];

    return <Plotter
        data={
            Object.keys(groups).map((areaName, index) => ({
                name: areaName,
                x: groups[areaName].map(item => item.date),
                y: groups[areaName].map(item => item.value),
                fill: 'tozeroy',
                type: "bar",
                marker: {
                    color: colours[index]
                }
            }))
        }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


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
                data = dropLeadingZeros(rawData, field.value),
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


const TestingCard = ({ tabs, tabs: { heading }, cardType, params, ...props }) => {

    switch ( cardType ) {

        case "chart":
            return <Card heading={ heading }{ ...props }>
                <TabLinkContainer>{
                    tabs.map(({ heading: tabHeading, ...rest }) =>
                        <TabLink key={ `tab-${ tabHeading }` } label={ tabHeading }>
                            <TabContent params={ params } { ...props } { ...rest }/>
                        </TabLink>
                    )
                }</TabLinkContainer>
            </Card>

        case "map":
            return <Card heading={ heading }{ ...props }>
                <TabLinkContainer>{
                    tabs.map(({ heading: tabHeading, fields }) =>
                        <TabLink key={ `tab-${ tabHeading }` }
                                 label={ tabHeading }>
                            <p>Not implemented.</p>
                        </TabLink>
                    )
                }</TabLinkContainer>
            </Card>

        default:
            return <p>Invalid chart type</p>;

    }

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


const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.testing,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <MainLoading/>;

    return <Fragment>
        <NumericReports horizontal={ true }>
            <HeadlineNumbers params={ params } { ...layout }/>
        </NumericReports>
        {
            layout?.cards.map(( { ...card }, index ) =>
                <TestingCard key={ `card-${ index }` }
                             params={ params }
                             { ...card }/> ?? null
            )
        }
        <Card fullWidth heading={ "NHS and PHE tests by nation" }>
            <TabLinkContainer>
                <TabLink label={ "Daily" }>
                    <OneTheseStacksNation/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <CumOneTheseStacksNation/>
                </TabLink>
                <TabLink label={ "Data" }>
                     Placeholder
                </TabLink>

            </TabLinkContainer>
        </Card>
    </Fragment>
};

export default withRouter(Testing);
