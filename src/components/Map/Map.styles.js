// @flow

import styled from "styled-components";

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
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.9);
    padding: 0.5rem 0;
    left: 0;
    top: 0;
    
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
    `;


export const MapToolbox: ComponentType<*> =
    styled.legend`
    font-family: "GDS Transport", Arial, sans-serif;
    position: absolute;
    background: rgba(255,255,255,0.9);
    border: 2px solid black;
    padding: 0.5rem;
    margin: 10px 10px;
    bottom: 0;
    left: 0;
    
    &>h2 {
        margin-top: 0;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: .9rem;
        display: block;
        font-weight: normal;
    }
    `;


export const NumberBox: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    margin-right: 1rem;
    &>h3 {
        margin: 0;
        font-size: 0.9rem !important;
        color: #636A6D;
    }
    
    &>p {
        margin-top: 0;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: .9rem;
        display: block;
        font-weight: normal;
    }
    `;


export const NumbersContainer: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    display: flex;
    flex-direction: row;
    `;