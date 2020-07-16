// @flow

import React from "react";
import styled from "styled-components";

import type { ComponentType } from "react";


export const ExternalLink: ComponentType<*> = (() => {

    return styled.a`
        padding: .5rem 2rem;
    `

})();  // ExternalLink


export const LinkDescription: ComponentType<*> = (() => {

    return styled.span`
        color: #626a6e;
    `

})();  // LinkDescription


export const Image: ComponentType<*> = (() => {

    return styled.img`
        max-height: 300px;
    `

})();  // Image