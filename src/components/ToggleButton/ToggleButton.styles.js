// @flow

import styled, { css } from "styled-components";

import type { ComponentType } from "react";


export const Container: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `govuk-body govuk-!-margin-bottom-0 ${className}`,
            ...props
        }))`
            display: flex;
            max-width: max-content;
            border: 1px solid #1d70b8;  // primary colour
            color: #1d70b8;
            border-radius: 3px;
        `;


export const Button: ComponentType<*> =
    styled
        .button
        .attrs(({ ...props }) => ({ type: "button", ...props }))`
            display: inline-flex;
            background: transparent;
            padding: .1rem .4rem;
            border-right: 1px solid #1d70b8;
            cursor: pointer;
            
            &:first-of-type {
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
            }
            
            &:last-of-type {
                border-right: none;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }
            
            &:hover {
                background-color:  ${ css`${ ({ active }) => active ? "#1d70b8" : "#E5E5E4FF" }` } !important; 
            }
            
            &:focus,
            &:active {
                background-color: ${ css`${ ({ active }) => active ? "#1d70b8" : "#f3f2f1" }` } !important;
                outline: none !important;
                border-bottom-color: initial !important;
                box-shadow: unset !important;
                text-decoration: none !important;
            }
            
            ${ css`${ 
                ({ active }) => (!active ? {} : {
                    background: "#1d70b8",
                    color: "#f3f2f1",
                    fontWeight: "bold"
                }) 
            }` }
        `;
