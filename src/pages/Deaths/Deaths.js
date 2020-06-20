// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { Card, CardHeader, NumericReports, ValueBox } from 'components/Card';
import type {
    Props,
    TabContentProps,
    TabContentType
} from './Deaths.types';
import { getParams, getPlotData } from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { Plotter } from "components/Plotter";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";
import { DataTable, Radio } from "components/GovUk";


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


const CardContent = ({ tabs: singleOptionTabs=null, cardType, params, options=null,
                         heading, fullWidth, ...props }) => {

    const
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    let Component;

    switch ( cardType ) {

        case "chart":
            Component = <Card fullWidth={ fullWidth }>
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
            break;

        case "map":
            Component = <Card fullWidth={ fullWidth }>
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
            break;

        default:
            Component = <p>Invalid chart type</p>;

    }

    return Component

};  // TestingCard

const HeadlineNumbers = ({ params, headlineNumbers=[] }) => {

    return headlineNumbers?.map((item, index) =>
        <ValueBox params={ params }
                  key={ `headline-number-${index}` }
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
            layout?.cards.map(( cardProps, index ) =>
                <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
            ) ?? null
        }
    </Fragment>
};

export default withRouter(Deaths);
