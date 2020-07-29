// @flow

import React from "react";

import { Method, MethodBadge } from "./HttpMethods.styles";
import { Prism as CodeBox } from "react-syntax-highlighter";

import type { ComponentType } from "react";


const Head: ComponentType<*> = () =>
    <article>
        <header>
            <Method>HEAD</Method>
        </header>
        <p>
            Parameters and responses are identical to the <MethodBadge>GET</MethodBadge> method
            for a given request, but omits the response body.
        </p>

        <p>
            The <MethodBadge>HEAD</MethodBadge> may be used to validate a query without
            downloading its content. It may also be used to check the timestamp of the
            latest data available on the API.
        </p>

        <CodeBox language={ 'bash' }>
            {`curl -sI 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=\{"name":"areaName"\}' | grep -i 'http'`}
        </CodeBox>
        <CodeBox>
            {`HTTP/1.1 200 OK`}
        </CodeBox>
    </article>;


export default Head;
