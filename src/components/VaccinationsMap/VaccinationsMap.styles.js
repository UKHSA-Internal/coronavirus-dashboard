// @flow

import styled, { css } from "styled-components";

import type { ComponentType } from "react";
import Magnifier from "assets/icon-magnify.svg";


export const MapContainer: ComponentType<*> =
    styled
        .div`
            position: relative;
            height: 75vh;
            
            #map {
                height: 75vh;
                border: 1px solid black;
            }
        `;


export const PostcodeSearchForm: ComponentType<*> =
    styled.form`
    font-family: "GDS Transport", Arial, sans-serif;
    position: absolute;
    display: flex;
    flex-direction: row;
    margin: 10px;
    width: max-content;
    left: 0px;
    top: 0px;
    
    & > input[type="submit"] {
        background: #000;
        background-image: url(${Magnifier});
        background-repeat: no-repeat;
        background-size: 70% 70%;
        background-position: center center;
        width: 45px;
        height: 38px;
        margin-left: 2px;  
    }
    
    & > input[type="text"] {
        text-transform: uppercase;
    }
    `;


export const MapToolbox: ComponentType<*> =
    styled.legend`
    width: 300px;
    font-family: "GDS Transport", Arial, sans-serif;
    position: absolute;
    background: rgba(255,255,255,0.9);
    border: 2px solid black;
    padding: 0.5rem;
    margin: 10px 10px;
    bottom: 0;
    left: 0;
    z-index: 10000000;
    
    &>h2 {
        margin-top: 0;
        margin-bottom: .8rem;
        max-width: 280px;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: 70%;
        display: block;
        font-weight: 800;
    }
    
    &>h3 {
        margin-bottom: .2rem;
        margin-top: .5rem;
        font-weight: 400;
        color: #636A6D;
        max-width: 70%;
    }
    
    @media only screen and (max-width: 600px) {
        max-width: 250px;
    }
    `;


export const NumberBox: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    &>h3 {
        margin: 0;
        color: #636A6D;
        font-weight: 400;
        font-size: 95%;
    }
    
    &>p {
        margin-top: 0;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: 97%;
        display: block;
    }
    
    &>.number-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 3px;
        font-weight: 800;
        
        & > * {
            margin-top: 0 !important;
            margin-right: 1rem;
        }
        
        &>.number {
            font-weight: 800;
            font-size: 125%;
        }
        
        &>.govuk-tag {
            display: flex; 
            flex-direction: row;
            align-items: center; 
            max-width: max-content;
            font-size: 90% !important;
            margin-top: 2px !important;
            
            &.green {
                color: rgb(0,112,60);
                background-color: rgb(0,112,60,.2);;
                background: rgb(0,112,60,.2);;
            }
            
            &.red{
                color: rgb(199,39,8);
                background-color: rgb(199,39,8,.2);
                background: rgb(199,39,8,.2);
            }
        }
    }
    `;


export const NumbersContainer: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    `;


export const IndicatorLegend: ComponentType<*> =
    styled
        .div
        .attrs(({ className="" }) => ({
            className: `govuk-body-xs ${className}`
        }))`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: #636A6D;
            margin: 0;
            
            & > code {
                word-wrap: wrap;
            }
        `;


export const SliderContainer: ComponentType<*> =
    styled
        .div`
            position: absolute; 
            height: 100%;
            transform: translateX(-50%);
            pointerEvents: all;
            border: 1px solid black;
            ${css`${({ active, focused, portrait }) => ({ 
                backgroundColor: active && !focused ? "#1d70b8": focused ? "yellow" : "white",
                color: active && !focused ? "#1d70b8": focused ? "yellow" :  "white",
                // borderColor: active && !focused ? "#1d70b8": focused ? "yellow" :  "black",
                boxShadow: active && !focused ? "#1d70b8 0 0 7px": focused ? "yellow 0 0 7px" : "white 0 0 3px",
                height: portrait ? "2px" : "100%",
                width: portrait ? "100%" : "3px"
            })}`}
        `;


export const SliderRoot: ComponentType<*> =
    styled
        .div`
            display: flex; 
            // flex-direction: column; 
            align-items: center;
            justify-content: center;
            // place-items: center; 
            cursor: ew-resize; 
            pointer-events: none; 
            // background-color: white;
            border: 1px solid;
            height: 100%;

        `;

export const SliderLine: ComponentType<*> =
    styled
        .div`
            flex-grow: 1; 
        `;

export const SliderButton: ComponentType<*> =
    styled
        .div`
            display: grid;
            position: absolute;
            top: 65px;
            align-self: center;
            grid-auto-flow: column; 
            gap: 12px;
            // place-content: center;
            align-items: center;
            flex-shrink: 0; 
            width: max-content;
            height: 27px;
            border-radius: 5px;
            border: 1px solid white;
            pointer-events: auto;
            backdrop-filter: blur(2px);
            box-shadow: rgba(0, 0, 0, 0.35) 0 0 7px;
            z-index: 9999999;
            ${css`${({ active, focused, portrait }) => ({ 
                background: active && !focused ? "#1d70b8": focused ? "yellow" : "rgba(0, 0, 0, .8)",
                color: active && !focused ? "white": focused ? "black" : "white"
            })}`}
        `;


export const TriangleMarker: ComponentType<*> =
    styled
        .div`
            width: 0; 
            height: 0; 
            border-top: 8px solid transparent; 
            border-right: 10px solid; 
            border-bottom: 8px solid transparent;
            ${css`${({ direction, active, focused }) => ({ 
                transform: 
                    direction === "up" 
                        ? "rotate(90deg)"
                        : direction === "down"
                        ? "rotate(-90deg)"
                        : direction === "right"
                        ? "rotate(180deg)"
                        : "rotate(0)"
            })}`}
        `;


export const ZoomControlContainer: ComponentType<*> =
    styled
        .div`
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: center;
            width: 30px;
            height: 60px;
            
            & > button {
                border-radius: 3px;
                
                &:first-of-type {
                    box-shadow: 0px -1px 0px 2px #acb0b3;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                }
                &:last-of-type {
                    border-top-right-radius: 0;
                    border-top-left-radius: 0;
                    box-shadow: 0px 1px 0px 2px #acb0b3;

                    border-top: none;
                }
            }
        `;


export const ZoomButton: ComponentType<*> =
    styled
        .button
        .attrs(({ ...props }) => ({ type: "button", ...props }))`
            flex-grow: 1;
            width: 100%;
            font-weight: bold;
            background: white;
            cursor: pointer;
        `;


// export const LeftMarker: ComponentType<*> =
//     styled
//         .span`
//             background: rgba(0,0,0,.8);
//             top: 65px;
//             position: absolute;
//             right: 25px;
//             padding: .3rem .6rem .3rem .5rem;
//             border-bottom-left-radius: 8px;
//             border-top-left-radius: 8px;
//             font-size: small;
//             white-space: nowrap;
//             color: white;
//             z-index: 1;
//             font-weight: bold;
//             box-shadow: #485052 0 0 10px;
//             border: 1px solid white;
//             backdrop-filter: blur(2px);
//         `;
//
// export const RightMarker: ComponentType<*> =
//     styled
//         .span`
//             background: rgba(0,0,0,.8);
//             position: absolute;
//             top: 65px;
//             left: 28px;
//             padding: .3rem .5rem .3rem .5rem;
//             border-bottom-right-radius: 8px;
//             border-top-right-radius: 8px;
//             font-size: small;
//             white-space: nowrap;
//             color: white;
//             z-index: 1;
//             font-weight: bold;
//             box-shadow: #485052 0 0 10px;
//             border: 1px solid white;
//             backdrop-filter: blur(2px);
//         `;

export const SlideMarker: ComponentType<*> =
    styled
        .span`
            width: 58px;
            font-size: small;
            padding: .3rem .5rem .3rem .5rem;
            font-weight: bold;
        `;
