import React from 'react';

import { Container, Paragraph } from "./Export.styles";

const ExportLink = ({ uri, label }: { uri: string, label: string }) => {

    return <Container>
        <Paragraph>
            <a href={ uri }
               className={ "govuk-link" }>{ label }</a>
        </Paragraph>
    </Container>

}; // render


export default ExportLink;
