// @flow

import React from "react";

import CodeBox from "components/CodeBox";
import { Admonition, HorizontalRule } from "components/Widgets";
import { Code } from "components/Widgets/Widgets.styles";

import HttpMethods from "./HttpMethods/HttpMethods";

import QueryParameters from "./QueryParameters/QueryParameters";
import { Container } from "./ApiDocs.styles";

import type { ComponentType } from "react";


const ApiDocs: ComponentType<*> = ({ ...props }) => {

    return <Container className={ "developers-guide" }>
        <h2>Documentations for the API &mdash; v.1</h2>

        <section>
            <h2>Table of contents</h2>
            <div className={ "toc" }>
                <ul>
                    <li><a href={ "#version" }>Version</a></li>
                    <li><a href={ "#sdks" }>Software Development Kits (SDK)</a></li>
                    <li><a href={ "#schema" }>Schema</a></li>
                    <li>
                        <ul>
                            <li><a href={ "#request-headers" }>Request headers</a></li>
                            <li><a href={ "#timestamps" }>Timestamps</a></li>
                        </ul>
                    </li>
                    <li><a href={ "#methods" }>Methods</a></li>
                    <li>
                        <ul>
                            <li><a href={ "#methods-head" }>HEAD</a></li>
                            <li><a href={ "#methods-options" }>OPTIONS</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#options-responses" }>Responses</a></li>
                                </ul>
                            </li>
                            <li><a href={ "#methods-get" }>GET</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#get-responses" }>Responses</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href={ "#query-parameters" }>Query parameters</a></li>
                    <li>
                        <ul>
                            <li><a href={ "#params-filters" }>filters</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#filters-multiple_params" }>Multiple parameters</a></li>
                                    <li><a href={ "#filters-authorised_filter_metrics" }>Authorised filter metrics</a></li>
                                    <li><a href={ "#filters-example" }>Example</a></li>
                                </ul>
                            </li>
                            <li><a href={ "#params-structure" }>structure</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#structure-metrics" }>Metrics</a></li>
                                    <li><a href={ "#structure-example" }>Example</a></li>
                                    <li><a href={ "#structure-renaming_metrics" }>Renaming metrics</a></li>
                                    <li><a href={ "#structure-url_encoding" }>URL encoding</a></li>
                                </ul>
                            </li>
                            <li><a href={ "#params-latestby" }>latestBy</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#latestby-example" }>Example</a></li>
                                </ul>
                            </li>
                            <li><a href={ "#params-format" }>format</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#format-example" }>Example</a></li>
                                </ul>
                            </li>
                            <li><a href={ "#params-page" }>page</a></li>
                            <li>
                                <ul>
                                    <li><a href={ "#page-example" }>Example</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>

        <HorizontalRule/>

        <section>
            <article>
                <header>
                    <h3 id={"version"}>Version</h3>
                </header>
                <p>
                    All API requests are currently served under version 1. The API version is
                    defined in the URI as&nbsp;<Code>/v1</Code>.
                </p>
                <p>The main endpoint to download data related to Coronavirus in the UK is as follows:</p>
                <CodeBox wrapLines={ true }>https://api.coronavirus.data.gov.uk/v1/data</CodeBox>

                <p>A generic template for version 1 of the API may be defined as:</p>
                <CodeBox wrapLines={ true }>
                    /v1/data?filters=&lt;string&gt;&structure=&lt;string&gt;[&latestBy=&lt;string&gt;][&format=&lt;string&gt;][&page=&lt;number&gt;]
                </CodeBox>
            </article>

            <article>
                <header>
                    <h3>Software Development Kits (SDK)</h3>
                </header>
                <p>
                    In addition to the examples in this document, we have also developed
                    software development kits (dedicated libraries) for Python, JavaScript and
                    R to facilitate access to the API. The Python SDK is currently available
                    on both&nbsp;
                    <a href={ "https://github.com/publichealthengland/coronavirus-dashboard-api-python-sdk" }
                       target={ "_blank" }
                       className={ "govuk-link" }
                       rel={ "noopenner noreferrer" }>GitHub</a>&reg; and&nbsp;
                    <a href={ "https://pypi.org/project/uk-covid19" }
                       target={ "_blank" }
                       className={ "govuk-link" }
                       rel={ "noopenner noreferrer" }>Python Packaging Index (PyPI)</a>.
                </p>
                <Admonition type={ "Information" }>
                    We will be publishing the libraries for JavaScript and R in the coming weeks.
                </Admonition>
            </article>
        </section>

        <HorizontalRule/>

        <section>
            <article>
                <header>
                    <h3 id={ "schema" }>Schema</h3>
                </header>
                <p>
                    All API requests are over HTTPS and accessed from <Code>https://api.coronavirus.data.gov.uk</Code>.
                </p>
                <p>
                    The API only accepts JSON formatted data. The default response is also JSON, but it
                    is possible to request a response in CSV or XML too.
                </p>
            <CodeBox language={ "bash" }>
                {`curl -si 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\&#123;%22name%22:%22areaName%22\&#125;'`}
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
                the data were last updated.
            </p>

                <CodeBox language={ 'bash' }>
                    {`curl -sI 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\{"name":"areaName"\}' | grep -i 'last-modified'`}
                </CodeBox>
                <CodeBox>
                    {`Last-Modified: Mon, 20 Jul 2020 14:28:09 GMT`}
                </CodeBox>

                <Admonition>
                    The <Code>Last-Modified</Code> timestamp is not identical to that which is
                    displayed on the website. It signifies the time when the data were uploaded
                    to our database. The delay in the release is due to the Quality Assurance
                    process that takes place everyday before the data are released.
                </Admonition>


            <h4 id={ "request-headers" }>Request headers</h4>
            <p>
                The API requires all requests to include certain headers. If these headers
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

            <h4 id={ "timestamps" }>Timestamps</h4>
            <p>
                All timestamps are formatted as ISO 8601, and are presented
                as either <Code>YYYY-MM-DDTHH:MM:SS.sssssssZ</Code> or <Code>YYYY-MM-DD</Code>.
            </p>
            </article>
        </section>

        <HorizontalRule/>

        <section>
            <h3 id={ "methods" }>Methods</h3>
            <HttpMethods/>
        </section>
        <section>
            <h3 id={ "query-parameters" }>Query parameters</h3>
            <QueryParameters/>
        </section>
    </Container>

};  // ApiDocs


export default ApiDocs;
