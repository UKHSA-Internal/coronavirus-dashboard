// Global constants

//
// ATTENTION: Updates to routing paths must be reflected in "assets/paths.json"
//

import Path from "assets/paths.json";


export const PathNameMapper = Path;


export const PathNames = {
    // Only use lower case in paths.
    summary: "/details/",
    interactiveMap: "/details/interactive-map",
    cases: "/details/cases",
    testing: "/details/testing",
    healthcare: "/details/healthcare",
    vaccinations: "/details/vaccinations",
    deaths: "/details/deaths",
    aboutData: "/details/about-data",
    cookies: "/details/cookies",
    accessibility: "/details/accessibility",
    devGuide: "/details/developers-guide",
    downloadData: "/details/download",
    whatsNew: "/details/whats-new",
    metrics: "/metrics",
}


export const NoPickerPaths = [
    "/details",
    "/details/interactive-map",
    "/details/interactive-map/cases",
    "/details/interactive-map/vaccinations",
    "/details/download",
    "/details/about-data",
    "/details/cookies",
    "/details/accessibility",
    "/details/archive",
    "/details/new-service",
    "/details/developers-guide",
    "/details/whats-new",
    "/metrics",
];


export const LocationBannerMapper = {
    "/details/cases": "Cases",
    "/details/testing": "Testing",
    "/details/healthcare": "Healthcare",
    "/details/deaths": "Deaths",
    "/details/vaccinations": "Vaccinations"
};


export const PathWithHeader = [
    "/details/",
    "/details/testing",
    "/details/cases",
    "/details/healthcare",
    "/details/Vaccinations",
    "/details/deaths",
    "/details/new-service",
    "/details/developers-guide"
];


export const AreaTypeOptions = [
    { value: "overview", label: "United Kingdom" },
    { value: "nation", label: "Nation" },
    { value: "region", label: "Region" },
    { value: "nhsRegion", label: "NHS Region" },
    { value: "nhsTrust", label: "NHS Trust" },
    { value: "utla", label: "Upper Tier Local Authority" },
    { value: "ltla", label: "Lower Tier Local Authority" },
    { value: "msoa", label: "Middle layer Super Output Areas (MSOA)" }
];


export const MSOAMetricOptions = [
    {
        value: "newCasesBySpecimenDateRollingSum",
        label: "newCasesBySpecimenDateRollingSum",
        deprecated: null
    },
    {
        value: "newCasesBySpecimenDateRollingRate",
        label: "newCasesBySpecimenDateRollingRate",
        deprecated: null
    },
    {
        value: "newCasesBySpecimenDateChange",
        label: "newCasesBySpecimenDateChange",
        deprecated: null
    },
    {
        value: "newCasesBySpecimenDateChangePercentage",
        label: "newCasesBySpecimenDateChangePercentage",
        deprecated: null
    },
    {
        value: "newCasesBySpecimenDateDirection",
        label: "newCasesBySpecimenDateDirection",
        deprecated: null
    },
    {
        value: "cumPeopleVaccinatedFirstDoseByVaccinationDate",
        label: "cumPeopleVaccinatedFirstDoseByVaccinationDate",
        deprecated: null
    },
    {
        value: "cumVaccinationFirstDoseUptakeByVaccinationDatePercentage",
        label: "cumVaccinationFirstDoseUptakeByVaccinationDatePercentage",
        deprecated: null
    },
    {
        value: "cumVaccinationThirdInjectionUptakeByVaccinationDatePercentage",
        label: "cumVaccinationThirdInjectionUptakeByVaccinationDatePercentage",
        deprecated: null
    },
    {
        value: "cumVaccinationSecondDoseUptakeByVaccinationDatePercentage",
        label: "cumVaccinationSecondDoseUptakeByVaccinationDatePercentage",
        deprecated: null
    },
    {
        value: "cumPeopleVaccinatedSecondDoseByVaccinationDate",
        label: "cumPeopleVaccinatedSecondDoseByVaccinationDate",
        deprecated: null
    },
    {
        value: "VaccineRegisterPopulationByVaccinationDate",
        label: "VaccineRegisterPopulationByVaccinationDate",
        deprecated: null
    },
    {
        value: "cumPeopleVaccinatedThirdInjectionByVaccinationDate",
        label: "cumPeopleVaccinatedThirdInjectionByVaccinationDate",
        deprecated: null
    },

    // Deprecated
    // { value: "cumVaccinationCompleteCoverageByVaccinationDatePercentage", label: "cumVaccinationCompleteCoverageByVaccinationDatePercentage", deprecated: "2021-10-16" },
    // { value: "cumPeopleVaccinatedCompleteByVaccinationDate", label: "cumPeopleVaccinatedCompleteByVaccinationDate", deprecated: "2021-10-16" },
];

export const ExcludedAreaNames = ["Isles of Scilly", "City of London", "United Kingdom"
];