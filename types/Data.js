// @flow

declare type HighLevelStats = {
  totalCases: {
    value: number,
  },
  activeCases: {
    value: number,
  },
  tested: {
    value: number,
  },
  hospital: {
    value: number,
  },
  recovered: {
    value: number,
  },
  deaths: {
    value: number,
  },
};

type ChartData = Array<{ date: string, value: number }>; 

declare type OverviewData = {
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
};

declare type SingleCountryData = {
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


interface EnglandData extends SingleCountryData {
    previouslyReportedDailyCases: ChartData,
    changeInDailyCases: ChartData,
    previouslyReportedDailyTotalCases: ChartData,
    changeInDailyTotalCases: ChartData
} // EnglandData


declare type CountryData = {
  // England
  E92000001: EnglandData,
  // Scotland
  S92000003: SingleCountryData,
  // Wales
  W92000004: SingleCountryData,
  // NI
  N92000002: SingleCountryData,
};

declare type SingleRegionData = {
  name: { value: string },
  totalCases: {
    value: number,
  },
  dailyTotalConfirmedCases: ChartData,
  dailyConfirmedCases: ChartData,
};

declare type RegionData = {
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

declare type SingleUtlaData = {
  name: { value: string },
  totalCases: {
    value: number,
  },
  dailyTotalConfirmedCases: ChartData,
  dailyConfirmedCases: ChartData,
};

declare type UtlaData = {
  [key: string]: SingleUtlaData,
};

declare type Data = {
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