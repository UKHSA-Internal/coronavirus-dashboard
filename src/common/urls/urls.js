const
    env = process?.env ?? {},
    {
        REACT_APP_MAIN_CDN      = "%MAIN_CDN%",
        REACT_APP_DOWNLOADS_CDN = "%DOWNLOADS_CDN%",
        REACT_APP_BASE_URL      = "%BASE_URL%"
    } = env;



const URLs = {

    populationData:  `https://${ REACT_APP_MAIN_CDN      }/assets/population/population.json`,
    baseData:        `https://${ REACT_APP_DOWNLOADS_CDN }/downloads/data/`,
    baseGeo:         `https://${ REACT_APP_MAIN_CDN      }/assets/geo/`,
    mapStyle:        `https://${ REACT_APP_MAIN_CDN      }/assets/map/style_v3.json`,
    landingData:     `https://${ REACT_APP_DOWNLOADS_CDN }/downloads/data/landing.json`,
    timestamp:       `https://${ REACT_APP_DOWNLOADS_CDN }/downloads/test/v2/info/latest_timestamp`,
    lookups:         `https://${ REACT_APP_MAIN_CDN }/assets/lookups/`,
    pageLayoutsBase: `https://${ REACT_APP_MAIN_CDN }/assets/structural_layouts/`,
    api:             `https://uks-covid19-pubdash-dev.azure-api.net/fn-coronavirus-dashboard-pipeline-etl-dev/v1/data`,
    modals:          `https://${ REACT_APP_MAIN_CDN }/assets/modals/`,
    latestCases: {
        csv:  `${ REACT_APP_BASE_URL }/downloads/csv/coronavirus-cases_latest.csv`,
        json: `${ REACT_APP_BASE_URL }/downloads/json/coronavirus-cases_latest.json`
    },
    latestDeaths: {
        csv:  `${ REACT_APP_BASE_URL }/downloads/csv/coronavirus-deaths_latest.csv`,
        json: `${ REACT_APP_BASE_URL }/downloads/json/coronavirus-deaths_latest.json`
    },
    about: `https://${ REACT_APP_MAIN_CDN }/assets/about.md`,
    accessibility: `https://${ REACT_APP_MAIN_CDN }/assets/accessibility.md`,
    archiveList: `https://${ REACT_APP_DOWNLOADS_CDN }/downloads?restype=container&comp=list`,
    baseUrl:     REACT_APP_BASE_URL

};

URLs.pageLayouts = {
    UKSummary: 'UKSummary.json',
    testing: 'testing.json',
    healthcare: 'healthcare.json',
    deaths: 'deaths.json',
    cases: 'cases.json',
}

export default URLs;
