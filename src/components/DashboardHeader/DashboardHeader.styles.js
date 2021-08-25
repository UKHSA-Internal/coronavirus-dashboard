// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> =
    styled
        .div
        .attrs(({ className="", ...props }) => ({
            className: `sticky-header govuk-!-padding-top-3 ${className}`,
            ...props
        }))`
          background-color: rgba(255, 255, 255, 0.95);
          z-index: 999999;
        `;


export const HeaderContainer: ComponentType<*> =
    styled
        .div`
            display: flex;
            justify-content: space-between;
        `;


export const TitleButton: ComponentType<*> =
    styled
        .button
        .attrs(() => ({
            role: 'button',
            htmlType: 'button',
            'aria-label': 'Click to change location'
        }))` 
            display: inline-flex;
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            padding-right: 20px;
            padding-left: 0;
            margin-left: 5px;
            background-position: center right;
            color: #1d70b8;
            text-decoration: none;
            align-items: center;
            &:hover, 
            &:active {
                color: #003078
            }
        `;


export const Title: ComponentType<*> =
    styled
        .h1
        .attrs(({ className }) => ({
            className: `govuk-heading-m govuk-!-margin-0 ${ className }`
        }))`
            font-size: 1.65rem;
            @media only screen and (max-width: 768px) {
                font-size: 1.15rem;
            }
        `;


export const CurrentLocation: ComponentType<*> =
    styled
        .span`
          font-weight: normal;
        `;


export const CollapsibleLinkContainer: ComponentType<*> =
  styled
      .div`
          display: flex;
          flex-wrap: wrap;
      `;


export const TriangleMarker: ComponentType<*> =
    styled
        .div
        .attrs(({ ...props }) => ({
            "aria-hidden": true,
            ...props
        }))`
            width: 0; 
            height: 0; 
            border-top: 7px solid transparent; 
            border-right: 10px solid; 
            border-bottom: 7px solid transparent;
            margin-top: 5px;
            margin-left: .3rem;
            &:hover, 
            &:active {
                color: #003078
            }
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


export const SectionBreak: ComponentType<*> =
    styled
        .hr
        .attrs(({ className="", ...props }) => ({
           className: `govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible ${className}`,
           ...props
       }))``;


export const LocalisationForm = styled.form`
    padding: 0 1rem;
    
    @media only screen and (max-width: 768px) {
        padding: 0;
    }
`;


export const LocalisationFormInputs = styled.div`
    display: flex !important;
    align-items: flex-end;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        
        & > * {
            padding: 0;
            margin-top: 1rem;
        }
    }
`;