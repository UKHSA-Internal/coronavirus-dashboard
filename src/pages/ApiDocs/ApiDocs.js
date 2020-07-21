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
            curl -si 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\&#123;%22name%22:%22areaName%22\&#125;'
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

            <CodeBox language={ 'bash' }>
                {`curl -sI 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\{"name":"areaName"\}' | grep -i 'last-modified'`}
            </CodeBox>
            <CodeBox>
                {`Last-Modified: Mon, 20 Jul 2020 14:28:09 GMT`}
            </CodeBox>

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

            <p>
                The <MethodBadge>HEAD</MethodBadge> may be used to validate a query without
                downloading its content. It may also be used to quickly check the timestamp
                of the latest data available on the API.
            </p>

            <CodeBox language={ 'bash' }>
                {`curl -sI 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\{"name":"areaName"\}' | grep -i 'http'`}
            </CodeBox>
            <CodeBox>
                {`HTTP/1.1 200 OK`}
            </CodeBox>

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

            <CodeBox>
                filters=[parameter]=[string]
            </CodeBox>
            <p>
                Provides the functionality to filter the data that you receive in response
                to a request.
            </p>
            <p>
                Filters must be formatted as <Code>[parameter]=[value]</Code>, where
                <Code>[parameter]</Code> is the name of an authorised filter parameter
                and <Code>[value]</Code> is aggregation parameter:
            </p>
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
                      See a list of valid parameters for <Code>filters</Code>
                    </span>
                </summary>
                <div className="govuk-details__text">
                    <dl>
                        <dt><Code>areaType</Code></dt><dd>Area type as string</dd>
                        <dt><Code>areaName</Code></dt><dd>Area name as string</dd>
                        <dt><Code>areaCode</Code></dt><dd>Area Code as string</dd>
                        <dt><Code>date</Code></dt><dd>Date as string [<Code>YYYY-MM-DD</Code>]</dd>
                    </dl>
                </div>
            </details>

            <LanguageTabs tabs={[ "Python", "JavaScript", "R" ]}
                          content={[
                              <>
<CodeBox language={ "python" }>{`from requests import get


def get_data(url):
    response = get(endpoint)
    
    if response.status_code >= 400:
        raise RuntimeError(f'Request failed: { response.text }')
        
    return response.json()
    

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
<CodeBox language={ "r" }>{`endpoint <- 'https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}'

httr::GET(
  url = endpoint,
  timeout(10)
) -> response


if (response$status_code >= 400) {
  err_msg = httr::http_status(response)
  stop(err_msg)
}

json_text <- content(response, "text")

data <- jsonlite::fromJSON(json_text)

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

            <CodeBox>
                {`structure=\{[responseName]:[metricName], [responseName]:[metricName]}`}
            </CodeBox>
            <CodeBox>
                {`structure=[metricName, metricName]`}
            </CodeBox>
            <p>The structure parameter defines:</p>
            <ul>
                <li>The metrics that you wish to receive in the response</li>
                <li>The structure in which you wish to receive the response</li>
            </ul>

            <p>
                You may additionally use the structure parameter to rename the parameters.
                This feature is primarily designed to provide backward compatibility and
                minimise disruption to services that rely on legacy downloads.
            </p>

            <p>
                The value of the structure parameter is a JSON-formatted string, where:
            </p>

            <ul>
                <li>The keys define the name of a parameter in the response</li>
                <li>The values define the metric that you wish to receive in the response</li>
                <li>The structure defines the overall structure of the JSON / XML response</li>
            </ul>

            <details className="govuk-details" data-module="govuk-details">
                <summary className="govuk-details__summary">
                    <span className="govuk-details__summary-text">
                      See a list of valid parameters for <Code>structure</Code>
                    </span>
                </summary>
                <div className="govuk-details__text">
                    <div className={ "govuk-!-margin-bottom-5" }>
                        <p className={ "govuk-!-margin-bottom-0" }>
                            Last updated on <time dateTime={ "2020-07-22T10:40:00.0000000Z" }>
                            22nd of July 2020 at 10:40am</time></p>
                        <p className={ "govuk-body-s" }>This list updated regularly as we release new metrics.</p>
                    </div>
                    <dl>
                        <dt><Code>areaType</Code></dt><dd>Area type as string</dd>
                        <dt><Code>areaName</Code></dt><dd>Area name as string</dd>
                        <dt><Code>areaCode</Code></dt><dd>Area Code as string</dd>
                        <dt><Code>date</Code></dt><dd>Date as string [<Code>YYYY-MM-DD</Code>]</dd>

                        <dt><Code>hash</Code></dt><dd>Unique ID as string</dd>

                        <dt><Code>newCasesByPublishDate</Code></dt><dd>New cases by publish date</dd>
                        <dt><Code>cumCasesByPublishDate</Code></dt><dd>Cumulative cases by publish date</dd>
                        <dt><Code>newCasesBySpecimenDate</Code></dt><dd>New cases by specimen date</dd>
                        <dt><Code>cumCasesBySpecimenDate</Code></dt><dd>Cumulative cases by specimen date</dd>
                        <dt><Code>maleCases</Code></dt><dd>Male cases (by age)</dd>
                        <dt><Code>femaleCases</Code></dt><dd>Female cases (by age)</dd>

                        <dt><Code>newPillarOneTestsByPublishDate</Code></dt><dd>New pillar one tests by publish date</dd>
                        <dt><Code>cumPillarOneTestsByPublishDate</Code></dt><dd>Cumulative pillar one tests by publish date</dd>
                        <dt><Code>newPillarTwoTestsByPublishDate</Code></dt><dd>New pillar two tests by publish date</dd>
                        <dt><Code>cumPillarTwoTestsByPublishDate</Code></dt><dd>Cumulative pillar two tests by publish date</dd>
                        <dt><Code>newPillarThreeTestsByPublishDate</Code></dt><dd>New pillar three tests by publish date</dd>
                        <dt><Code>cumPillarThreeTestsByPublishDate</Code></dt><dd>Cumulative pillar three tests by publish date</dd>
                        <dt><Code>newPillarFourTestsByPublishDate</Code></dt><dd>New pillar four tests by publish date</dd>
                        <dt><Code>cumPillarFourTestsByPublishDate</Code></dt><dd>Cumulative pillar four tests by publish date</dd>

                        <dt><Code>newAdmissions</Code></dt><dd>New admissions</dd>
                        <dt><Code>cumAdmissions</Code></dt><dd>Cumulative number of admissions</dd>
                        <dt><Code>cumAdmissionsByAge</Code></dt><dd>Cumulative admissions by age</dd>

                        <dt><Code>cumTestsByPublishDate</Code></dt><dd>Cumulative tests by publish date</dd>
                        <dt><Code>newTestsByPublishDate</Code></dt><dd>New tests by publish date</dd>

                        <dt><Code>covidOccupiedMVBeds</Code></dt><dd>COVID-19 occupied beds with mechanical ventilators</dd>
                        <dt><Code>hospitalCases</Code></dt><dd>Hospital cases</dd>
                        <dt><Code>plannedCapacityByPublishDate</Code></dt><dd>Planned capacity by publish date</dd>

                        <dt><Code>newDeathsByPublishDate</Code></dt><dd>New deaths by publish date</dd>
                        <dt><Code>cumDeathsByPublishDate</Code></dt><dd>Cumulative deaths by publish date</dd>
                        <dt><Code>newDeathsByDeathDate</Code></dt><dd>New deaths by death date</dd>
                        <dt><Code>cumDeathsByDeathDate</Code></dt><dd>Cumulative deaths by death date</dd>
                        <dt><Code>femaleDeaths</Code></dt><dd>Female deaths (by age)</dd>
                        <dt><Code>maleDeaths</Code></dt><dd>Male deaths (by age)</dd>
                    </dl>
                </div>
            </details>


            <h5>Example</h5>
            <p>
                We would like to extract the number of new cases, cumulative cases, and
                new deaths and cumulative deaths for England using the API.
            </p>

            <p>
                We start off by constructing the value for the <Code>filters</Code> parameter:
            </p>
            <CodeBox>{`/v1/data?filters=areaType=nation;areaName=england`}</CodeBox>
            <p>
                Next step is to construct the value for the <Code>structure</Code> parameter.
                To do so, we need to find out the name for the metric in which we are interested.
                In the case of this example, the metric are as follows:
            </p>
            <dl>
                <dt><Code>newCasesByPublishDate</Code></dt><dd>New cases (by publish date)</dd>
                <dt><Code>cumCasesByPublishDate</Code></dt><dd>Cumulative cases (by publish date)</dd>
                <dt><Code>newDeathsByDeathDate</Code></dt><dd>New deaths (by death date)</dd>
                <dt><Code>cumDeathsByDeathDate</Code></dt><dd>Cumulative deaths (by death date)</dd>
            </dl>
            <p>
                In its simplest form, we could construct the our structure as follows:
            </p>
            <CodeBox language={ 'json' }>{`{
    "date":"date",
    "areaName":"areaName",
    "areaCode":"areaCode",
    "newCasesByPublishDate":"newCasesByPublishDate",
    "cumCasesByPublishDate":"cumCasesByPublishDate",
    "newDeathsByDeathDate":"newDeathsByDeathDate",
    "cumDeathsByDeathDate":"cumDeathsByDeathDate"
}`}</CodeBox>

            <p>We may simply include the above structure in our URL:</p>
            <CodeBox>
                {`/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","areaName":"areaName","areaCode":"areaCode","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate","newDeathsByDeathDate":"newDeathsByDeathDate","cumDeathsByDeathDate":"cumDeathsByDeathDate"}`}
            </CodeBox>

            <p>When called, the above URL would produce a response similar to the following JSON:</p>
            <CodeBox>
{`{
    "length":141,
    "maxPageLimit":1000,
    "data":[
        {
            "date":"2020-07-20",
            "areaName":"England",
            "areaCode":"E92000001",
            "newCasesByPublishDate":535,
            "cumCasesByPublishDate":254120,
            "newDeathsByDeathDate":null,
            "cumDeathsByDeathDate":null
        },
        {
            "date":"2020-07-19",
            "areaName":"England",
            "areaCode":"E92000001",
            "newCasesByPublishDate":672,
            "cumCasesByPublishDate":253585,
            "newDeathsByDeathDate":5,
            "cumDeathsByDeathDate":40718
        },
        ...
    ]
}`}
            </CodeBox>
            <p>
                You may find that the metric names are not expressive enough, or perhaps
                they are incompatible with an existing service that you have already
                created. The <Code>structure</Code> parameters provides the ability
                to change both the structure and the name of the metrics.
            </p>
            <p>
                We can change metric names or the structure of the JSON / XML response by
                altering the value of the <Code>structure</Code> parameter:
            </p>
            <CodeBox language={ 'json' }>{`{
    "date":"date",
    "name":"areaName",
    "code":"areaCode",
    "cases": {
        "daily":"newCasesByPublishDate",
        "cumulative":"cumCasesByPublishDate"
    },
    "deaths": {
        "daily":"newDeathsByDeathDate",
        "cumulative":"cumDeathsByDeathDate"
    }
}`}</CodeBox>
            <p>and incorporate the into the URL:</p>
            <CodeBox>
                {`/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesByPublishDate","cumulative":"cumCasesByPublishDate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}`}
            </CodeBox>

            <p>When called, the above URL would produce a response similar to the following JSON:</p>
            <CodeBox>
{`{
    "length":141,
    "maxPageLimit":1000,
    "data":[
        {
            "date":"2020-07-20",
            "name":"England",
            "code":"E92000001",
            "cases":{"daily":535,"cumulative":254120},
            "deaths":{"daily":null,"cumulative":null}
        },
        {
            "date":"2020-07-19",
            "name":"England",
            "code":"E92000001",
            "cases": {"daily":672, "cumulative":253585},
            "deaths": {"daily":5, "cumulative":40718}
        },
        ...
    ]
}`}
            </CodeBox>

            <Admonition type={ "Warning" }>
                It may be necessary to encode the URL to ensure that the data is correctly
                transmitted and parsed. Modern browsers encode the URL automatically before
                transmission.
            </Admonition>

            <p>
                Programming languages provide tools to encode string values and make
                them URL-safe.
            </p>

                        <LanguageTabs tabs={[ "Python", "JavaScript", "R" ]}
                          content={[
                              <>
<CodeBox language={ "python" }>{`from urllib.parse import urlencode
from json import dumps


AREA_TYPE = "nation"
AREA_NAME = "england"

filters = [
    f"areaType={ AREA_TYPE }",
    f"areaName={ AREA_NAME }"
]

structure = {
    "date": "date",
    "name": "areaName",
    "code": "areaCode",
    "cases": {
        "daily": "newCasesByPublishDate",
        "cumulative": "cumCasesByPublishDate"
    },
    "deaths": {
        "daily": "newDeathsByDeathDate",
        "cumulative": "cumDeathsByDeathDate"
    }
}

api_params = {
    "filters": str.join(";", filters),
    "structure": dumps(structure, separators=(",", ":"))
}

encoded_params = urlencode(api_params)

print(f"/v1/data?{ encoded_params }")
`}</CodeBox>
                                  <CodeBox>{`/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22new%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox>

                              </>,
                              <>
<CodeBox language={ "javascript" }>{`const
    AreaType = "nation",
    AreaName = "england";

const
    filters = [
        \`areaType=$\{ AreaType }\`,
        \`areaName=$\{ AreaName }\`
    ],
    structure = {
        date: "date",
        name: "areaName",
        code: "areaCode",
        cases: {
            daily: "newCasesByPublishDate",
            cumulative: "cumCasesByPublishDate"
        },
        deaths: {
            daily: "newDeathsByDeathDate",
            cumulative: "cumDeathsByDeathDate"
        }
    };

const
    apiParams = \`filters=$\{ filters.join(";") }&structure=$\{ JSON.stringify(structure) }\`,
    encodedParams = encodeURI(apiParams)

console.log(\`/v1/data?$\{ encodedParams }\`)
`}</CodeBox>
                                  <CodeBox>{`/v1/data?filters=areaType=nation;areaName=england&structure=%7B%22date%22:%22date%22,%22name%22:%22areaName%22,%22code%22:%22areaCode%22,%22cases%22:%7B%22daily%22:%22newCasesByPublishDate%22,%22cumulative%22:%22cumCasesByPublishDate%22%7D,%22deaths%22:%7B%22new%22:%22newDeathsByDeathDate%22,%22cumulative%22:%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox>
</>,
                              <>
<CodeBox language={ "r" }>{`AREA_TYPE = "nation"
AREA_NAME = "england"

endpoint <- "https://api.coronavirus-staging.data.gov.uk/v1/data"

# Create filters:
filters <- c(
  sprintf("areaType=%s", AREA_TYPE),
  sprintf("areaName=%s", AREA_NAME)
)

# Create the structure as a list or a list of lists:
structure <- list(
    date = "date", 
    name = "areaName", 
    code = "areaCode", 
    cases = list(
        daily = "newCasesByPublishDate",
        cumulative = "cumCasesByPublishDate"
    ), 
    deaths = list(
        daily = "newDeathsByDeathDate",
        cumulative = "cumDeathsByDeathDate"
    )
)

# The "httr::GET" method automatically encodes 
# the URL and its parameters:
httr::GET(
    # Concatenate the filters vector using a semicolon.
    url = endpoint,
    
    # Convert the structure to JSON (ensure 
    # that "auto_unbox" is set to TRUE).
    query = list(
        filters = paste(filters, collapse = ";"),
        structure = jsonlite::toJSON(structure, auto_unbox = TRUE)
    ),
    
    # The API server will automatically reject any
    # requests that take longer than 10 seconds to 
    # process.
    timeout(10)
) -> response

# Handle errors:
if (response$status_code >= 400) {
    err_msg = httr::http_status(response)
    stop(err_msg)
}

# Convert response text from binary to text:
json_text <- content(response, "text")

# Store the encoded URL for inspection:
url <- response$url

# Parse JSON response to a data frame:
data <- jsonlite::fromJSON(json_text)

print(url)`}</CodeBox>
                              <CodeBox>{`https://api.coronavirus.data.gov.uk/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22daily%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox></>
                          ]}/>


            <Query>latestBy</Query>
            <BlueBadge>Optional</BlueBadge>

            <CodeBox>
                latestBy=[parameter]
            </CodeBox>

            <p>Produces the latest available value (non-null) relative to the value.</p>

            <Admonition type={ "Warning" }>
                The value defined for <Code>latestBy</Code> must be included in the
                the <Code>structure</Code>.
            </Admonition>

            <Admonition type={ "Warning" }>
                The <Code>latestBy</Code> query only accepts one value. You may still
                include multiple metrics in the <Code>structure</Code>, but beware that
                the response will only include data for the date on which the latest
                value for the metric defined for <Code>latestBy</Code> was published.
            </Admonition>

            <h5>Example</h5>
                                    <LanguageTabs tabs={[ "Python", "JavaScript", "R" ]}
                          content={[
                              <>
<CodeBox language={ "python" }>{`from urllib.parse import urlencode
from json import dumps
from requests import get

ENDPOINT = "https://api.coronavirus-staging.data.gov.uk/v1/data"
AREA_TYPE = "nation"
AREA_NAME = "england"

filters = [
    f"areaType={ AREA_TYPE }",
    f"areaName={ AREA_NAME }"
]

structure = {
    "date": "date",
    "name": "areaName",
    "code": "areaCode",
    "cases": {
        "daily": "newCasesByPublishDate",
        "cumulative": "cumCasesByPublishDate"
    },
    "deaths": {
        "daily": "newDeathsByDeathDate",
        "cumulative": "cumDeathsByDeathDate"
    }
}

api_params = {
    "filters": str.join(";", filters),
    "structure": dumps(structure, separators=(",", ":")),
    "latestBy": "newCasesByPublishDate"
}

encoded_params = urlencode(api_params)

response = get(f"{ ENDPOINT }?{ encoded_params }")

if response.status_code >= 400:
    raise RuntimeError(f'Request failed: { response.text }')

data = response.json()

print(data)`}</CodeBox>
                                  <CodeBox>
{`{'length': 1, 'maxPageLimit': 1, 'data': [{'date': '2020-07-20', 'name': 'England', 'code': 'E92000001', 'cases': {'daily': 535, 'cumulative': 254120}, 'deaths': {'daily': None, 'cumulative': None}}]}`}
                                  </CodeBox>

                              </>,
                              <>
<CodeBox language={ "javascript" }>{`const axios = require("axios");


const endpoint = 'https://api.coronavirus-staging.data.gov.uk/v1/data';


const getData = async ( url, queries={}, callBack ) => {

    const { data, status, statusText } = await axios.get(url, {params: queries});

    status < 400
        ? callBack(data)
        : console.error(statusText);

};  // getData


const processData = ( data ) => {

    console.log(JSON.stringify(data));

};  // processData


const main = async () => {

    const
        AreaType = "nation",
        AreaName = "england";

    const
        filters = [
            \`areaType=$\{ AreaType }\`,
            \`areaName=$\{ AreaName }\`
        ],
        structure = {
            date: "date",
            name: "areaName",
            code: "areaCode",
            cases: {
                new: "newCasesByPublishDate",
                cumulative: "cumCasesByPublishDate"
            },
            deaths: {
                new: "newDeathsByDeathDate",
                cumulative: "cumDeathsByDeathDate"
            }
        };


    const
        apiParams = {
            filters: filters.join(";"),
            structure: JSON.stringify(structure),
            latestBy: "newCasesByPublishDate"
        };

    await getData(endpoint, apiParams, processData);

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`}</CodeBox>
                                  <CodeBox>{`{"length":1,"maxPageLimit":1,"data":[{"date":"2020-07-20","name":"England","code":"E92000001","cases":{"new":535,"cumulative":254120},"deaths":{"new":null,"cumulative":null}}]}`}</CodeBox>
</>,
                              <>
<CodeBox language={ "r" }>{`AREA_TYPE = "nation"
AREA_NAME = "england"

endpoint <- "https://api.coronavirus-staging.data.gov.uk/v1/data"

# Create filters:
filters <- c(
  sprintf("areaType=%s", AREA_TYPE),
  sprintf("areaName=%s", AREA_NAME)
)

# Create the structure as a list or a list of lists:
structure <- list(
    date = "date", 
    name = "areaName", 
    code = "areaCode", 
    cases = list(
        daily = "newCasesByPublishDate",
        cumulative = "cumCasesByPublishDate"
    ), 
    deaths = list(
        daily = "newDeathsByDeathDate",
        cumulative = "cumDeathsByDeathDate"
    )
)

# The "httr::GET" method automatically encodes 
# the URL and its parameters:
httr::GET(
    # Concatenate the filters vector using a semicolon.
    url = endpoint,
    
    # Convert the structure to JSON (ensure 
    # that "auto_unbox" is set to TRUE).
    query = list(
        filters = paste(filters, collapse = ";"),
        structure = jsonlite::toJSON(structure, auto_unbox = TRUE)
    ),
    
    # The API server will automatically reject any
    # requests that take longer than 10 seconds to 
    # process.
    timeout(10)
) -> response

# Handle errors:
if (response$status_code >= 400) {
    err_msg = httr::http_status(response)
    stop(err_msg)
}

# Convert response text from binary to text:
json_text <- content(response, "text")

# Store the encoded URL for inspection:
url <- response$url

# Parse JSON response to a data frame:
data <- jsonlite::fromJSON(json_text)

print(url)`}</CodeBox>
                              <CodeBox>{`https://api.coronavirus.data.gov.uk/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22daily%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox></>
                          ]}/>

            <Query>page</Query>
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
