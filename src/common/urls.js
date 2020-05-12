const
    env = process?.env ?? {},
    {
        REACT_APP_MAIN_CDN      = "%MAIN_CDN%",
        REACT_APP_DOWNLOADS_CDN = "%DOWNLOADS_CDN%",
        REACT_APP_BASE_URL      = "%BASE_URL%"
    } = env;



const URLs = {

    populationData: `https://${ REACT_APP_MAIN_CDN      }/assets/population/population.json`,
    baseData:       `https://${ REACT_APP_DOWNLOADS_CDN }/downloads/data/`,
    baseGeo:        `https://${ REACT_APP_MAIN_CDN      }/assets/geo/`,
    mapStyle:       `https://${ REACT_APP_MAIN_CDN      }/assets/map/style_v2.json`,
    landingData:    `https://${ REACT_APP_DOWNLOADS_CDN }/downloads/data/landing.json`,
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


export default URLs;
