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
import Loading from "components/Loading";
import { PulseLoader } from "react-spinners";
import { DataTable } from "components/GovUk";


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
            defaultResponse: null
        }),
        colourIndices = [ 0, 9, 3, 10 ],
                groups = data !== null
            ? groupBy(dropLeadingZeros(data, "value"), item => item.name)
            : {};

    if ( data === null )
        return <PulseLoader size={ 8 } margin={ 2 } color={ '#adadad' }/>;

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
                        color: colours[colourIndices[index]]
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
                // value: "newPillarOneTestsByPublishDate",
                value: "cumPillarOneTestsByPublishDate",
                date: "date",
                name: "areaName"
            },
            defaultResponse: null
        }),
        colourIndices = [ 0, 9, 3, 10 ],
        groups = data !== null
            ? groupBy(dropLeadingZeros(data, "value"), item => item.name)
            : {};

    if ( data === null )
        return <PulseLoader size={ 8 } margin={ 2 } color={ '#adadad' }/>;

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
                        color: colours[colourIndices[index]]
                    }
                }

            })
        }
        layout={{ barmode: "stack" }}
    />

}; // TotalPlot


const NationData = () => {
    const
        data = useApi({
            conjunctiveFilters: [
                { key: "areaType", sign: "=", value: "nation" }
            ],
            structure: {
                daily: "newPillarOneTestsByPublishDate",
                cumulative: "cumPillarOneTestsByPublishDate",
                date: "date",
                name: "areaName"
            },
            defaultResponse: null
        });

    if ( data === null )
        return <PulseLoader size={ 8 } margin={ 2 } color={ '#adadad' }/>;

    const
        groups = groupBy(dropLeadingZeros(data, "daily", "cumulative"), item => item.date),
        tableData = [];

    let row;

    console.log(groups);

    for ( const date in groups ) {

        // if ( !groups.hasOwnProperty(date) ) continue;

        row = [ date ]

        for ( const { daily, cumulative } of groups[date].sort(({ nameA }, { nameB }) => nameA > nameB || -(nameB > nameA) || 0) ) {
            row = [...row, daily, cumulative ]
        }

        tableData.push( row )

    }

    console.log(groups[Object.keys(groups)[0]]
            .map(row => ([
                { value: `${ row.name } daily tests`, type: "number" },
                { value: `${ row.name } total tests`, type: "number" },
            ])).reduce((acc, item) => [...acc, ...item], []))

    // return null
    return <DataTable heading={[
        { value: "Date", type: "date" },
        ...groups[Object.keys(groups)[0]]
            .map(row => ([
                { value: `${ row.name } daily tests`, type: "number" },
                { value: `${ row.name } total tests`, type: "number" },
            ])).reduce((acc, item) => [...acc, ...item], [])
    ]}
    data={[]}/>

};


const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.testing,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <Loading large={ true }/>;

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
                        <NationData/>
                    </TabLink>

                </TabLinkContainer>
            </Card>
        </MixedCardContainer>
    </>
};

export default withRouter(Testing);
