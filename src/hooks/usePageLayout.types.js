export type CardNumberDataType = {
    caption: string,

    primaryLabel: string,
    primaryValue: string,
    primarySign?: string,
    primaryTooltip?: string,

    secondaryLabel?: string,
    secondaryValue?: string,
    secondarySign?: string,
    secondaryTooltip?: string
} // CardNumberDataType

export type UKSummaryField = CardNumberDataType & {

    chart?: {
        variableName: string,
        colour: string
        rollingAverage: boolean
    }
};

export type UKSummary = {
    summary: Array<{
        heading: string,

        fields: Array<UKSummaryField>
    }>
};

export type GenericChartType = {
    label: string,
    value: string,
    tooltip: string,
    type: "line"
        | "bar",
    colour: number,
    fill: boolean,
    rollingAverage: false | {
        window: number,
        clipEnd: number
    }
};

export type GenericTabType = {
    heading: string,
    barType?: null
            | "normal"
            | "overlay"
            | "stack"
            | "group",
}

export type GenericTableTabType = GenericChartType & {
    label: string,
    value: string,
    tooltip: string,
    type: "numeric"
        | "date"
        | "string"
}

export type ChartTabType = GenericTabType & {
    tabType: "chart"
    fields?: Array<GenericChartType>
}

export type TableTabType = GenericTabType & {
    tabType: "table"
    fields?: Array<GenericTableTabType>
}

export type TabType = ChartTabType | TableTabType;

export type Testing = {

    headlineNumbers: CardNumberDataType,

    cards: {
        heading: string,
        cardType: "chart"
                | "map",
        fullWidth: boolean,

        tabs: Array<ChartTabType | TableTabType>
    }

};

export type Healthcare = Testing;
export type Deaths = Testing;
export type Cases = Testing;

export type UKSummaryInput = "UKSummary.json";
export type TestingInput = "testing.json";
export type HealthcareInput = "healthcare.json";
export type DeathsInput = "deaths.json";
export type CasesInput = "cases.json";

export type usePageLayoutReturnType<T> =
    T extends UKSummaryInput ? UKSummary :
    T extends TestingInput ? Testing :
    T extends HealthcareInput ? Healthcare :
    T extends DeathsInput ? Deaths :
    T extends CasesInput ? Cases : void


export type LayoutInput =
    UKSummaryField
    | TestingInput
    | HealthcareInput
    | DeathsInput
    | CasesInput;

export type PageLayoutDefaultOutput = null | {
    [any]: any
} | Array<any>;

declare export type usePageLayoutInputType<T1, T2> =
    (layout: LayoutInput, defaultOutput: PageLayoutDefaultOutput) => usePageLayoutReturnType<T1> | T2;
