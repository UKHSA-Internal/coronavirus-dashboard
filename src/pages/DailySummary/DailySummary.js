// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import { Card, VisualSection, ValueBox, NumericReports, HalfCardSplitBody, CardHeader } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { getParams, } from "common/utils";

import { getPlotData } from "common/utils";

import useApi from "hooks/useApi";

import { BarPlotter, Plotter } from "./plots";

import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import type {
    DailySummaryCardProps
} from "./DailySummary.types";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' },
    ];


const NationDeathsPlot = ({ ...props }) => {

    const
        latestNationDeaths = useApi({
            conjunctiveFilters: [
                { key: "areaType", sign: "=", value: "nation" }
            ],
            structure: { name: "areaName", death: "newDeathsByPublishDate" },
            extraParams: [{ key: "latestBy", sign: "=", value: "date" }],
            defaultResponse: []
        }),
        nationalDataDeaths = latestNationDeaths.map(item => item?.death ?? null),
        maxDeath = max(nationalDataDeaths);

    return <BarPlotter
        data={[
            {
                name: "Daily deaths",
                y: latestNationDeaths
                    .map(({ name="" }) => name.replace(/Northern Ireland/g, "NI")),
                x: nationalDataDeaths,
                text: nationalDataDeaths
                    .map(item => `${item}`),
                type: "bar",
                orientation: "h",
                width: 0.7,
                mode: 'marker+text',
                marker: {
                    color: '#005EA5'
                },
                texttemplate: '%{text:s}',
                textposition: nationalDataDeaths
                    .map(item => item !== 0 ? 'auto' : 'outside'),
                cliponaxis: true,
                showlegend: false,
                textfont: {
                    color: nationalDataDeaths
                        .map(item => item === maxDeath ? '#fff' :  '#005EA5'),
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 11
                }
            }
        ]}
        { ...props }
    />

};  // DeathsCard


const DailySummaryCard: ComponentType<DailySummaryCardProps> = ({ params, layout, heading }: DailySummaryCardProps) => {

    const
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
        [ plotData, setPlotData ] = useState({}),
        data = useApi({
            conjunctiveFilters: params,
            structure: structure
        });

    useEffect(() => {

        for ( const { chart={} } of layout ) {

            if ( chart && !chartData.hasOwnProperty(chart?.value ?? null) ) {

                chartData[chart.value] = chart?.display ?? true;

            }
        }

        setPlotData(chartData)

    }, [ params ]);

    return <Card heading={ heading }>
        <CardHeader heading={ heading } linkToHeading={ "More detail" }/>
        <HalfCardSplitBody>
            <VisualSection>
                <Plotter data={ getPlotData(
                    layout
                        .filter(({ chart=false }) => chart && (plotData?.[chart.value] ?? true))
                        .map(item => item.chart),
                    data
                )
                }/>
            </VisualSection>
            <NumericReports>
                {
                    layout.map((item, index) =>
                        <ValueBox { ...item }
                                  params={ params }
                                  data={ data }
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
            </NumericReports>
        </HalfCardSplitBody>
    </Card>

};  // DailySummaryCard


const DailySummary = ({ location: { search: query } }) => {

    const
        pageLayout = usePageLayout(URLs.pageLayouts.UKSummary, {}),
        urlParams = getParams(query),
        params = urlParams.length ? urlParams : DefaultParams,
        { summary=[] } = pageLayout;

    return <Container className={ "util-flex util-flex-wrap" }>{
        summary.map((item, index) =>
            <DailySummaryCard
                key={ `card-${item?.heading ?? ""}-index` }
                params={ params }
                heading={ item?.heading ?? "" }
                layout={ item?.fields ?? [] }/>
        )
    }</Container>

};  // DailySummary

export default withRouter(DailySummary)
