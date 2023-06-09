// @flow

import React from "react";
import CodeBox from "components/CodeBox";

import { Admonition } from "components/Widgets";
import LanguageTabs from "./LanguageTabLink";

import { BlueBadge, Query, Title } from "./QueryParameters.styles";
import { Code } from "components/Widgets/Widgets.styles";

import type { ComponentType } from "react";


const PythonExample = `from requests import get
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
    "dailyCases": "newCasesByPublishDate",
}

api_params = {
    "filters": str.join(";", filters),
    "structure": dumps(structure, separators=(",", ":")),
}

formats = [
    "json",
    "xml",
    "csv"
]

for fmt in formats:
    api_params["format"] = fmt
    response = get(ENDPOINT, params=api_params, timeout=10)
    assert response.status_code == 200, f"Failed request for {fmt}: {response.text}"
    print(f"{fmt} data:")
    print(response.content.decode())`;


const PythonExampleResponse = `json data:
{"length":1,"maxPageLimit":1,"data":[{"date":"2020-07-23","name":"England","code":"E92000001","dailyCases":702}]}
xml data:
﻿<Document><length>1</length><maxPageLimit>1</maxPageLimit><data><date>2020-07-23</date><name>England</name><code>E92000001</code><dailyCases>702</dailyCases></data></Document>
csv data:
date,name,code,dailyCases
2020-07-23,England,E92000001,702`;


const JavaScriptExample = `const axios = require("axios");


const getData = async ( queries={} ) => {

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
            newCase: "newCasesByPublishDate"
        },
        formats = [
            "json",
            "xml",
            "csv"
        ];

    const
        apiParams = {
            filters: filters.join(";"),
            structure: JSON.stringify(structure)
        };


    for ( const fmt of formats ) {

        apiParams.format = fmt;

        const result = await getData(apiParams);

        console.log(\`\${fmt} data:\`);
        console.log(JSON.stringify(result));

    }

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`;


const JavaScriptExampleResponse = `json data:
{"length":1,"maxPageLimit":1,"data":[{"date":"2020-07-23","name":"England","code":"E92000001","newCase":702}]}
xml data:
"﻿<Document><length>1</length><maxPageLimit>1</maxPageLimit><data><date>2020-07-23</date><name>England</name><code>E92000001</code><newCase>702</newCase></data></Document>"
csv data:
"date,name,code,newCase\\n2020-07-23,England,E92000001,702\\n"`;


const RExample = `AREA_TYPE = "nation"
AREA_NAME = "england"

endpoint <- "https://api.coronavirus.data.gov.uk/v1/data"

filters <- c(
    sprintf("areaType=%s", AREA_TYPE),
    sprintf("areaName=%s", AREA_NAME)
)

structure <- list(
    date       = "date",
    name       = "areaName",
    code       = "areaCode",
    dailyCases = "newCasesByPublishDate"
)

formats <- c("json", "xml", "csv")


for ( fmt in formats ) {

    httr::GET(
        url   = endpoint,
        query = list(
          filters   = paste(filters, collapse = ";"),
          structure = jsonlite::toJSON(structure, auto_unbox = TRUE),
          format    = fmt
        ),
        timeout(10)
    ) -> response

    if (response$status_code >= 400) {
        err_msg = httr::http_status(response)
        stop(err_msg)
    }

    data <- content(response, "text", encoding="UTF-8")

    print(sprintf("%s data:", fmt))
    print(data)

}`;


const RExampleResponse = `[1] "json data:"
[1] "{\\"length\\":1,\\"maxPageLimit\\":1,\\"data\\":[{\\"date\\":\\"2020-07-23\\",\\"name\\":\\"England\\",\\"code\\":\\"E92000001\\",\\"dailyCases\\":702}]}"
[1] "xml data:"
[1] "﻿<Document><length>1</length><maxPageLimit>1</maxPageLimit><data><date>2020-07-23</date><name>England</name><code>E92000001</code><dailyCases>702</dailyCases></data></Document>"
[1] "csv data:"
[1] "date,name,code,dailyCases\\n2020-07-23,England,E92000001,702\\n"`;


const Format: ComponentType<*> = () =>
    <article>
        <Title id={ "params-format" }>
            <Query>format</Query>
            <BlueBadge>Optional</BlueBadge>
        </Title>
        <CodeBox>format=[string]</CodeBox>

        <p>
            The API response may be formatted in JSON, XML, or CSV. If not explicitly
            defined, the API will default to JSON.
        </p>

        <Admonition type={ "Warning" }>
            Please note that the value of the <Code>format</Code> parameter must be
            in lowercase characters.
        </Admonition>

        <h5 id={ "format-example" }>Example</h5>
        <LanguageTabs
            tabs={ ["Python", "JavaScript", "R"] }
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
                    <CodeBox>{ RExampleResponse }</CodeBox>
                </div>
            ]}
        />
    </article>;


export default Format;
