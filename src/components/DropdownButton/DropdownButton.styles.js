import React from "react";

import styled from "styled-components";
import DownloadIcon from "assets/icon-share.svg";

import type { ComponentType } from "react";


export const DropdownContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `dropdown-container ${className}`,
            ...props
        }))`
            min-width: 100px;
            float: right;
        `;


export const OptionsContainer :ComponentType<*> =
    styled
        .div`
            display: flex;
            flex: 1 0 100px;
            flex-direction: column;
            position: absolute;
            z-index: 999999999;
            float: right;
            margin-top: 14px;
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
            width: 34px;
            height: 34px;
            display: inline-block;
            position: relative;
            cursor: pointer;
            margin: -20px;
            float: right;
            border-left: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
            background-color: #f1f1f1;
            transition: all .3s;
            
            &.open,
            &:hover,
            &:active {
                background-color: #e1e1e1;
            }
            
            &:focus {
                background-colour: #ffdd00 !important;
            }
        `,
        Node = styled.button`
            width: 34px;
            height: 34px;
            padding: 2px 3px;
            outline: none;
            cursor: pointer;
            display: flex;
            // float: right;
            margin-right: 1px;
            background: url("${ DownloadIcon }");
            background-repeat: no-repeat;
            background-size: 30px 30px;
            background-position: center center;
                        
            &:focus {
                background-color: #ffdd00;
            }
        `;

    return ({ children, ...props }) => <Container>
        <Node role={ "button" } { ...props }>
            { children }
        </Node>
    </Container>

})();
