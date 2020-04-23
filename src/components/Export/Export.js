import React from 'react';

import { Container, Paragraph } from "./Export.styles";

interface downloads {
    cases: {
        csv: string,
        json: string
    },
    deaths: {
        csv: string,
        json: string
    }
}

const ExportLinks = ({ data }: { data: downloads }): any => {
    console.log(Object.keys(data))
    return <Container>
        {
            Object.keys(data).map(label =>
                    <Paragraph key={ label } className={ "govuk-body govuk-!-font-size-16" }>
                        Download the latest <strong className={ 'govuk-!-font-weight-bold' }>{ label }</strong> data as&nbsp;
                        <a href={ data[label].csv }
                           className={ "govuk-link govuk-link--no-visited-state" }>
                            CSV
                        </a>&nbsp;or&nbsp;
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
