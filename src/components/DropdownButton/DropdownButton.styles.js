import React from "react";

import styled from "styled-components";

import type { ComponentType } from "react";


export const DropdownLabel :ComponentType<*> =
    styled
        .span
        .attrs(({ className="", ...props }) => ({
            ...props,
            className: `${className} govuk-body-s`
        }))`
            float: left;
            margin-left: 5px !important;
            margin-top: 5px;
            margin-bottom: 0;
            font-size: 10pt;
            font-weight: bold;
            color: #1d70b8;
        `;


export const DropdownContainer :ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `dropdown-container ${className}`,
            ...props
        }))`
            display: grid;
            grid-template-rows: auto auto; 
        `;


export const Options :ComponentType<*> =
    styled
        .div`
            display: flex;
            box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.3);
            flex: 1 0 100px;
            flex-direction: column;
            position: absolute;
            z-index: 999999999;
            float: left;
            margin-top: ${ (({ top }) => top - 5 ) }px;
            margin-right: -15px !important;
            min-width: 100px;
            
            &:focus {
                background-colour: #ffdd00;
            }
            
            & > * {
                display: block;
                padding: 8px 8px;
                background-color: #f1f1f1;
                border-top: 1px solid #e5e5e5;
                border-left: 1px solid #e5e5e5;
                border-right: 1px solid #e5e5e5;
                min-width: 100px;
                text-decoration: none;
                text-align: left;
                
                &:active,
                &:focus,
                &:hover {
                    background-color: #e5e5e5;
                    outline: none;
                    box-shadow: none;
                }
                
                &:focus {
                    background-colour: #ffdd00 !important;
                }
                
                &.disabled {
                    background-color: #f1f1f1;
                    color: #c1c1c1;
                    cursor: not-allowed;
                }
                
                &:first-child {
                    border-top-left-radius: 2px;
                    border-top-right-radius: 2px;
                }
                
                &:last-child {
                    border-bottom: 1px solid #e5e5e5;
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                }
            }
            
        `;

export const Launcher: ComponentType<*> = (() => {
    const
        Container = styled.span`
            display: inline-block;
            position: relative;
            cursor: pointer;
            float: left;
            border-right: 1px solid #e1e1e1;
            background-color: #f1f1f1;
            background: linear-gradient(#f8f8f8, #f1f1f1);
            transition: all .3s;
                    
            &.open,
            &:hover,
            &:active {
                background-color: #e1e1e1;
                background: linear-gradient(#e5e5e5, #f8f8f8);
            }
                    
            &:focus {
                background-colour: #ffdd00 !important;
            }
        `,
        Node = styled.button`
            padding: 10px 25px;
            
            outline: none;
            cursor: pointer;
            display: grid;
            grid-template-columns: 24px auto;
            align-content: center;
            align-items: center;
               
            &:focus {
                background-color: #ffdd00;
            }
        `;
        
    return ({ children, icon, ...props }) => <Container>
        <Node role={ "button" } { ...props }>
            <img src={ icon }
                 alt={ "Button icon" }
                 aria-hidden={ true }
                 style={{ minWidth: 20 }}/>
            { children }
        </Node>
    </Container>
        
})();