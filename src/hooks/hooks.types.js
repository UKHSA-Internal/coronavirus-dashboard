import type {ParsedParams} from "common/utils/utils.types";


export type useApiStructureInput = { [key: string]: [string] } | Array<string>;

export type useApiResponseInput = useApiStructureInput;

export type useApiResponse = Array<useApiStructureInput>;

export type useApiInputs = {
    conjunctiveFilters: ParsedParams,
    disjunctiveFilters: ParsedParams,
    structure: useApiStructureInput,
    defaultResponse: useApiResponseInput,
    extraParams: ParsedParams
}


export type UKSummaryField = {
    caption: string,

    primaryLabel: string,
    primaryValue: string,
    primarySign?: string,
    primaryTooltip?: string,

    secondaryLabel?: string,
    secondaryValue?: string,
    secondarySign?: string,
    secondaryTooltip?: string,

    chart?: {
        variableName: string,
        colour: string
        rollingAverage: boolean
    }
}

export type UKSummary = {
    summary: Array<{
        heading: string,
        
        fields: Array<UKSummaryField>
    }>
};


export type Testing = {||};
export type Healthcare = {||};
export type Deaths = {||};
export type Cases = {||};

export type UKSummaryInput = "UKSummary";
export type TestingInput = "testing";
export type HealthcareInput = "healthcare";
export type DeathsInput = "deaths";
export type CasesInput = "cases";

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

export type PageLayoutDefaultOutput = {
    [any]: any
} | Array<any>;

declare export type usePageLayoutInputType<T> = (layout: LayoutInput, defaultOutput: PageLayoutDefaultOutput) => usePageLayoutReturnType<T>;
