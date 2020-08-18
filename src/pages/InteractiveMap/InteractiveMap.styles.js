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


export const MapContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: column;
            width: 100%;
            align-self: stretch;
        `;


export const Slider: ComponentType<*> =
    styled
        .input
        .attrs(() => ({
            type: "range"
        }))`
            display: flex;
        `;


export const SideDataContainer: ComponentType<*> =
    styled
        .div`
            min-width: 400px;
            margin: 0 .5rem 0 1rem;
        `;
