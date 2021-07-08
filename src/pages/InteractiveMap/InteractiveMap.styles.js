// @flow

import styled, { css } from "styled-components";

import type { ComponentType } from "react";
import CaretDown from "assets/caret-down-black.svg";


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


export const Container: ComponentType<*> =
    styled
        .article
        .attrs(({ className="" }) => ({
            className: `govuk-body ${className}`
        }))`
            display: flex;
            flex-direction: column;
        `;

export const LegendContainer: ComponentType<*> =
styled
    .div`
    position: absolute;
    display: inline-block;
    right: 10px;
    bottom: 20px;
    z-index: 1;
    padding: .2rem;
    background: rgba(255,255,255,0.9);
    width: max-content;
    max-width: 130px;
    border: 1px solid black;
    
    @media only screen and (max-width: 600px) {
        font-size: 0.8rem !important;
        padding: .3rem !important;
        bottom: 35px;
    }
    `;
    

export const MainContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: column;
        `;

export const Slider: ComponentType<*> =
    styled
        .input
        .attrs(({ ...props }) => ({
            type: "range",
            ...props
        }))`
        ${ css`${
            ({ value: v, length: l }) => ({
                background: `linear-gradient(to right, #12407F 0%, #12407F ${ Math.ceil(v * 100 / l + .7) }%, white  ${ Math.ceil((v + .7) * 100 / l) }%, white 100%) !important`
            })
        }`};
        `;


export const SideDataContainer: ComponentType<*> =
    styled
        .div`
            min-width: auto;
            margin: 0 .5rem 0 1rem;
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
            
            @media only screen and (max-width: 600px) {
                margin-top: 0.3rem !important;
            }
        `;


export const ScaleColor: ComponentType<*> =
    styled
        .span`
            display: inline-flex;
            border-radius: 100%;
            padding: 7px;
            border: 2px solid #6e6e6e;
            @media only screen and (max-width: 600px) {
                padding: 5px;
            }
        `;


export const ScaleValue: ComponentType<*> =
    styled
        .span`
            width: max-content;
            margin-left: 0.5rem;
        `;


export const ScaleLegendLabel: ComponentType<*> =
    styled
        .h3
        .attrs(({ className="" }) => ({
            className: `govuk-body govuk-!-font-size-14 ${className}`
        }))`
            display: flex;
            margin: 0 !important;
            font-weight: bold;
            text-align: left;
        `;




export const LegendButton: ComponentType<*> =
    styled
        .button
        .attrs(({ ...props }) => ({ type: "button", ...props }))`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;
            text-align: left;
            
            & abbr {
                text-decoration: none;
            }
            
            &:after {
                height: 8px;
                content: url(${CaretDown});
                margin-left: 5px;
                ${css` ${ ({ active }) => ({ transform: active ? "rotate(180deg)" : "none" }) }`};
            }
            
        `;
