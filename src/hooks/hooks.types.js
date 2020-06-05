import type { ParsedParams } from "common/utils/utils.types";


export type useApiStructureInput = {[string]: [string]} | Array<string, string>;

export type useApiResponseInput = useApiStructureInput;

export type useApiResponse = Array<useApiStructureInput>;

export type useApiInputs = {
    conjunctiveFilters: ParsedParams,
    disjunctiveFilters: ParsedParams,
    structure: useApiStructureInput,
    defaultResponse: useApiResponseInput,
    extraParams: ParsedParams
}
