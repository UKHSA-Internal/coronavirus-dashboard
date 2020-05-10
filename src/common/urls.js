const URLs = {

    populationData: `https://${ process?.env?.REACT_APP_MAIN_CDN ?? "{{MAIN_CDN}}" }/assets/population/population.json`,
    baseData:       `https://${ process?.env?.REACT_APP_DOWNLOADS_CDN ?? "{{DOWNLOADS_CDN}}" }/downloads/data/`,
    baseGeo:        `https://${ process?.env?.REACT_APP_MAIN_CDN ?? "{{MAIN_CDN}}" }/assets/geo/`,
    mapStyle:       `https://${ process?.env?.REACT_APP_MAIN_CDN ?? "{{MAIN_CDN}}" }/assets/map/style_v2.json`,
    landingData:    `https://${ process?.env?.REACT_APP_DOWNLOADS_CDN ?? "{{DOWNLOADS_CDN}}" }/downloads/data/landing.json`,
    latestCases: {
        csv:  `https://coronavirus.data.gov.uk/downloads/csv/coronavirus-cases_latest.csv`,
        json: `https://coronavirus.data.gov.uk/downloads/json/coronavirus-cases_latest.json`
    },
    latestDeaths: {
        csv:  `https://coronavirus.data.gov.uk/downloads/csv/coronavirus-deaths_latest.csv`,
        json: `https://coronavirus.data.gov.uk/downloads/json/coronavirus-deaths_latest.json`
    },
    archiveList: `https://publicdashacc.blob.core.windows.net/downloads?restype=container&comp=list`,
    baseUrl: `{{BASE_URL}}`
};


export default URLs;
