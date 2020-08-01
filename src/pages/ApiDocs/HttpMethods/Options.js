// @flow

import React from "react";

import { Admonition } from "components/Widgets";

import { Method, MethodBadge, SuccessCode } from "./HttpMethods.styles";

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


const Options: ComponentType<*> = () =>
    <article>
        <header>
            <Method id={ "methods-options" }>OPTIONS</Method>
        </header>
        <p>
            Provides the options available for the API &mdash; an abstract version of
            this document &mdash; based on the Open API v.3 standard in a
            JSON-formatted response.
        </p>

        <Admonition>
            The <MethodBadge>OPTIONS</MethodBadge> method discards all query parameters.
        </Admonition>

        <h4 id={ "options-responses" }>Responses</h4>
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
    </article>;


export default Options;
