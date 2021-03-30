// @flow

import React from "react";
import CodeBox from "components/CodeBox";

import { Admonition } from "components/Widgets";
import LanguageTabs from "./LanguageTabLink";

import { BlueBadge, Query, Title, Spacer } from "./QueryParameters.styles";
import { Code } from "components/Widgets/Widgets.styles";
import type { ComponentType } from "react";


const PythonExample = `from typing import Iterable, Dict, Union, List
from json import dumps
from requests import get
from http import HTTPStatus


StructureType = Dict[str, Union[dict, str]]
FiltersType = Iterable[str]
APIResponseType = Union[List[StructureType], str]


def get_paginated_dataset(filters: FiltersType, structure: StructureType,
                          as_csv: bool = False) -> APIResponseType:
    """
    Extracts paginated data by requesting all of the pages
    and combining the results.

    Parameters
    ----------
    filters: Iterable[str]
        API filters. See the API documentations for additional
        information.

    structure: Dict[str, Union[dict, str]]
        Structure parameter. See the API documentations for
        additional information.

    as_csv: bool
        Return the data as CSV. [default: \`\`False\`\`]

    Returns
    -------
    Union[List[StructureType], str]
        Comprehensive list of dictionaries containing all the data for
        the given \`\`filters\`\` and \`\`structure\`\`.
    """
    endpoint = "https://api.coronavirus.data.gov.uk/v1/data"

    api_params = {
        "filters": str.join(";", filters),
        "structure": dumps(structure, separators=(",", ":")),
        "format": "json" if not as_csv else "csv"
    }

    data = list()

    page_number = 1

    while True:
        # Adding page number to query params
        api_params["page"] = page_number

        response = get(endpoint, params=api_params, timeout=10)

        if response.status_code >= HTTPStatus.BAD_REQUEST:
            raise RuntimeError(f'Request failed: {response.text}')
        elif response.status_code == HTTPStatus.NO_CONTENT:
            break

        if as_csv:
            csv_content = response.content.decode()

            # Removing CSV header (column names) where page 
            # number is greater than 1.
            if page_number > 1:
                data_lines = csv_content.split("\\n")[1:]
                csv_content = str.join("\\n", data_lines)

            data.append(csv_content.strip())
            page_number += 1
            continue

        current_data = response.json()
        page_data: List[StructureType] = current_data['data']
        
        data.extend(page_data)

        # The "next" attribute in "pagination" will be \`None\`
        # when we reach the end.
        if current_data["pagination"]["next"] is None:
            break

        page_number += 1

    if not as_csv:
        return data

    # Concatenating CSV pages
    return str.join("\\n", data)


if __name__ == "__main__":
    query_filters = [
        f"areaType=region"
    ]

    query_structure = {
        "date": "date",
        "name": "areaName",
        "code": "areaCode",
        "daily": "newCasesBySpecimenDate",
        "cumulative": "cumCasesBySpecimenDate"
    }

    json_data = get_paginated_dataset(query_filters, query_structure)
    print("JSON:")
    print(f"Length:", len(json_data))
    print("Data (first 3 items):", json_data[:3])

    print("---" * 10)
    
    csv_data = get_paginated_dataset(query_filters, query_structure, as_csv=True)
    csv_lines = csv_data.split("\\n")
    print("CSV:")
    print(f"Length:", len(csv_lines))
    print("Data (first 3 lines):", csv_lines[:3])`;


const PythonExampleResponse = `JSON:
Length: 1400
Data (first 3 items): [{'date': '2020-07-23', 'name': 'East Midlands', 'code': 'E12000004', 'daily': 0, 'cumulative': 22820}, {'date': '2020-07-23', 'name': 'East of England', 'code': 'E12000006', 'daily': 0, 'cumulative': 24337}, {'date': '2020-07-23', 'name': 'London', 'code': 'E12000007', 'daily': 0, 'cumulative': 34791}]
------------------------------
CSV:
Length: 1401
Data (first 3 lines): ['date,name,code,daily,cumulative', '2020-07-23,East Midlands,E12000004,0,22820', '2020-07-23,East of England,E12000006,0,24337']`;


const JavaScriptExample = `const axios = require("axios");


/**
 * Extracts paginated data by requesting all of the pages
 * and combining the results.
 *
 * @param filters { Array<string> }
 *          API filters. See the API documentations for additional
 *          information.
 *
 * @param structure { Object<string, any> }
 *          Structure parameter. See the API documentations for
 *          additional information.
 *
 * @returns {Promise<Array<any>>}
 *          Comprehensive list of dictionaries containing all the data for
 *          the given \`\`filters\`\` and \`\`structure\`\`.
 */
const getPaginatedData = async ( filters, structure ) => {

    const
        endpoint = 'https://api.coronavirus.data.gov.uk/v1/data',
        apiParams = {
            filters: filters.join(";"),
            structure: JSON.stringify(structure)
        },
        result = [];

    let
        nextPage = null,
        currentPage = 1;

    do {

        const { data, status, statusText } = await axios.get(endpoint, {
            params: {
                ...apiParams,
                page: currentPage
            },
            timeout: 10000 
        });

        if ( status >= 400 )
            throw Error(statusText);

        if ( "pagination" in data )
            nextPage = data.pagination.next || null;

        result.push(...data.data);

        currentPage ++;

    } while ( nextPage );

    return result;

};  // getData


const main = async () => {

    const
        filters = [
            \`areaType=region\`,
        ],
        structure = {
            date: "date",
            name: "areaName",
            code: "areaCode",
            new: "newCasesBySpecimenDate",
            cumulative: "cumCasesBySpecimenDate"
        };

    const results = await getPaginatedData(filters, structure);

    console.log(\`Length: \${results.length}\`)
    console.log('Data (first 3 items):', results.slice(0, 3));

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});`;


const JavaScriptExampleResponse = `Length: 1400
Data (first 3 items): [
  {
    date: '2020-07-23',
    name: 'East Midlands',
    code: 'E12000004',
    new: 0,
    cumulative: 22820
  },
  {
    date: '2020-07-23',
    name: 'East of England',
    code: 'E12000006',
    new: 0,
    cumulative: 24337
  },
  {
    date: '2020-07-23',
    name: 'London',
    code: 'E12000007',
    new: 0,
    cumulative: 34791
  }
]`;


const RExample = `#' Extracts paginated data by requesting all of the pages
#' and combining the results.
#'
#' @param filters    API filters. See the API documentations for 
#'                   additional information.
#'                   
#' @param structure  Structure parameter. See the API documentations 
#'                   for additional information.
#'                   
#' @return list      Comprehensive list of dictionaries containing all 
#'                   the data for the given \`\`filter\`\` and \`\`structure\`.\`
get_paginated_data <- function (filters, structure) {
  
    endpoint     <- "https://api.coronavirus.data.gov.uk/v1/data"
    results      <- list()
    current_page <- 1
    
    repeat {

        httr::GET(
            url   = endpoint,
            query = list(
                filters   = paste(filters, collapse = ";"),
                structure = jsonlite::toJSON(structure, auto_unbox = TRUE),
                page      = current_page
            ),
            timeout(10)
        ) -> response
        
        # Handle errors:
        if ( response$status_code >= 400 ) {
            err_msg = httr::http_status(response)
            stop(err_msg)
        } else if ( response$status_code == 204 ) {
            break
        }
        
        # Convert response from binary to JSON:
        json_text <- content(response, "text")
        dt        <- jsonlite::fromJSON(json_text)
        results   <- rbind(results, dt$data)
        
        if ( is.null( dt$pagination$\`next\` ) ){
            break
        }
        
        current_page <- current_page + 1;

    }
    
    return(results)
    
}


# Create filters:
query_filters <- c(
    "areaType=region"
)

# Create the structure as a list or a list of lists:
query_structure <- list(
    date       = "date", 
    name       = "areaName", 
    code       = "areaCode", 
    daily      = "newCasesBySpecimenDate",
    cumulative = "cumCasesBySpecimenDate"
)

result <- get_paginated_data(query_filters, query_structure)

list(
  "Shape"                = dim(result),
  "Data (first 3 items)" = result[0:3, 0:-1]
) -> report

print(report)`;


const RExampleResponse = `$Shape
[1] 1400    5

$\`Data (first 3 items)\`
             name      code daily cumulative
1   East Midlands E12000004     0      22820
2 East of England E12000006     0      24337
3          London E12000007     0      34791`;


const Page: ComponentType<*> = () =>
    <article>
        <Spacer/>
        <Title id={ "params-page" }>
            <Query>page</Query>
            <BlueBadge>Optional</BlueBadge>
        </Title>
        <CodeBox>page=[number]</CodeBox>

          <p>
                Number of records produced in response to certain queries may exceed
                the default limit. Use of the <Code>page</Code> query parameter activates
                the pagination process.
            </p>
            <Admonition>
                The maximum limit of the API is currently set to 1000 records per request.
            </Admonition>

            <p>
                Once activated, all JSON or XML formatted responses will include an
                additional <Code>pagination</Code> attribute, structured as follows:
            </p>

            <LanguageTabs tabs={[ "JSON", "XML" ]}
                          content={[
            <CodeBox language={ "json" }>{`{
    "length": ...,
    "maxPageLimit": 1000,
    "data": [...],
    "pagination": {
        "first": "/v1/data?...",
        "previous": "/v1/data?...",
        "current": "/v1/data?...",
        "next": "/v1/data?...",
        "last": "/v1/data?..."
    }
}`}</CodeBox>,
            <CodeBox language={ "xml" }>{`<Document>
    <length>...</length>
    <maxPageLimit>1000</maxPageLimit>
    <data>
        ...
    </data>
    <pagination>
        <first>/v1/data?...</first>
        <previous>/v1/data?...</previous>
        <current>/v1/data?...</current>
        <next>/v1/data?...</next>
        <last>/v1/data?...</last>
    </pagination>
</Document>
`}</CodeBox>]}/>

            <p>
                The <Code>pagination</Code> attribute provides qualified, relative URIs to
                different pages of the response to your request. Where a link is not
                available, the value of the corresponding key under
                <Code>pagination</Code> will be set to <Code>null</Code>. For instance,
                if you have already reached the final page, the response will be as follows:
            </p>

            <LanguageTabs tabs={[ "JSON", "XML" ]}
                          content={[
            <CodeBox language={ "json" }>{`{
    ...
    "pagination": {
        "first": "/v1/data?...",
        "previous": "/v1/data?...",
        "current": "/v1/data?...",
        "next": null,
        "last": "/v1/data?..."
    }
}`}</CodeBox>,
            <CodeBox language={ "xml" }>{`<Document>
    ...
    <pagination>
        <first>/v1/data?...</first>
        <previous>/v1/data?...</previous>
        <current>/v1/data?...</current>
        <next xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
        <last>/v1/data?...</last>
    </pagination>
</Document>
`}</CodeBox>]}/>

        <Admonition>
            Although pagination is available for CSV formatted responses, the CSV
            structure is strict and does not provide the means to include metadata.
        </Admonition>

        <p>
            We have developed <a href={ "#sdks" }>Software Development Kits (SDK)</a> for
            Python, JavaScript, and R for the API service. These libraries are designed
            to bypass pagination and produce the full result for a query.
        </p>

        <h5 id={ "page-example" }>Example</h5>
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


export default Page;
