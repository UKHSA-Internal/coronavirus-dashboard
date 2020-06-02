// @flow

import React, { useState } from "react";

import {
    MainContainer,
    TabsContainer,
    Body,
    Tab
} from "./TabLink.styles";

import type { React$Node } from "react";
import type {
    TabLinkContainerProps,
    TabLinkProps
} from "./TabLink.types";


// This is a pseudo-component created to make the implementation of
// containers easier and more consistent.
export const TabLink = function ({ label, children }: TabLinkProps) {

    return this

}  // TabLink


export const TabLinkContainer = ({ children }: TabLinkContainerProps): React$Node => {

    if ( !(children?.length ?? 0) )
        throw new Error(`Component "TabLinkContainer" must have at least two children (of type "TabLink").`);

    const [ current, setCurrent ] = useState(children[0].props.label);

    return <MainContainer>
        <TabsContainer>{
            children.map(({ props: { label } }, index) =>
                <Tab type={ "link" }
                     key={ `${label}-${index}` }
                     style={{ color: "blue" }}
                     onClick={ () => setCurrent(label)  }>{ label }</Tab>
            )
        }</TabsContainer>
        <Body>{
            children.reduce((acc, { props: { label, children } }) =>
                label === current ? children : acc, null
            )
        }</Body>
    </MainContainer>

};  // TabLinkContainer
