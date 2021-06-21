// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


export const Markdown: ComponentType<*> = (() => {

    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } markdown modal`
        }))`
            padding: 0 10px 0 0;
            overflow-x: hidden;
            max-height: 300px;
            font-size: 80%;
            border-bottom: unset;
            margin-bottom: 0;
            overflow-y: scroll;
            
            & > * {
               max-width: 45em;
            }

            & > :first-child {
                margin-top: 0;
            }            
        `

})();

