// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const Markdown: ComponentType<*> = (() => {

    const
        Node = styled.div`
            padding: 30px;
            overflow-x: scroll;
            font-size: 80%;
            border-bottom: 1px solid #6F777B;
            margin-bottom: 0;

            & > :first-child {
                margin-top: 0;
            }            
        `;

    return ({ className, ...props }) =>
        <Node className={ `modal markdown ${className}` } { ...props }/>

})();

