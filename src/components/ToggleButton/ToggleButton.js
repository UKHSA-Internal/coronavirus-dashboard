// @flow

import React from "react";

import type { ComponentType } from "react";
import { Button, Container } from "./ToggleButton.styles";


export const ToggleButton: ComponentType<*> = ({ active, ...props }) => {

    return <Button active={ active } { ...props }/>;

};  // Toggle


export const Toggle: ComponentType<*> = ({ children, ...props }) => {

    return <Container { ...props }>{ children }</Container>;

};  // Toggle
