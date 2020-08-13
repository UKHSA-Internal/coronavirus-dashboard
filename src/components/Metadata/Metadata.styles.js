// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


export const Markdown: ComponentType<*> = (() => {

    return styled
        .div
        .attrs(({ className="" }) => ({
            className: `${ className } markdown modal`
        }))`
            padding: 0 30px;
            overflow-x: scroll;
            max-height: 300px;
            font-size: 80%;
            border-bottom: unset;
            margin-bottom: 0;

            & > :first-child {
                margin-top: 0;
            }            
        `

})();

