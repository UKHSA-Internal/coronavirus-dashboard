// @flow

declare export type ChartData = Array<{ date: string, value: number }>;


declare export type OverviewData = {
    name: { value: string },
    totalCases: {
        value: number,
    },
    newCases: {
        value: number,
    },
    deaths: {
        value: number,
    },
    dailyTotalConfirmedCases: ChartData,
    dailyConfirmedCases: ChartData,
    dailyTotalDeaths: ChartData,
    dailyDeaths: ChartData,
    dailyTests: ChartData
};


declare export type SingleCountryData = {
    name: { value: string },
    totalCases: {
        value: number,
    },
    deaths: {
        value: number,
    },
    dailyTotalConfirmedCases: ChartData,
    dailyConfirmedCases: ChartData,
    dailyTotalDeaths: ChartData,
    dailyDeaths: ChartData,
};


declare export type PreviousData = {
    previouslyReportedDailyCases: ChartData,
    changeInDailyCases: ChartData,
    previouslyReportedDailyTotalCases: ChartData,
    changeInDailyTotalCases: ChartData
}; // EnglandData


declare export type EnglandData = ChartData & PreviousData;


declare export type CountryData = {
    // England
    E92000001: EnglandData,
    // Scotland
    S92000003: SingleCountryData,
    // Wales
    W92000004: SingleCountryData,
    // NI
    N92000002: SingleCountryData,
};


declare export type SingleRegionData = {
    name: { value: string },
    totalCases: {
        value: number,
    },
    dailyTotalConfirmedCases: ChartData,
    dailyConfirmedCases: ChartData,
};


declare export type RegionData = {
    // West midlands
    E12000005: SingleRegionData,
    // East of england
    E12000006: SingleRegionData,
    // North west
    E12000002: SingleRegionData,
    // East midlands
    E12000004: SingleRegionData,
    // South west
    E12000009: SingleRegionData,
    // London
    E12000007: SingleRegionData,
    // Yorkshire and the humber
    E12000003: SingleRegionData,
    // North east
    E12000001: SingleRegionData,
    // South east
    E12000008: SingleRegionData,
};


declare export type SingleUtlaData = {
    name: { value: string },
    totalCases: {
        value: number,
    },
    dailyTotalConfirmedCases: ChartData,
    dailyConfirmedCases: ChartData,
};


declare export type UtlaData = {
    [key: string]: SingleUtlaData,
};


declare export type Data = {
    lastUpdatedAt: string,
    disclaimer: string,
    overview: {
        // UK
        K02000001: OverviewData,
    },
    countries: CountryData,
    regions: RegionData,
    utlas: UtlaData,
};