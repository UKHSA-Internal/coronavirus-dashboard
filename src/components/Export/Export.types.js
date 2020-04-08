interface UndatedDataInterface {

    value: string

} // UndatedDataInterface


interface DatedDataInterface extends UndatedDataInterface {

    date: string

} // DatedDataInterface


interface ContentDataInterface {

    name:                       UndatedDataInterface,
    totalCases:                 UndatedDataInterface,
    deaths:                     UndatedDataInterface,
    recovered:                  UndatedDataInterface,
    dailyConfirmedCases:        Array<DatedDataInterface>,
    dailyTotalConfirmedCases:   Array<DatedDataInterface>,
    dailyDeaths?:               Array<DatedDataInterface>,
    dailyTotalDeaths?:          Array<DatedDataInterface>

} // ContentDataInterface


interface ContentInterface {

    [string]: ContentDataInterface

} // ContentInterface


export interface DataInterface {

    lastUpdatedAt: string,
    disclaimer:    string,
    overview:      ContentInterface,
    countries:     ContentInterface,
    regions:       ContentInterface,
    utlas:         ContentInterface

} // DataInterface


export interface ExportAsCSVProps {

    fileName?: string,
    linkText?: string,
    data: DataInterface

} // ExportAsCSVProps


export interface DownloadAsCSVInterface {

    csv: Array<Array<number|string|null>>,
    headings: Array<string>,
    fileName: string

} // DownloadAsCSVInterface