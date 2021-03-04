
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Markdown: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", element=null, ...props }) => ({
            className: `markdown ${className}`,
            ...props
        }))`
            @media only screen and (min-width: 800px) {
                max-width: 85%;
            }
        `;

const calcColour = ({color}) => {
    return color ? color : '#000000';
};
        
const calcBgColour = ({bgColor}) => {
    return bgColor ? bgColor : 'inherit';
};

export const ChangeLogSpan: ComponentType<*> =
    styled
    .span
    .attrs(({ color="", bgColor="", className="" }) => ({
        color,
        bgColor,
        className: `${className} govuk-!-font-size-14`
    }))`
        float: right;
        padding: 2px 5px;
        font-weight: 600;
        color: ${calcColour};
        background-color: ${calcBgColour};
    `;


export const Container: ComponentType<*> =
    styled
        .div`
            width: 100%;
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 1fr;
            
            @media only screen and (min-width: 800px) {
                grid-template-columns: repeat(3, 1fr);
            }
        `;


export const MainContent: ComponentType<*> =
    styled
        .section`
            display: grid;
            border-top: 2px solid #b1b4b6;
            margin-top: 2rem;
            grid-column: 1/-1;

            @media only screen and (min-width: 800px) {
                grid-column: 1/3;
                
                .*-one-half {
                    width: 100%;
                }
            }
            @media only screen and (min-width: 1100px) {
                grid-column: 1/3;
            }
            
            &.no-border {
                border-top: unset;
                margin-top: 1rem;
            }
        `;

export const SideContent: ComponentType<*> =
    styled
        .section`
            display: grid;
            grid-column: 1/-1;
            border-top: 2px solid #1d70b8;
            margin-top: 2rem;
            align-content: start;
            
            @media only screen and (min-width: 800px) {
                grid-column: 3/-1;
            }
            @media only screen and (min-width: 1100px) {
                grid-column: 3/-1;
            }
        `;


export const MonthlyGroup: ComponentType<*> =
    styled
        .article`
            margin-top: 30px;
            border-top: 1px solid #e1e1e1;
            
            &:first-of-type {
                border-top: none;
            }
        `

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
            }
        `;
