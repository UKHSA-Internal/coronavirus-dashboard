// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { Card, NumericReports, ValueItem} from 'components/Card';
import type {
    Props,
    TabContentProps,
    TabContentType
} from './Testing.types';
import {
    getParams,
    groupBy,
    getMaxDateValuePair,
    strFormat,
    dropLeadingZeros,
    getPlotData
} from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { Plotter } from "components/Plotter";
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


const NationsDaily = () => {

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


const NationsCumulative = () => {

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
                    <NationsDaily/>
                </TabLink>
                <TabLink label={ "Cumulative" }>
                    <NationsCumulative/>
                </TabLink>
                <TabLink label={ "Data" }>
                     Placeholder
                </TabLink>

            </TabLinkContainer>
        </Card>
    </Fragment>
};

export default withRouter(Testing);
