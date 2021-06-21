// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


export const ExternalLink: ComponentType<*> = (() => {

    return styled.a`
        padding: .5rem 2rem;
    `

})();  // ExternalLink


export const LinkDescription: ComponentType<*> = (() => {

    return styled.p`
        color: #626a6e;
    `

})();  // LinkDescription


export const Image: ComponentType<*> = (() => {

    return styled.img`
        height: auto;
        width: 100%;
        
        @media only screen and (max-width: 768px) {
            display: none;
            visibility: hidden;
            width: 0;
            height: 0;
        }

    `

})();  // Image