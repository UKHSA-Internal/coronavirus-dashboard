// @flow

import React from "react";

import { Method, SuccessCode, ErrorCode } from "./HttpMethods.styles";
import {
    GovUKTable,
    TableContainer,
    TBody,
    TD,
    TH,
    THead,
    TR
} from "components/GovUk/Table.styles";

import type { ComponentType } from "react";


const Get: ComponentType<*> = () =>
    <article>
        <header>
            <Method id={ "methods-get" }>GET</Method>
        </header>
        <h4 id={ "get-responses" }>Responses</h4>
        <GovUKTable>
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
                        there were no records matching the requested criteria.</TD>
                </TR>
                <TR>
                    <TD><ErrorCode>400</ErrorCode></TD>
                    <TD>Resource not found</TD>
                    <TD>Incorrect URL or method</TD>
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
                    <TD>
                        Exceeding the maximum number of parameters, either in filters
                        or in structure.
                    </TD>
                </TR>
                <TR>
                    <TD><ErrorCode>417</ErrorCode></TD>
                    <TD>Expectation failed</TD>
                    <TD>
                        Either the structure is not a correctly formatted JSON, or
                        the value assigned to a filter parameter is not the correct
                        type &mdash; e.g. incorrectly formatted date.
                    </TD>
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
                    <TD>
                        Either an internal server error has occurred, or processing
                        the request has taken longer than permitted.
                    </TD>
                </TR>
            </TBody>
        </GovUKTable>
    </article>;


export default Get;
