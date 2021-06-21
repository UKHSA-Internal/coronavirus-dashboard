// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import {
    Card,
    ContentBox,
    HalfCardSplitBody,
    CardHeader
} from 'components/Card';

import ValueBox from "components/ValueBox";
import { Container } from './DailySummary.styles';

import { getParams, getPlotData } from "common/utils";

import useApi from "hooks/useApi";

import { Plotter } from "./plots";

import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import type {
    DailySummaryCardProps
} from "./DailySummary.types";
import Loading from "components/Loading";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' },
    ];


// const NationDeathsPlot = ({ ...props }) => {
//
//     const
//         latestNationDeaths = useApi({
//             conjunctiveFilters: [
//                 { key: "areaType", sign: "=", value: "nation" }
//             ],
//             structure: { name: "areaName", death: "newDeathsByPublishDate" },
//             extraParams: [{ key: "latestBy", sign: "=", value: "date" }],
//             defaultResponse: []
//         }),
//         nationalDataDeaths = latestNationDeaths.map(item => item?.death ?? null),
//         maxDeath = max(nationalDataDeaths);
//
//     return <BarPlotter
//         data={[
//             {
//                 name: "Daily deaths",
//                 y: latestNationDeaths
//                     .map(({ name="" }) => name.replace(/Northern Ireland/g, "NI")),
//                 x: nationalDataDeaths,
//                 text: nationalDataDeaths
//                     .map(item => `${item}`),
//                 type: "bar",
//                 orientation: "h",
//                 width: 0.7,
//                 mode: 'marker+text',
//                 marker: {
//                     color: '#005EA5'
//                 },
//                 texttemplate: '%{text:s}',
//                 textposition: nationalDataDeaths
//                     .map(item => item !== 0 ? 'auto' : 'outside'),
//                 cliponaxis: true,
//                 showlegend: false,
//                 textfont: {
//                     color: nationalDataDeaths
//                         .map(item => item === maxDeath ? '#fff' :  '#005EA5'),
//                     family: `"GDS Transport", Arial, sans-serif`,
//                     size: 11
//                 }
//             }
//         ]}
//         { ...props }
//     />
//
// };  // DeathsCard



const DailySummaryCard: ComponentType<DailySummaryCardProps> = ({ params, layout=[], heading }: DailySummaryCardProps) => {

    const
        headingLabel = heading.toLowerCase().replace(/[\s:]/g, "_"),
        structure = { date: "date" },
        chartData = {};

    for ( const { primaryValue, secondaryValue=null, ...rest } of layout )  {

        structure[primaryValue] = primaryValue;

        if ( secondaryValue )
            structure[secondaryValue] = secondaryValue;

        if ( rest?.chart ?? null ) {

            structure[rest.chart.value] = rest.chart.value;

        }

    }

    const
        // Plotter = lazy(() => import('components/Plotter')),
        [ plotData, setPlotData ] = useState(
            layout.reduce((acc, { chart={} }) =>
                chart && !((chart?.value ?? null) in chartData)
                    ? {...acc, [chart.value]: chart?.display ?? true }
                    : acc, {}
            )
        ),
        data = useApi({
            conjunctiveFilters: params,
            structure: structure,
            defaultResponse: null
        });


    return <Card heading={ heading }>
        <CardHeader heading={ heading }
                    linkToHeading={ `More on ${ heading.toLowerCase() }` }/>
        <HalfCardSplitBody>
            <ContentBox>{
                data === null
                    ? <Loading size={ 8 } margin={ 2 } color={ '#adadad' }/>
                    : <Plotter data={
                            getPlotData(
                                layout
                                    .filter(({ chart = false }) => chart && (plotData?.[chart.value] ?? true))
                                    .map(item => item.chart),
                                data
                            )
                        }
                    />
            }</ContentBox>
            <ContentBox role={ "region" }
                        aria-label={ `${ heading }: Latest data` }
                        aria-describedby={ `container_${ headingLabel }-description` }>
                <span id={ `container_${ headingLabel }-description` }
                      className={ "govuk-visually-hidden" }>
                    Latest available data on "{ heading }".
                </span>
                {
                    layout.map((item, index) =>
                        <ValueBox { ...item }
                                  heading={ heading }
                                  params={ params }
                                  data={ data }
                                  embedded={ true }
                                  isEnabled={ plotData?.[(item?.chart?.value ?? null)] ?? true }
                                  setChartState={ () => {
                                      const name = item?.chart?.value ?? null;

                                      setPlotData( plotData =>
                                          name
                                              ? { ...plotData, [name]: !(plotData?.[name] ?? true) }
                                              : plotData
                                      )
                                  } }
                                  key={ `${heading}-${index}` }/>)
                }
                {/*{*/}
                {/*    heading.toLowerCase().indexOf("death") > -1*/}
                {/*        ? <NationDeathsPlot/>*/}
                {/*        : null*/}
                {/*}*/}
            </ContentBox>
        </HalfCardSplitBody>
    </Card>

};  // DailySummaryCard


const DailySummary = ({ location: { search: query } }) => {

    const
        pageLayout = usePageLayout(URLs.pageLayouts.UKSummary, {}),
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        { summary=[] } = pageLayout;

    if ( !summary ) return <Loading large={ true }/>

    return <Container className={ "util-flex util-flex-wrap" }>{
        summary.map((item, index) =>
            <DailySummaryCard
                key={ `card-${item?.heading ?? ""}-${ index }` }
                params={ params }
                heading={ item?.heading ?? "" }
                layout={ item?.fields ?? [] }/>
        )
    }</Container>

};  // DailySummary

export default withRouter(DailySummary)
