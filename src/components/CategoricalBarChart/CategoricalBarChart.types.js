// @flow


declare type SingleDataItem = {[string]: string, value: number}

declare type ChartDataType = Array<Array<SingleDataItem>>;


declare type LabelsType = Array<string>;


declare type ColorsType = Array<string>;


declare export type CategoricalBarChartType = {

    data: ChartDataType,
    categoryLabels: LabelsType,
    colors: ColorsType,
    columnLabelGetter: (SingleDataItem) => string

} // CategoricalBarChartType


declare export type ChartProps = {

    header: string,
    tooltipText: string,
    data: CategoricalBarChartType,
    description: string|null

} // ChartProps
