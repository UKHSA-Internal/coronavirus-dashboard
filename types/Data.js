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

declare type DailyConfirmedCases = {
  // Date format YYYY-MM-DD
  dailyConfirmedCases: Array<{ date: string, value: number }>,
};

declare type ExtraStatsAndChart = {
  seriousness: {
    mild: number,
    severe: number,
    critical: number,
  },
  recovery: {
    recovered: number,
    deaths: number,
  },
  highRisk: {
    percentageOfInfecteesWhoDie: number,
    seriousIllness: number,
  },
};

declare type Data = {
  lastUpdatedAt: string,
  UK: HighLevelStats & ExtraStatsAndChart,
  England: HighLevelStats & DailyConfirmedCases,
  Scotland: HighLevelStats & DailyConfirmedCases,
  Wales: HighLevelStats & DailyConfirmedCases,
  'Northern Ireland': HighLevelStats & DailyConfirmedCases,
  [region: string]: HighLevelStats & DailyConfirmedCases,
};

declare type OverviewData = {
  lastUpdatedAt: string,
  'United Kingdom': HighLevelStats & ExtraStatsAndChart,
};

declare type CountryData = {
  lastUpdatedAt: string,
  England: HighLevelStats & DailyConfirmedCases,
  Scotland: HighLevelStats & DailyConfirmedCases,
  Wales: HighLevelStats & DailyConfirmedCases,
  'Northern Ireland': HighLevelStats & DailyConfirmedCases,
};

declare type NhsRegionData = {
  lastUpdatedAt: string,
  [region: string]: HighLevelStats & DailyConfirmedCases,
};

declare type LocalAuthorityData = {
  lastUpdatedAt: string,
  [region: string]: HighLevelStats & DailyConfirmedCases,
};