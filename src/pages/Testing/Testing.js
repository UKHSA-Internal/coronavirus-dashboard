// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import {
    Card,
    CardHeader,
    MixedCardContainer,
    HeadlineNumbers,
    CardContent
} from 'components/Card';
import type { Props } from './Testing.types';
import {
    getParams,
    groupBy,
    dropLeadingZeros,
    colours
} from "common/utils";
import useApi from "hooks/useApi";
import { TabLink, TabLinkContainer } from "components/TabLink";
import { Plotter } from "components/Plotter";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


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
        groups = groupBy(dropLeadingZeros(data,"value"), item => item.name);

    return <Plotter
        data={
            Object.keys(groups).map((areaName, index) => {

                const
                    yData = groups[areaName].map(item => item.value),
                    xData = groups[areaName].map(item => item.date);

                return {
                    name: areaName,
                    x: xData,
                    y: yData,
                    hovertemplate: "%{y}",
                    fill: 'tozeroy',
                    type: "bar",
                    marker: {
                        color: colours[index]
                    }
                }

            })
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
        groups = groupBy(dropLeadingZeros(data, "value"), item => item.name);

    return <Plotter
        data={
            Object.keys(groups).map((areaName, index) => {

                const
                    yData = groups[areaName].map(item => item.value),
                    xData = groups[areaName].map(item => item.date);

                return {
                    name: areaName,
                    x: xData,
                    y: yData,
                    hovertemplate: "%{y}",
                    fill: 'tozeroy',
                    type: "bar",
                    marker: {
                        color: colours[index]
                    }
                }

            })
        }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.testing,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <MainLoading/>;

    return <>
        <HeadlineNumbers params={ params } { ...layout }/>
        <MixedCardContainer>
            {
                layout?.cards.map(( cardProps, index ) =>
                    <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
                ) ?? null
            }
            <Card fullWidth>
                <CardHeader heading={ "NHS and PHE tests by nation" } fullWidth={ true }/>
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
        </MixedCardContainer>
    </>
};

export default withRouter(Testing);
