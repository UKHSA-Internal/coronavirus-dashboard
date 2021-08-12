// @flow

import React from "react";

import Icon from "assets/feed.svg"

import type { ComponentType } from "react";

import { Container } from "./Feed.styles";


const Button: ComponentType<*> = ({ type, url }) => {

    return <Container href={ url }>
        <img src={ Icon } height={ "15" }/>
        <span className={ "govuk-!-margin-left-1" }>{ type }</span>
    </Container>

}; // Button


export default Button;
