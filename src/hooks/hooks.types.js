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
    primaryLabel: string,
    primaryValue: string,
    primarySign?: string,
    primaryTooltip?: string,
    primaryModal?: string,

    secondaryLabel?: string,
    secondaryValue?: string,
    secondarySign?: string,
    secondaryTooltip?: string,
    secondaryModal?: string,

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


export type UKSummaryInput = "UKSummary";

export type usePageLayoutReturnType<T> =
    T extends UKSummaryInput ? UKSummary : void;


export type usePageLayoutInputType = UKSummaryInput;
