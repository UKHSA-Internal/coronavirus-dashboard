// @flow

import React from "react";

import styled from 'styled-components';
import type { ComponentType } from 'react';


const col = "#c75e0d";

export const Container: ComponentType<*> =
    styled
        .a`
            display: inline-flex;
            align-content: center;
            align-items: center;
            padding: .3rem .5rem;
            background: #EE802F;
            font-size: smaller;
            font-weight: bold;
            color: #ffffff;
            text-decoration: none;
            
            &:hover {
                background: #c75e0d;
            }
            
            &>span {
                margin-bottom: -1px;
            } 
        `;
