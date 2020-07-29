// @flow

import React from "react";
import styled from 'styled-components';

import type { ComponentType } from 'react';


export const HalfCard: ComponentType<*> = (() => {

    return styled.div`
        flex: 1 1 43%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        background-color: #f8f8f8;
        margin-top: 30px;
        
        @media only screen and (max-width: 768px) {
            flex: 1 1 100%;
        }
        
        &:nth-of-type(2n) {
            margin-left: 30px;
            
            @media only screen and (max-width: 1074px) {
                flex: 1 1 100%;
                margin-left: 0;
            }
        }
    `

})();


export const HalfCardHeader: ComponentType<*> = (() => {

    return styled
        .header
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-padding-bottom-2`
        }))`
            display: flex;
            justify-content: space-between !important;
            align-items: center !important;
        `

})();


export const HalfCardHeading: ComponentType<*> = (() => {

    return styled
        .h2
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-heading-m govuk-!-margin-bottom-0`
        }))``

})();


export const HalfCardSplitBody: ComponentType<*> = (() => {

    return styled
        .div`
            display: flex;
            flex-wrap: wrap !important;
            margin: 0 -15px;
        `

})();


export const FullCard: ComponentType<*> = (() => {

    return styled.article`
        flex: 1 0 60%;
        padding: 20px;
        border: 1px #f3f2f1 solid;
        margin-top: 30px;
        background-color: #f8f8f8;
        min-height: 450px;
        
        &:first-of-type {
            margin-top: 0;
        }
    `

})();


export const Caption: ComponentType<*> = (() => {

    return styled
        .span
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-caption-m`
        }))``

})();


export const BodySection: ComponentType<*> = (() => {

    return styled.div`
        flex: 1 1 43%;
        margin: 0 15px;
        
        &:nth-child(2n) {
            @media only screen and (max-width: 550px) {
                flex: 1 1 100%;
                margin-top: 2rem;
            }
        }
    `

})();


export const HBodySection: ComponentType<*> = (() => {

    return styled.section`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 1rem 0 0 0;
        
        & > * {
            margin-right: 2rem;
            margin-bottom: 0;
        }
    `

})();


export const MixedCardContainer: ComponentType<*> = (() => {

    return styled.section`
        display: flex;
        flex-wrap: wrap;
        
        justify-items: space-between;
    `

})();  // MixedCardContainer

