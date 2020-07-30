// @flow

import React from "react";
import CodeBox from "components/CodeBox";

import { Admonition } from "components/Widgets";
import LanguageTabs from "./LanguageTabLink";

import { BlueBadge, Query, Title } from "./QueryParameters.styles";
import { Code } from "components/Widgets/Widgets.styles";

import type { ComponentType } from "react";


const EncodeExamplePython = `from urllib.parse import urlencode
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

print(f"/v1/data?{ encoded_params }")`;


const EncodingExampleJavaScript = `const
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
    encodedParams = encodeURI(apiParams);

console.log(\`/v1/data?$\{ encodedParams }\`);`;


const EncodingExampleR = `AREA_TYPE = "nation"
AREA_NAME = "england"

endpoint <- "https://api.coronavirus.data.gov.uk/v1/data"

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

# Convert response from binary to JSON:
json_text <- content(response, "text")
data = jsonlite::fromJSON(json_text)

# Store the encoded URL for inspection:
url <- response$url

print(url)`;


const AutomatedEncodingExamplePython = `from requests import get
from json import dumps


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
    "structure": dumps(structure, separators=(",", ":"))
}


response = get(ENDPOINT, params=api_params, timeout=10)

if response.status_code >= 400:
    raise RuntimeError(f'Request failed: { response.text }')

print(response.url)
print(response.json())`;


const AutomatedEncodingExamplePythonResponse = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22daily%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D
{'length': 141, 'maxPageLimit': 1000, 'data': [{'date': '2020-07-20', 'name': 'England', 'code': 'E92000001', 'cases': {'daily': 535, 'cumulative': 254120}, 'deaths': {'daily': None, 'cumulative': None}}, ...]}`;


const AutomatedEncodingExampleJavaScript = `const axios = require("axios");


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
            \`areaType=\${ AreaType }\`,
            \`areaName=\${ AreaName }\`
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
        };

    const result = await getData(apiParams);

    console.log(JSON.stringify(result));

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`;


const AutomatedEncodingExampleJavaScriptResponse = `{"length":141,"maxPageLimit":1000,"data":[{"date":"2020-07-20","name":"England","code":"E92000001","cases":{"new":535,"cumulative":254120},"deaths":{"new":null,"cumulative":null}}, ...]}`;


const AutomatedEncodingExampleR = `AREA_TYPE = "nation"
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

# The "httr::GET" method automatically encodes 
# the URL and its parameters:
httr::GET(
    # Concatenate the filters vector using a semicolon.
    url = endpoint,
    
    # Convert the structure to JSON (ensure 
    # that "auto_unbox" is set to TRUE).
    query = list(
        filters   = paste(filters, collapse = ";"),
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

# Convert response from binary to JSON:
json_text <- content(response, "text")
data      <- jsonlite::fromJSON(json_text)

# Store the encoded URL for inspection:
url <- response$url

print(url)
print(data)`;


const AutomatedEncodingExampleRResponse = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22daily%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D
$length
[1] 141

$maxPageLimit
[1] 1000

$data
          date    name      code cases.daily cases.cumulative deaths.daily deaths.cumulative
1   2020-07-20 England E92000001         535           254120           NA                NA
2   2020-07-19 England E92000001         672           253585            5             40718
...`;


const Structure: ComponentType<*> = () =>
    <article>
        <Title>
            <Query>structure</Query>
            <BlueBadge>Required</BlueBadge>
        </Title>

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
            <li>
                The structure defines the overall structure of the JSON / XML response. For
                CSV outputs, a flat structure or a JSON array must be defined.
            </li>
        </ul>

        <details className="govuk-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                  See a list of valid metrics for <Code>structure</Code>
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
            We start off by constructing the value of the <Code>filters</Code> parameter:
        </p>
        <CodeBox>{`/v1/data?filters=areaType=nation;areaName=england`}</CodeBox>
        <p>
            Next step is to construct the value of the <Code>structure</Code> parameter.
            To do so, we need to find out the name of the metric in which we are interested.
            In the case of this example, the metrics are as follows:
        </p>
        <dl>
            <dt><Code>newCasesByPublishDate</Code></dt><dd>New cases (by publish date)</dd>
            <dt><Code>cumCasesByPublishDate</Code></dt><dd>Cumulative cases (by publish date)</dd>
            <dt><Code>newDeathsByDeathDate</Code></dt><dd>New deaths (by death date)</dd>
            <dt><Code>cumDeathsByDeathDate</Code></dt><dd>Cumulative deaths (by death date)</dd>
        </dl>
        <p>
            In its simplest form, we construct the structure as follows:
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
                to change both the structure and the names of the metrics.
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
            <p>and incorporate the structure JSON text into the URL:</p>
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
                It may be necessary to encode the URL to ensure that the data are correctly
                transmitted and parsed. Modern browsers encode the URL automatically before
                transmission.
            </Admonition>

            <p>
                Programming languages provide tools to encode string values and make
                them URL-safe.
            </p>

            <LanguageTabs
                tabs={[ "Python", "JavaScript", "R" ]}
                content={[
                    <div>
                        <CodeBox language={ "python" }>{ EncodeExamplePython }</CodeBox>
                        <CodeBox>{`/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22new%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox>
                    </div>,
                    <div>
                        <CodeBox language={ "javascript" }>{ EncodingExampleJavaScript }</CodeBox>
                        <CodeBox>{`/v1/data?filters=areaType=nation;areaName=england&structure=%7B%22date%22:%22date%22,%22name%22:%22areaName%22,%22code%22:%22areaCode%22,%22cases%22:%7B%22daily%22:%22newCasesByPublishDate%22,%22cumulative%22:%22cumCasesByPublishDate%22%7D,%22deaths%22:%7B%22new%22:%22newDeathsByDeathDate%22,%22cumulative%22:%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox>
                    </div>,
                    <div>
                        <CodeBox language={ "r" }>{ EncodingExampleR }</CodeBox>
                        <CodeBox>{`https://api.coronavirus.data.gov.uk/v1/data?filters=areaType%3Dnation%3BareaName%3Dengland&structure=%7B%22date%22%3A%22date%22%2C%22name%22%3A%22areaName%22%2C%22code%22%3A%22areaCode%22%2C%22cases%22%3A%7B%22daily%22%3A%22newCasesByPublishDate%22%2C%22cumulative%22%3A%22cumCasesByPublishDate%22%7D%2C%22deaths%22%3A%7B%22daily%22%3A%22newDeathsByDeathDate%22%2C%22cumulative%22%3A%22cumDeathsByDeathDate%22%7D%7D`}</CodeBox></div>
                ]}
            />

            <p>
                Please note that the majority of programming libraries that
                handle HTTP requests encode the URL and its parameters
                automatically:
            </p>

        <LanguageTabs
            tabs={[ "Python", "JavaScript", "R" ]}
            content={[
                <div>
                    <CodeBox language={ "python" }>{ AutomatedEncodingExamplePython }</CodeBox>
                    <CodeBox>{ AutomatedEncodingExamplePythonResponse }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "javascript" }>{ AutomatedEncodingExampleJavaScript }</CodeBox>
                    <CodeBox>{ AutomatedEncodingExampleJavaScriptResponse }</CodeBox>
                </div>,
                <div>
                    <CodeBox language={ "r" }>{ AutomatedEncodingExampleR }</CodeBox>
                    <CodeBox>{ AutomatedEncodingExampleRResponse }</CodeBox></div>
            ]}
        />
    </article>;


export default Structure;
