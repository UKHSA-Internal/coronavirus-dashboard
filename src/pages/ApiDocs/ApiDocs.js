// @flow

import React, { useState } from "react";
import { Prism as CodeBox } from 'react-syntax-highlighter';
import { Admonition } from "components/Widgets";

import {
    TableContainer,
    GovUKTable,
    THead,
    TBody,
    TR,
    TH,
    TD
} from "components/GovUk/Table.styles"
import { Container, Query, BlueBadge, SuccessCode, ErrorCode, Method, MethodBadge, Code } from "./ApiDocs.styles";
import type { ComponentType } from "react";
import { Body, MainContainer, Tab, TabsContainer } from "components/TabLink/TabLink.styles";



const LanguageTabs: ComponentType<*> = ({ tabs, content }) => {

    const [ current, setCurrent ] = useState(0);

    return <MainContainer>
            <TabsContainer className={ 'govuk-!-margin-bottom-0' }>{
                tabs.map((label, index) =>
                    <Tab type={ "button" }
                         key={ `${label}-${index}` }
                         role={ "button" }
                         aria-label={ label }
                         className={ `${index === current ? 'active govuk-!-font-weight-bold' : '' }` }
                         onClick={ () => setCurrent(index)  }>
                        <span className={ "govuk-visually-hidden" }>
                            Click to display content
                        </span>
                         { label }
                    </Tab>
                )
            }</TabsContainer>
            <Body>{ content[current] }</Body>
    </MainContainer>

};  // TabLinkContainer


const ApiDocs: ComponentType<*> = ({ ...props }) => {

    return <Container>
        <h1>Developer's Guide</h1>
        <h2>Documentations for the API &mdash; v.1</h2>
        <section>
            <h3>Version</h3>
            <p>
                All API requests are currently served under version 1. The API version is
                defined in the URI as <Code>/v1</Code>.
            </p>
            <p>The main endpoint to download data related to Coronavirus in the UK is as follows:</p>
            <CodeBox wrapLines={ true }>https://api.coronavirus.data.gov.uk/v1/data</CodeBox>

            <p>A generic template for version 1 of the API may be defined as:</p>
            <CodeBox wrapLines={ true }>
                /v1/data?filters=&lt;string&gt;&structure=&lt;string&gt;[&latestBy=&lt;string&gt;][&format=&lt;string&gt;][&page=&lt;number&gt;]
            </CodeBox>

            {/*<h3>Endpoint</h3>*/}
            {/*<p>*/}
            {/*    The public API is available at:*/}
            {/*</p>*/}
            {/*<Code wrapLines={ true }>*/}
            {/*    https://api.coronavirus.data.gov.uk/v1/data*/}
            {/*</Code>*/}

            {/*<p>*/}
            {/*    The API service maintains the following URL template:*/}
            {/*</p>*/}
        </section>

        <section>
        <h3>Schema</h3>
        <p>
            All API requests are over HTTPS and accessed from <Code>https://api.coronavirus.data.gov.uk</Code>.
        </p>
        <p>
            The API only accepts JSON formatted data. The default response is also JSON, but it
            is possible to request a response in CSV or XML too.
        </p>

        <CodeBox language={ "bash" }>
            curl -si 'https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\&#123;%22name%22:%22areaName%22\&#125;'
</CodeBox>
        <CodeBox>{`HTTP/1.1 200 OK
Cache-Control: no-store, must-revalidate, no-cache
Pragma: no-cache
Transfer-Encoding: chunked
Content-Type: application/vnd.PHE-COVID19.v1+json; charset=utf-8
Content-Encoding: gzip
Content-Location: /v1/data?filters=areaType=nation;areaName=england&structure=%7B%22name%22:%22areaName%22%7D
Expires: Mon, 20 Jul 2020 09:45:58 GMT
Last-Modified: Sun, 19 Jul 2020 15:15:57 GMT
Request-Context: appId=cid-v1:cf07a4c8-25f8-4bc4-9ec7-e073b161ce8a
X-Content-Type-Options: nosniff
referrer-policy: origin-when-cross-origin,strict-origin-when-cross-origin
X-Frame-Options: deny
Content-Security-Policy: default-src 'none'; style-src 'self' 'unsafe-inline'
x-phe-media-type: PHE-COVID19.v1
x-xss-protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
Date: Mon, 20 Jul 2020 09:45:58 GMT`}
        </CodeBox>

        <p>
            The <Code>Last-Modified</Code> header in the response signifies the time when
            the data was last update.
        </p>


        <Admonition>
            The <Code>Last-Modified</Code> timestamp is not identical to that which is
            displayed on the website. It signifies the time when the data was uploaded
            to our database. The delay in the release is due to the Quality Assurance
            process that takes place everyday before the data is released.
        </Admonition>

        <h4>Request headers</h4>
        <p>
            The API requires all requests to include the certain headers. If these headers
            are missing, they will be implicitly added:
        </p>

            <ul>
                <li><Code>Accepts: application/json; application/xml; text/csv; application/vnd.PHE-COVID19.v1+json; application/vnd.PHE-COVID19.v1+xml</Code></li>
                <li><Code>Content-Type: application/json</Code></li>
            </ul>

        <Admonition>
            All API responses are compressed using GZip. The request client must
            therefore accept GZip encoded content.
        </Admonition>

        <h4>Timestamps</h4>
        <p>
            All timestamps are formatted as ISO-8601, and are presented
            as either <Code>YYYY-MM-DDTHH:MM:SS.sssssssZ</Code> or <Code>YYYY-MM-DD</Code>.
        </p>
        </section>

        <section>
            <h3>Methods</h3>
            <Method>HEAD</Method>
            <p>
                Parameters and responses are identical to the <MethodBadge>GET</MethodBadge> method
                for a given request, but omits the response body.
            </p>

            <Method>OPTIONS</Method>
            <p>
                Provides the options available for the API &mdash; an abstract version of
                this document &mdash; based on the Open API v.3 standard in a
                JSON-formatted response.
            </p>

            <Admonition>
                The <MethodBadge>OPTIONS</MethodBadge> method discards all query parameters.
            </Admonition>

            <h4>Response</h4>
            <TableContainer>
                <GovUKTable className={ "govuk-table" }>
                    <THead>
                        <TR>
                            <TH>Code</TH>
                            <TH className={ "govuk-!-width-one-quarter" }>Message</TH>
                            <TH>Description</TH>
                        </TR>
                    </THead>
                    <TBody>
                        <TR>
                            <TD><SuccessCode>200</SuccessCode></TD>
                            <TD>OK</TD>
                            <TD>API options as a JSON document.</TD>
                        </TR>
                    </TBody>
                </GovUKTable>
            </TableContainer>

            <Method>GET</Method>

            <h4>Responses</h4>
            <table className={ "govuk-table" }>
                <THead>
                    <TR>
                        <TH>Code</TH>
                        <TH className={ "govuk-!-width-one-quarter" }>Message</TH>
                        <TH>Description</TH>
                    </TR>
                </THead>
                <TBody>
                    <TR>
                        <TD><SuccessCode>200</SuccessCode></TD>
                        <TD>OK</TD>
                        <TD>Successful &mdash; The response body contains the data.</TD>
                    </TR>
                    <TR>
                        <TD><SuccessCode>204</SuccessCode></TD>
                        <TD>OK</TD>
                        <TD>Successful &mdash; The request was successfully processed, but
                            but were no records matching the requested criteria.</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>401</ErrorCode></TD>
                        <TD>Unauthorised request</TD>
                        <TD>You are not authorised to view the data</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>404</ErrorCode></TD>
                        <TD>Not found</TD>
                        <TD>Invalid parameter</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>412</ErrorCode></TD>
                        <TD>Precondition failed</TD>
                        <TD>Invalid query parameter (not structured correctly)</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>413</ErrorCode></TD>
                        <TD>Entity too large</TD>
                        <TD>Exceeding the maximum number of parameters (in filters or structure</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>417</ErrorCode></TD>
                        <TD>Expectation failed</TD>
                        <TD>Either the structure if not a correctly formatted JSON, or the value assigned to a filter parameter is not the correct type.</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>422</ErrorCode></TD>
                        <TD>Unprocessable entity</TD>
                        <TD>Invalid filter parameter</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>429</ErrorCode></TD>
                        <TD>Too many requests</TD>
                        <TD>Throttling has been activated</TD>
                    </TR>
                    <TR>
                        <TD><ErrorCode>500</ErrorCode></TD>
                        <TD>Server error</TD>
                        <TD>Either an internal server error has occurred, or processing the request has taken longer that permitted.</TD>
                    </TR>
                </TBody>
            </table>

            <h3>Query parameters</h3>

            <Query>filters</Query>
            <BlueBadge>Required</BlueBadge>
            <p>
                Provides the functionality to filter the data that you receive in response
                to a request.
            </p>
            <p>
                Filters must be formatted as <Code>[parameter]=[value]</Code>, where
                <Code>[parameter]</Code> is the name of an authorised filter parameter
                and <Code>[value]</Code> is aggregation parameter:
            </p>
            <CodeBox>
                filters=[parameter]=[string]
            </CodeBox>
            <p>
                For instance, to retrieve data for Cambridge, the filter is defined
                as <Code>filters=areaName=Cambridge</Code>.
            </p>

            <Admonition type={ "Information" }>
                The <Code>value</Code> section of the filters is case-insensitive.
            </Admonition>

            <h5>Multiple parameters</h5>
            <p>
                It is possible to implement conjunctive conditions &mdash; i.e. use "and"
                to chain multiple filters. We separate multiple filters using a <Code>;</Code> (semicolon):
            </p>
            <CodeBox>
                filters=[p1]=[string];[p2]=[string];[p3]=[string]
            </CodeBox>


            <h5>Authorised filter parameters</h5>
            <p>
                You may use any combination of the authorised parameters to filter the
                data API response.
            </p>
            <details className="govuk-details" data-module="govuk-details">
                <summary className="govuk-details__summary">
                    <span className="govuk-details__summary-text">
                      See a list of all authorised parameters
                    </span>
                </summary>
                <div className="govuk-details__text">
                    <ul>
                        <li><Code>areaType</Code></li>
                        <li><Code>areaName</Code></li>
                        <li><Code>areaCode</Code></li>
                        <li><Code>date</Code></li>
                    </ul>
                </div>
            </details>

            <LanguageTabs tabs={[ "Python", "JavaScript", "R" ]}
                          content={[
                              <>
<CodeBox language={ "python" }>{`from requests import get
from json import loads


def get_data(url: str) -> str:
    response = get(endpoint)
    
    if response.status_code < 400:
        raise RuntimeError(f'Request failed: { response.text }')
        
    return loads(response.text)
    

if __name__ == '__main__':
    endpoint = (
        'https://api.coronavirus-staging.data.gov.uk/v1/data?'
        'filters=areaType=nation;areaName=england&'
        'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    )
    
    data = get_data(endpoint)
    print(data)`}</CodeBox>
                                  <CodeBox>{`{"length":132,"maxPageLimit":1000,"data":[{"date":"2020-07-20","newCases":535},{"date":"2020-07-19","newCases":672}, ...]}`}</CodeBox>

                              </>,
                              <>
<CodeBox language={ "javascript" }>{`const axios = require("axios");


const endpoint = (
    'https://api.coronavirus-staging.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
);


const getData = async ( url, callBack ) => {

    const { data, status, statusText } = await axios.get(url);

    status < 400
        ? callBack(data)
        : console.error(statusText);

};  // getData


const processData = ( data ) => {

    console.log(data);

};  // processData


const main = async () => {

    await getData(endpoint, processData);

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`}</CodeBox>
                                  <CodeBox>{`{
  length: 132,
  maxPageLimit: 1000,
  data: [
    { date: '2020-07-20', newCases: 535 },
    { date: '2020-07-19', newCases: 672 },
    { date: '2020-07-18', newCases: 796 },
    { date: '2020-07-17', newCases: 635 },
    ...
]}`}</CodeBox>
</>,
                              <>
<CodeBox language={ "r" }>{`library(jsonlite)


endpoint <- 'https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}'

data <- fromJSON(endpoint)

print(data)
`}</CodeBox>
                              <CodeBox>{`$length
[1] 132

$maxPageLimit
[1] 1000

$data
          date newCases
1   2020-07-20      535
2   2020-07-19      672
3   2020-07-18      796
4   2020-07-17      635
...`}</CodeBox></>
                          ]}/>
            <Query>structure</Query>
            <BlueBadge>Required</BlueBadge>

            <Query>latestBy</Query>
            <BlueBadge>Optional</BlueBadge>
            <CodeBox>
                latestBy=[parameter]
            </CodeBox>
            <CodeBox>
                filters=[parameter_a]=[string];[param_b]=[string]&latestBy=[string]
            </CodeBox>

            <Query>pagination</Query>
            <BlueBadge>Optional</BlueBadge>

            <CodeBox>
                page=[number]
            </CodeBox>

            <Query>format</Query>
            <BlueBadge>Optional</BlueBadge>
            <CodeBox>
                page=[string]
            </CodeBox>


        </section>
    </Container>

};  // ApiDocs


export default ApiDocs;
