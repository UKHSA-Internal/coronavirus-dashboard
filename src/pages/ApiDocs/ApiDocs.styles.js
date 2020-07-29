// @flow

import styled from "styled-components";

import type { ComponentType } from "react";



export const Container: ComponentType<*> =
    styled
        .div
        .attrs(({ className }) => ({
            className: `govuk-body ${ className }`
        }))`
            max-width: 40em;
        `;
