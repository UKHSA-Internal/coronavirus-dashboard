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
        `;


export const SideDataContainer: ComponentType<*> =
    styled
        .div`
            min-width: auto;
            margin: 0 .5rem 0 1rem;
        `;


export const ScaleLegend: ComponentType<*> =
    styled
        .div`
            font-family: "GDS Transport", Arial, sans-serif;
            margin-top: 1rem;
            display: flex;
            flex-direction: row;
        `;


export const ScaleGroup: ComponentType<*> =
    styled
        .div`
            display: inline-flex;
            flex-direction: row;
            align-items: center;
        `;

export const ScaleColor: ComponentType<*> =
    styled
        .span`
            width: 30px;
            height: 10px;
            border: 2px solid black;
        `;


export const ScaleValue: ComponentType<*> =
    styled
        .span`
            width: 100px;
            margin-left: 0.5rem;
            margin-right: 2rem;             
        `;


export const ScaleLegendLabel: ComponentType<*> =
    styled
        .span`
            font-wight: bold;
            width: 200px;       
        `;


