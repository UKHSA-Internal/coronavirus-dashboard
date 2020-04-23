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

const ExportLinks = ({ data }: { data: downloads }): any => {

    const trackClick = (dataType) => {
        let gaDataKey = '';
        let downloadCount = 0;

        // Identify data key
        switch (dataType) {
            case 'cases':
                gaDataKey = 'csvCasesDownloadCount';
                break;

            case 'deaths':
                gaDataKey = 'csvDeathsDownloadCount';
                break;

            default:
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
        });
    }

    return <Container>
        {
            Object.keys(data).map(label =>
                <Paragraph key={ label } className={ "govuk-body govuk-!-font-size-16" }>
                    Download the latest <strong className={ "govuk-!-font-weight-bold" }>{ label }</strong> data as&nbsp;
                        {
                            data[label].shouldBeTracked ?
                            <a href={ data[label].csv } onClick={ () => trackClick(data[label].dataType) }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                CSV
                            </a> :
                            <a href={ data[label].csv }
                                className={ "govuk-link govuk-link--no-visited-state" }>
                                CSV
                            </a>
                        }
                        &nbsp;or&nbsp;
                        <a href={ data[label].json }
                            className={ "govuk-link govuk-link--no-visited-state" }>
                            JSON
                        </a>
                </Paragraph>
            )
        }
    </Container>

}; // render

export default ExportLinks;
