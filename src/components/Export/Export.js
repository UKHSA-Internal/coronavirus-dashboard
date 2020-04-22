import React from 'react';

import { Container, Paragraph } from "./Export.styles";

const ExportLink = ({ csvHref, jsonHref, downloadName }: { csvHref: string, jsonHref: string, label: string }) => {

    return <Container>
        <Paragraph className={ "govuk-body" }>
            Download the latest { downloadName } data as&nbsp;
            <a href={ csvHref } className={ "govuk-link govuk-link--no-visited-state" }>
                CSV
            </a>&nbsp;or&nbsp;<a href={ jsonHref } className={ "govuk-link govuk-link--no-visited-state" }>
            JSON
        </a>
        </Paragraph>
    </Container>

}; // render


export default ExportLink;
