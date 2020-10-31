// @flow

import styled, { css } from "styled-components";

import type { ComponentType } from "react";
import Magnifier from "assets/icon-magnify.svg";


// export const MapContainer: ComponentType<*> =
//     styled.div`
//         position: absolute;
//         border: 1px solid black;
//         height: 75vh;
//         margin: 0;
//     `;

export const MapContainer: ComponentType<*> =
    styled
        .div`
            position: relative;
            width: 100%;
            height: 75vh;
            
            #map {
                height: 75vh;
                width: 100%;
                border: 1px solid black;
            }
        `;


export const SliderContainer: ComponentType<*> =
    styled
    .div`
    font-family: "GDS Transport", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.9);
    padding: 0;
    left: 0;
    top: 0;
    
    input[type=range] {
      width: 100%;
      margin: 7.7px 0;
      background: linear-gradient(to right, #12407F 0%, #12407F 100%, #fff 50%, #fff 100%);
      border-radius: 6px;
      -webkit-appearance: none;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      border: 1px solid #000101;
      border-radius: 6px;
      width: 100%;
      height: 12.6px;
      cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      margin-top: -8.6px;
      width: 28px;
      height: 28px;
      background: #2067ab;
      border: 3px solid #ffffff;
      border-radius: 100px;
      cursor: pointer;
      -webkit-appearance: none;
    }
    input[type=range]::-moz-range-track {
      border: 1px solid #000101;
      border-radius: 6px;
      width: 100%;
      height: 12.6px;
      cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
      width: 28px;
      height: 28px;
      background: #2067ab;
      border: 3px solid #ffffff;
      border-radius: 100px;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      background: transparent;
      border-color: transparent;
      border-width: 7.7px 0;
      color: transparent;
      width: 100%;
      height: 12.6px;
      cursor: pointer;
    }
    input[type=range]::-ms-fill-lower {
      border: 1px solid #000101;
      border-radius: 12px;
    }
    input[type=range]::-ms-fill-upper {
      border: 1px solid #000101;
      border-radius: 12px;
    }
    input[type=range]::-ms-thumb {
      width: 28px;
      height: 28px;
      background: #2067ab;
      border: 3px solid #ffffff;
      border-radius: 100px;
      cursor: pointer;
      margin-top: 0px;
      /*Needed to keep the Edge thumb centred*/
    }
    /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
    how to remove the virtical space around the range input in IE*/
    @supports (-ms-ime-align:auto) {
      /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
      input[type=range] {
        margin: 0;
        /*Edge starts the margin from the thumb, not the track as other browsers do*/
      }
    }

    &>label {
        margin-bottom: 0.5rem;
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
        `;