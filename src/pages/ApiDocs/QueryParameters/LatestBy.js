// @flow

import React from "react";
import CodeBox from "components/CodeBox";

import { Admonition } from "components/Widgets";
import LanguageTabs from "./LanguageTabLink";

import { BlueBadge, Query, Title } from "./QueryParameters.styles";
import { Code } from "components/Widgets/Widgets.styles";

import type { ComponentType } from "react";


const PythonExample = `from urllib.parse import urlencode
from json import dumps
from requests import get


ENDPOINT = "https://api.coronavirus.data.gov.uk/v1/data"
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

response = get(f"{ ENDPOINT }?{ encoded_params }", timeout=10)

if response.status_code >= 400:
    raise RuntimeError(f'Request failed: { response.text }')

data = response.json()

print(data)`;


const PythonExampleResponse = `{'length': 1, 'maxPageLimit': 1, 'data': [{'date': '2020-07-20', 'name': 'England', 'code': 'E92000001', 'cases': {'daily': 535, 'cumulative': 254120}, 'deaths': {'daily': None, 'cumulative': None}}]}`;

const JavaScriptExample = `const axios = require("axios");


const getData = async ( queries ) => {

    const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';

    const { data, status, statusText } = await axios.get(endpoint, { 
        params: queries,
        timeout: 10000 
    });

    if ( status >= 400 )
        throw new Error(statusText);

    return data

};  // getData


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

    const result = await getData(apiParams);

    console.log(JSON.stringify(result));

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`;


const JavaScriptExampleResponse = `{"length":1,"maxPageLimit":1,"data":[{"date":"2020-07-20","name":"England","code":"E92000001","cases":{"new":535,"cumulative":254120},"deaths":{"new":null,"cumulative":null}}]}`;


const RExample = `AREA_TYPE = "nation"
AREA_NAME = "england"

endpoint <- "https://api.coronavirus.data.gov.uk/v1/data"

# Create filters:
filters <- c(
    sprintf("areaType=%s", AREA_TYPE),
    sprintf("areaName=%s", AREA_NAME)
)

# Create the structure as a list or a list of lists:
structure <- list(
    date  = "date", 
    name  = "areaName", 
    code  = "areaCode", 
    cases = list(
        daily      = "newCasesByPublishDate",
        cumulative = "cumCasesByPublishDate"
    ), 
    deaths = list(
        daily      = "newDeathsByDeathDate",
        cumulative = "cumDeathsByDeathDate"
    )
)

httr::GET(
    url = endpoint,
    query = list(
        filters   = paste(filters, collapse = ";"),
        structure = jsonlite::toJSON(structure, auto_unbox = TRUE),
        latestBy  = "newCasesByPublishDate"
    ),
    timeout(10)
) -> response

# Handle errors:
if (response$status_code >= 400) {
    err_msg = httr::http_status(response)
    stop(err_msg)
}

# Convert response from binary to JSON:
json_text <- content(response, "text")
data      <- jsonlite::fromJSON(json_text)

# Store the encoded URL for inspection:
url <- response$url

print(data)`;


const RExampleResponse = `$length
[1] 1

$maxPageLimit
[1] 1

$data
        date    name      code cases.daily cases.cumulative deaths.daily deaths.cumulative
1 2020-07-20 England E92000001         535           254120           NA                NA`;


const LatestBy: ComponentType<*> = () =>
    <article>
        <Title>
            <Query>latestBy</Query>
            <BlueBadge>Optional</BlueBadge>
        </Title>

        <CodeBox>latestBy=[parameter]</CodeBox>

        <p>Produces the latest available value (non-null) relative to the value.</p>

        <Admonition type={ "Warning" }>
            The value defined for <Code>latestBy</Code> must be included in
            the <Code>structure</Code>.
        </Admonition>

        <Admonition type={ "Warning" }>
            The <Code>latestBy</Code> query only accepts one value. You may still
            include multiple metrics in the <Code>structure</Code>, but beware that
            the response will only include data for the date on which the latest
            value for the metric defined for <Code>latestBy</Code> was published.
        </Admonition>

        <h5>Example</h5>
        <LanguageTabs
            tabs={[ "Python", "JavaScript", "R" ]}
            content={[
                <div>
                    <CodeBox language={ "python" }>{ PythonExample }</CodeBox>
                    <CodeBox>{ PythonExampleResponse }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "javascript" }>{ JavaScriptExample }</CodeBox>
                    <CodeBox>{ JavaScriptExampleResponse }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "r" }>{ RExample }</CodeBox>
                    <CodeBox>{ RExampleResponse }</CodeBox></div>
            ]}
        />
    </article>;


export default LatestBy;
