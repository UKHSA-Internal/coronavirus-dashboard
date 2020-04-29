declare export type ArchiveData = {

    date: string,
    url: string,
    category: "cases" | "deaths",
    format: "csv" | "json"

}; // ArchiveData


declare export type DateGroupedArchiveData = Array<{ [string]: ArchiveData }>;


declare export type
    //                              URL,    FORMAT, CATEGORY, YEAR,   MONTH,   DAY
    RegExExtractArchiveData = Array<string, string, string,   string, string, string>;

export interface ArchiveState {

    loading: true,
    data: DateGroupedArchiveData

} // ArchiveState


export interface ArchiveProps {

    value: string

} // ArchiveProps
