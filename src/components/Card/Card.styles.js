// @flow

import React from "react";
import styled from 'styled-components';

import type { ComponentType } from 'react';
import DownloadIcon from "assets/arrow.svg";


export const HalfCard: ComponentType<*> =
    styled
        .div`
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
            
            @media only screen and (max-width: 768px) {
                margin-top: 1rem;
            }
        `;


export const HalfCardHeader: ComponentType<*> =
    styled
        .header
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-!-padding-bottom-2`
        }))`
            display: flex;
            justify-content: space-between !important;
            align-items: center !important;
            
            @media only screen and (max-width: 768px) {
                flex-direction: column;
                padding-right: 0;
                width: 85%;
                margin-right: 1rem;
                align-items: start !important;
            }
        `;


export const HalfCardHeading: ComponentType<*> =

    styled
        .h2
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-heading-m govuk-!-margin-bottom-0`
        }))`
            @media only screen and (max-width: 1074px) {
                margin-bottom: 1rem;
            }
        `;


export const HalfCardSplitBody: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-wrap: wrap !important;
            margin: 0 -15px;
        `;


export const FullCard: ComponentType<*> =
    styled
        .article`
            flex: 1 0 60%;
            padding: 20px;
            border: 1px #f3f2f1 solid;
            margin-top: 30px;
            background-color: #f8f8f8;
            min-height: 450px;
            
            &:first-of-type {
                margin-top: 0;
            }
            
            @media only screen and (max-width: 768px) {
                margin-top: 1rem;
            }
        `;


export const Caption: ComponentType<*> =
    styled
        .span
        .attrs(({ className="" }) => ({
            className: `${ className } govuk-caption-m`
        }))``;


export const BodySection: ComponentType<*> =
    styled
        .div`
            flex: 1 1 43%;
            margin: 0 15px;
            
            &:nth-child(2n) {
                @media only screen and (max-width: 550px) {
                    flex: 1 1 100%;
                    margin-top: 2rem;
                }
            }
        `;


export const HBodySection: ComponentType<*> =
    styled
        .section`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 1rem 0 0 0;
            
            & > * {
                margin-right: 2rem;
                margin-bottom: 0;
            }
        `;


export const MixedCardContainer: ComponentType<*> =
    styled
        .section`
            display: flex;
            flex-wrap: wrap;
            
            justify-items: space-between;
        `;


export const DefaultTag: ComponentType<*> =
    styled
        .strong
        .attrs(({ className="", ...props }) => ({
            className: `${className} govuk-tag`,
            ...props
        }))`
            margin-left: 1rem;
        `;

        export const InternalLink: ComponentType<*> = (() => {
            const
                Container = styled.span`
                    width: 34px;
                    height: 34px;
                    display: inline-block;
                    position: relative;
                    cursor: pointer;
                    margin-left: 10px;
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
        