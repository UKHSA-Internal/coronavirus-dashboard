import React from 'react';

import { Container, Paragraph } from "./Export.styles";

const ExportLink = ({ uri, label }: { uri: string, label: string }) => {

        return <Container>
            <Paragraph>
                <a href={ '#' }
                   className={ "govuk-link" }
                   onClick={ this.download }>{ linkText }</a>
            </Paragraph>
        </Container>

}; // render


export default ExportLink;
