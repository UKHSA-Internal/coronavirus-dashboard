// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            ...props,
            className: `govuk-body govuk-body-m ${className}`
        }))`
            display: flex;
            flex-direction: row;
            width: 100%;
            // height: 100%;
            margin-left: 0 !important;
            padding-top: 1px;
        `;


export const Column: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: column;
            flex-shrink: 4;
            border-right: 1px solid #b1b4b6;
            max-width: 200px;
            min-width: 200px;
            
            &:last-of-type {
                border-right: none;  
                flex-grow: 4;   
                max-width: 100%;       
            }
        `;


export const SelectorLabel: ComponentType<*> =
    styled
        .span
        .attrs(({ className="", ...props }) => ({
            className: `govuk-!-font-size-16 ${className}`,
            ...props,
        }))`
            padding: .5rem;
            text-decoration: underline;
            //white-space: nowrap;
            //overflow-x: hidden !important;
            //text-overflow: ellipsis;
            
            ${({ isActive }) => css`
                font-weight: ${isActive ? "bold" : "normal"};
                color: ${isActive ? "#f3f2f1" : "inherit"};
            `} 
        `;


export const SelectorContainer: ComponentType<*> =
    styled
        .div`
            & > a {
                max-width: 350px;
                display: flex;
                flex-direction: column;
                padding: .5rem;
                min-width: 100px;
                
                &:focus, 
                &:hover, 
                &:active {
                    ${({ isActive }) => css`background-color: ${isActive ? "#1d70b8" : "transparent"}`} !important;
                    box-shadow: none !important;
                    text-decoration: none;
                }
                
                ${({ isActive }) => css`background: ${isActive ? "#1d70b8" : "inherit"}`};
            }
        `;


export const SelectorLabelContainer: ComponentType<*> =
    styled
        .span`
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            &::after {
                content: "\\203A";
                color: #6B7276;
                text-decoration: none;
                padding-right: .5rem;
                padding-left: 1rem;
            }
        `;

export const SelectorDescription: ComponentType<*> =
    styled
        .p
        .attrs(({ className="", ...props }) => ({
            className: `govuk-body govuk-!-font-size-14 ${className}`,
            ...props,
        }))`
            padding: 0 .5rem .5rem 0;
            margin: 0;
            text-decoration: none !important;
            ${({ isActive }) => css`color: ${isActive ? "#f3f2f1" : "black"}`};
        `;