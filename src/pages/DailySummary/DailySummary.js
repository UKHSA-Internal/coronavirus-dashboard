// @flow

import React  from 'react';
import { withRouter } from 'react-router';

import moment from "moment";

import { HalfWidthCard, VisualSection, ValueItem, ValueItemsSection } from 'components/Card';

import { Container } from './DailySummary.styles';

import { max } from "d3-array";
import { MainLoading } from "components/Loading";
import { getParams, hexToRgb, strFormat, getMaxDateValuePair } from "common/utils";
import { movingAverage } from "common/stats";

import useApi from "hooks/useApi";

import { BarPlotter, Plotter } from "./plots";

import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import type {
    DailySummaryCardProps
} from "./DailySummary.types"
import type { UKSummaryField } from "hooks/hooks.types";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' },
    ];


export const timestamp = (data): string =>
    data.hasOwnProperty("metadata")
        ? moment(data?.metadata?.lastUpdatedAt).format("dddd D MMMM YYYY [at] h:mma")
        : "";


const groupByUniqueKey = (data, uniqueKeyName) => {

    try {
        return data
            .reduce((acc, { [uniqueKeyName]: grouper, ...rest }) =>
                grouper ? { ...acc, [grouper]: rest } : acc, {})
    } catch {
        return {}
    }

};  // groupByUniqueKey


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


const getPlotData = (layout: Array<UKSummaryField>, data) => {

    return layout
        .filter(item => item.hasOwnProperty("chart"))
        .map(item => {
            const yData =
                    data.map(variable => variable?.[item.chart.variableName] ?? null),
                    { r, g, b } = hexToRgb(item.chart.colour);

            return {
                x: data.map(item => item?.date ?? null),
                y: item.chart.rollingAverage ? movingAverage(yData, 7) : yData,
                type: 'line',
                mode: 'lines',
                fill: 'tozeroy',
                fillcolor: `rgba(${r},${g},${b},0.1)`,
                line: {
                    color: item.chart.colour
                }
            }
        })

};  // getYAxisData


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


const DailySummaryCard = ({ params, layout, heading }: DailySummaryCardProps) => {

    const structure = { date: "date" };

    for ( const { primaryValue, secondaryValue=null, ...rest } of layout )  {

        structure[primaryValue] = primaryValue;

        if ( secondaryValue )
            structure[secondaryValue] = secondaryValue;

        if ( rest?.chart ?? null )
            structure[rest.chart.variableName] = rest.chart.variableName;

    }

    const data = useApi({
        conjunctiveFilters: params,
        structure: structure
    });

    return <HalfWidthCard heading={ heading }>
        <VisualSection>
            <Plotter data={ getPlotData(layout, data) }/>
        </VisualSection>
        <ValueItemsSection>
            {
                layout.map((item, index) =>
                    <ValueBox { ...item } data={ data } key={ `${heading}-${index}` }/>)
            }
            {/*{*/}
            {/*    heading.toLowerCase().indexOf("death") > -1*/}
            {/*        ? <NationDeathsPlot/>*/}
            {/*        : null*/}
            {/*}*/}
        </ValueItemsSection>
    </HalfWidthCard>

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
