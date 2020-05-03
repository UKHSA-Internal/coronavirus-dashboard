// @flow

declare export type DateValuePair = {

    date:  string,
    value: number

}; // DateValuePair


declare export type NumericValueOnly = {
  
    value: number 
    
}; // NumericValueOnly


declare export type AgeValueItem = {

    age:   string,
    value: number

}; // AgeValueItem


declare export type StringValueOnly = {
  
    value: string 
    
}; // StringValueOnly


declare export type LocalAuthorityItem = {

    name:                     StringValueOnly,
    totalCases:               NumericValueOnly,
    dailyTotalConfirmedCases: Array<DateValuePair>,
    dailyConfirmedCases:      Array<DateValuePair>,

}; // LocalAuthorityItem


declare export type LocalAuthorityData = {

    [key: string]: LocalAuthorityItem,

}; // LocalAuthorityData


declare export type OverviewItem = {
    
    name:                       StringValueOnly,
    totalCases:                 NumericValueOnly,
    newCases:                   NumericValueOnly,
    deaths:                     NumericValueOnly,
    dailyTotalConfirmedCases:   Array<DateValuePair>,
    dailyConfirmedCases:        Array<DateValuePair>,
    dailyTotalDeaths:           Array<DateValuePair>,
    dailyDeaths:                Array<DateValuePair>,
    
}; // OverviewItem


declare export type SingleCountryData = {

    name:                      StringValueOnly,
    totalCases:                StringValueOnly,
    deaths:                    StringValueOnly,
    dailyTotalConfirmedCases:  Array<DateValuePair>,
    dailyConfirmedCases:       Array<DateValuePair>,
    dailyTotalDeaths:          Array<DateValuePair>,
    dailyDeaths:               Array<DateValuePair>,

}; // SingleCountryData


declare export type AdjustmentData = {

    previouslyReportedDailyCases:              Array<DateValuePair>,
    previouslyReportedDailyCasesAdjusted:      Array<DateValuePair>,
    changeInDailyCases:                        Array<DateValuePair>,
    previouslyReportedDailyTotalCasesAdjusted: Array<DateValuePair>,
    changeInDailyTotalCases:                   Array<DateValuePair>

}; // AdjustmentData


declare export type AgeSexBreakdownData = {

    femaleCases: Array<AgeValueItem>,
    maleCases:   Array<AgeValueItem>

} // AgeSexData


export type CountryData = {

    // England
    E92000001: SingleCountryData & AdjustmentData & AgeSexBreakdownData,

    // Scotland
    S92000003: SingleCountryData,

    // Wales
    W92000004: SingleCountryData,

    // NI
    N92000002: SingleCountryData,

}; // CountryData


declare export type SingleRegionData = {

    name:                     StringValueOnly,
    totalCases:               NumericValueOnly,
    dailyTotalConfirmedCases: Array<DateValuePair>,
    dailyConfirmedCases:      Array<DateValuePair>,

}; // SingleRegionData


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
    
}; // RegionData


declare export type OverviewData = {
    
    // UK
    K02000001: OverviewItem,
    
}; // OverviewData


declare export type Data = {
    
    lastUpdatedAt: string,
    disclaimer:    string,
    overview:      OverviewData,
    countries:     CountryData,
    regions:       RegionData,
    utlas:         LocalAuthorityData,
    ltlas:         LocalAuthorityData,

}; // Data
