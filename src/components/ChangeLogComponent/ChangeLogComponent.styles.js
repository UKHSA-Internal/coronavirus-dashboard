
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';
import Magnifier from "assets/icon-magnify.svg";


export const Markdown: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", element=null, ...props }) => ({
            className: `markdown ${className}`,
            ...props
        }))`
            & > * {
                margin-left: 0;
                margin-right: 0;
            }
            
            & ul {
                list-style: disc inside;
            }
        `;


const calcColour = ({color}) => {
    return color ? color : '#000000';
};

        
const calcBgColour = ({bgColor}) => {
    return bgColor ? bgColor : 'inherit';
};


export const Category: ComponentType<*> =
    styled
    .span
    .attrs(({ color="", bgColor="", className="", standAlone }) => ({
        color,
        bgColor,
        className: `${className} ${ standAlone ? "govuk-!-font-size-16" : "govuk-!-font-size-14" }`
    }))`
        padding: 2px 5px;
        margin-right: 5px;
        font-weight: 600;
        text-transform: uppercase;
        color: ${calcColour};
        background-color: ${calcBgColour};
    `;

export const CategoryContainer: ComponentType<*> =
    styled
    .div`
        display: ${ css`${ ({ standAlone }) => standAlone ? "flex" : "inline-flex" }` };
        justify-self: start;
        margin-right: ${ css`${ ({ standAlone }) => standAlone ? "auto" : "0.5rem" }` };
        margin-bottom: ${ css`${ ({ standAlone }) => standAlone ? "1rem" : "0" }` };
    `;


export const Container: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `${className} govuk-body`,
            ...props
        }))`
            display: flex;
            flex-direction: row;
            column-gap: 1rem;
            
            @media only screen and (max-width: 1000px) {
                flex-direction: column-reverse;
            }
        `;


export const MainContent: ComponentType<*> =
    styled
        .section`
            flex-grow: 1;
            display: grid;
            border-top: 2px solid #b1b4b6;
            margin-top: 2rem;
            grid-column: 1/-1;
            align-content: start;
            margin-right: auto;
            max-width: 50em;
            
            @media only screen and (max-width: 1000px) {
                margin-right: 0;
            }
            
            &.no-border {
                border-top: unset;
                margin-top: 1rem;
            }
        `;


export const SideContent: ComponentType<*> =
    styled
        .section`
            min-width: max(30%, 280px);
            display: grid;
            grid-column: 1/-1;
            // border-top: 2px solid #1d70b8;
            margin-top: 1rem;
            align-content: start;
            grid-gap: 1rem;
            grid-auto-flow: row;
            grid-template-column: auto;
            
            & form {
                padding-right: 0 !important;
            }
            
            & input[type="submit"] {
                background: #000;
                background-image: url(${Magnifier});
                background-repeat: no-repeat;
                background-size: 70% 70%;
                background-position: center center;
                width: 45px;
                height: 38px;
                margin-left: 2px;  
            }
    
            @media only screen and (max-width: 1000px) {
                min-width: unset;
                width: auto;
            }
            
            @media only screen and (min-width: 800px) {
                grid-column: 3/-1;
            }
            @media only screen and (min-width: 1100px) {
                grid-column: 3/-1;
            }
        `;


export const FeedContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            justify-content: flex-end;
            
            & > a:not(a:first-of-type) {
                margin-left: 1rem;
            }
        `;


export const MonthlyGroup: ComponentType<*> =
    styled
        .li`
            margin-top: 30px;
            border-top: 1px solid #e1e1e1;
            
            &:first-of-type {
                border-top: none;
            }
            
            & > * {
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
            
            & .markdown {
                margin-left: 0;
                margin-right: 0;
            }
        `;


export const MonthlyHeader: ComponentType<*> =
    styled
        .header`
            margin-top: 30px;
        `;


export const ChangeLogBannerContainer: ComponentType<*> =
    styled
        .div`
            margin-top: -10px;
        `;


export const ChangeLogBanner: ComponentType<*> =
    styled
        .div`
            display: grid;
            padding: 0.7rem;
            justify-content: center;
            background-color: #1d70b8;
            margin-bottom: 1px;
            
            &, & * {
                color: #fff !important;
                line-height: 25px;
            }
        `;


export const ChangeLogBannerTag: ComponentType<*> =
    styled
        .strong
        .attrs(({ className="", ...props }) => ({
            className: `govuk-tag ${className}`,
            ...props
        }))`
            background-color: white;
            background: white;
            color: #1d70b8 !important;
            margin: 0 1rem 0 0;
            line-height: initial;
        `;
