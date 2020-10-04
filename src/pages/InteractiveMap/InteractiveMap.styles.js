// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


export const Header: ComponentType<*> =
    styled.header`
        margin-top: 1rem;
    `;


export const Row: ComponentType<*> =
    styled.div`
        display: flex;
        flex-direction: row;
    `;


export const InfoLine: ComponentType<*> =
    styled
        .p
        .attrs(({ className="" }) => ({
            className: `${className} govuk-body`
        }))`
            margin: 2rem 0 1rem;
            color: #636A6D;        
        `;


export const Selector: ComponentType<*> =
    styled
        .select
        .attrs(({ className="" }) => ({
            className: `${className} govuk-select govuk-!-margin-right-2`
        }))`
            margin-bottom: 1rem;
        `;


export const MainContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex: 2 1 30%;
            max-height: 80vh;
        `;

export const Slider: ComponentType<*> =
    styled
        .input
        .attrs(() => ({
            type: "range"
        }))`
        `;


export const SideDataContainer: ComponentType<*> =
    styled
        .div`
            min-width: auto;
            margin: 0 .5rem 0 1rem;
        `;


export const LegendContainer: ComponentType<*> =
    styled
        .div`
        position: absolute;
        display: inline-block;
        right: 10px;
        bottom: 20px;
        z-index: 1;
        padding: .5rem .8rem;
        background: rgba(255,255,255,0.9);
        width: max-content;
        border: 1px solid black;
        `;


export const ScaleLegend: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `govuk-body govuk-!-font-size-14 ${className}`
        }))`
            margin: 0;
            display: block;
        `;


export const ScaleGroup: ComponentType<*> =
    styled
        .div`
            display: flex;
            width: max-content;
            align-items: flex-end;
            margin-top: .5rem;
        `;


export const ScaleColor: ComponentType<*> =
    styled
        .span`
            display: inline-flex;
            border-radius: 100%;
            padding: 7px;
            border: 2px solid #6e6e6e;
        `;


export const ScaleValue: ComponentType<*> =
    styled
        .span`
            width: max-content;
            margin-left: 0.5rem;
            // margin-right: 2rem;             
        `;


export const ScaleLegendLabel: ComponentType<*> =
    styled

        .h3
        .attrs(({ className="" }) => ({
            className: `govuk-body govuk-!-font-size-14 ${className}`
        }))`
            margin: 0;
            font-weight: bold;
            width: max-content;
        `;


