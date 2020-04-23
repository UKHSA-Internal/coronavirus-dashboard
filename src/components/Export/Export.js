import React from 'react';

import { Container, Paragraph } from "./Export.styles";

const ExportLink = ({ uri, label, shouldBeTracked, dataType }: { uri: string, label: string, shouldBeTracked: boolean, dataType: string }) => {

    const trackClick = () => {
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

    return (
        <Container>
            <Paragraph>
                {
                    shouldBeTracked ?
                        <a href={ uri } onClick={ trackClick }
                            className={ "govuk-link" }>{ label }</a> :
                        <a href={uri}
                            className={ "govuk-link" }>{ label }</a>
                }
            </Paragraph>
        </Container>
    );

}; // render


export default ExportLink;
