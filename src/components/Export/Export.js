import React from 'react';

import { Container, Paragraph } from "./Export.styles";
interface downloads {
    cases: {
        csv: string,
        json: string,
        shouldBeTracked: Boolean,
        dataType: string
    },
    deaths: {
        csv: string,
        json: string,
        shouldBeTracked: Boolean,
        dataType: string
    }
}

const dataTypes = {
    cases: 'cases',
    deaths: 'deaths'
}

const fileTypes = {
    csv: 'csv',
    json: 'json'
}

const googleAnalyticsDataKeys = {
    csvCasesDownloadCount: 'csvCasesDownloadCount',
    csvDeathsDownloadCount: 'csvDeathsDownloadCount',
    jsonCasesDownloadCount: 'jsonCasesDownloadCount',
    jsonDeathsDownloadCount: 'jsonDeathsDownloadCount'
}

const ExportLinks = ({ data }: { data: downloads }): any => {

    const trackClick = (dataType, fileType) => {
        let downloadCount = 0;

        // Identify google analytics data key
        const gaDataKey = getDataKey(dataType, fileType);

        // Unable to find the data key, log the error to the console
        // and terminate further execution
        if (gaDataKey === '') {
            console.log('Unable to record download count. Either dataType or fileType is invalid');
            return;
        }

        // Initialise google analytics
        window.ga('create', 'UA-161400643-1', 'auto');

        window.ga(function (tracker) {
            // Get data key value
            downloadCount = Number(tracker.get(gaDataKey));
            if (isNaN(downloadCount)) {
                downloadCount = 0;
            }
            // Increment count
            downloadCount = downloadCount + 1;
            // Set data key value
            window.ga('set', gaDataKey, downloadCount);

            console.log(tracker);
        });
    }

    const getDataKey = (dataType, fileType) => {
        switch (dataType) {
            case dataTypes.cases:
                return fileType === fileTypes.csv
                    ? googleAnalyticsDataKeys.csvCasesDownloadCount
                    : googleAnalyticsDataKeys.jsonCasesDownloadCount;

            case dataTypes.deaths:
                return fileType === fileTypes.csv
                    ? googleAnalyticsDataKeys.csvDeathsDownloadCount
                    : googleAnalyticsDataKeys.jsonDeathsDownloadCount;

            default:
                return '';
        }
    }

    return <Container>
        {
            Object.keys(data).map(label =>
                <Paragraph key={ label } className={ "govuk-body govuk-!-font-size-16" }>
                    Download the latest <strong className={ "govuk-!-font-weight-bold" }>{ label }</strong> data as&nbsp;
                        {
                            data[label].shouldBeTracked ?
                            <a href={ data[label].csv } onClick={ () => trackClick(data[label].dataType, fileTypes.csv) }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                CSV
                            </a> :
                            <a href={ data[label].csv }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                CSV
                            </a>
                        }
                        &nbsp;or&nbsp;

                        {
                            data[label].shouldBeTracked ?
                            <a href={ data[label].json } onClick={ () => trackClick(data[label].dataType, fileTypes.json) }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                JSON
                            </a> :
                            <a href={ data[label].json }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                JSON
                            </a>
                        }
                </Paragraph>
            )
        }
    </Container>

}; // render

export default ExportLinks;
