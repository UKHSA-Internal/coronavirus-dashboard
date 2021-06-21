import type {ParsedParams} from "common/utils/utils.types";


export type useApiStructureInput = { [key: string]: [string] } | Array<string>;

export type useApiResponseInput = useApiStructureInput;

export type useApiResponse = Array<useApiStructureInput>;

export type useApiInputs = {
    conjunctiveFilters: ParsedParams,
    disjunctiveFilters: ParsedParams,
    structure: useApiStructureInput,
    defaultResponse: useApiResponseInput,
    extraParams: ParsedParams,
    endpoint: "lookupApi"
            | "mainApi",
    cache: boolean
}


export type generateUrlInputs = {
    conjunctiveFilters: ParsedParams,
    disjunctiveFilters: ParsedParams,
    structure: useApiStructureInput,
    extraParams: ParsedParams,
    endpoint: "lookupApi"
            | "mainApi"
}




declare type GeoDataResponseItem = {
    properties: {
        [string]: {
            lat: number,
            long: number
        },
        [string]: any
    },
    id?: string,
    [string]: any
}; // GeoDataType

export type useGenericAPInputs = {
    defaultResponse: useApiResponseInput
}

export type useGenericAPIResponse = Array<useApiStructureInput>;


export type GeoDataResponseType = GeoDataResponseItem[];