// @flow

import React from "react";
import { Prism as CodeBox } from "react-syntax-highlighter";

import { Admonition } from "components/Widgets";
import LanguageTabs from "./LanguageTabLink";

import { BlueBadge, Query, Title } from "./QueryParameters.styles";
import { Code } from "components/Widgets/Widgets.styles";

import type { ComponentType } from "react";


const PythonExample = `from requests import get


def get_data(url):
    response = get(endpoint, timeout=10)
    
    if response.status_code >= 400:
        raise RuntimeError(f'Request failed: { response.text }')
        
    return response.json()
    

if __name__ == '__main__':
    endpoint = (
        'https://api.coronavirus.data.gov.uk/v1/data?'
        'filters=areaType=nation;areaName=england&'
        'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    )
    
    data = get_data(endpoint)
    print(data)`;

const PythonExampleOutput = `{"length":132,"maxPageLimit":1000,"data":[{"date":"2020-07-20","newCases":535},{"date":"2020-07-19","newCases":672}, ...]}`;


const JavaScriptExample = `const axios = require("axios");


const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
);


const getData = async ( url ) => {

    const { data, status, statusText } = await axios.get(url);

    if ( status >= 400 )
        throw new Error(statusText);

    return data

};  // getData


const main = async () => {

    const result = await getData(endpoint);

    console.log(result);

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`;


const JavaScriptExampleOutput = `{
  length: 132,
  maxPageLimit: 1000,
  data: [
    { date: '2020-07-20', newCases: 535 },
    { date: '2020-07-19', newCases: 672 },
    { date: '2020-07-18', newCases: 796 },
    { date: '2020-07-17', newCases: 635 },
    ...
]}`;


const RExample = `endpoint <- 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}'

httr::GET(
    url = endpoint,
    timeout(10)
) -> response


if (response$status_code >= 400) {
    err_msg = httr::http_status(response)
    stop(err_msg)
}

# Convert response from binary to JSON:
json_text <- content(response, "text")
data      <- jsonlite::fromJSON(json_text)

print(data)`;


const RExampleOutput = `$length
[1] 132

$maxPageLimit
[1] 1000

$data
          date newCases
1   2020-07-20      535
2   2020-07-19      672
3   2020-07-18      796
4   2020-07-17      635
...`;


const Filters: ComponentType<*> = () =>
    <article>
        <Title>
            <Query>filters</Query>
            <BlueBadge>Required</BlueBadge>
        </Title>


        <CodeBox>
            filters=[metricName]=[string]
        </CodeBox>
        <p>
            Provides the functionality to filter the data that you receive in response
            to a request.
        </p>
        <p>
            Filters must be formatted as <Code>[metricName]=[value]</Code>, where
            <Code>[metricName]</Code> is the name of an authorised filter metric
            and <Code>[value]</Code> is a value of the given metric based on which the
            data are to be filtered.
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
            to chain multiple filters. We separate multiple filters using
            a <Code>;</Code> (semicolon):
        </p>
        <CodeBox>
            filters=[metricName1]=[string];[metricName2]=[string];[metricName3]=[string]
        </CodeBox>


        <h5>Authorised filter metrics</h5>
        <p>
            You may use any combination of the authorised metrics to filter the
            data API response.
        </p>
        <details className="govuk-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                  See a list of valid metrics for <Code>filters</Code>
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

        <Admonition type={ "Warning" }>
            The <Code>areaType</Code> metric is mandatory and must be defined in
            all queries.
        </Admonition>

        <h5>Example</h5>
        <LanguageTabs
            tabs={[ "Python", "JavaScript", "R" ]}
            content={[
                <div>
                    <CodeBox language={ "python" }>{ PythonExample }</CodeBox>
                    <CodeBox>{ PythonExampleOutput }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "javascript" }>{ JavaScriptExample }</CodeBox>
                    <CodeBox>{ JavaScriptExampleOutput }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "r" }>{ RExample }</CodeBox>
                    <CodeBox>{ RExampleOutput }</CodeBox>
                </div>
            ]}
        />
  </article>;


export default Filters;
