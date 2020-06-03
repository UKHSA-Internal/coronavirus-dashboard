// @flow

import React, { useState } from "react";

import {
    MainContainer,
    TabsContainer,
    Tab,
    Body
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

    return <MainContainer className={ "util-flex util-flex-col" }>
        <TabsContainer className={ "util-flex util-flex-wrap util-flex-align-items-start govuk-!-margin-bottom-6" }>{
            children.map(({ props: { label } }, index) =>
            <Tab type={ "link" }
                key={ `${label}-${index}` }
                className={`govuk-link govuk-!-font-size-19 govuk-!-margin-right-7 ${label === current ? 'active govuk-!-font-weight-bold' : '' }`}
                onClick={ () => setCurrent(label)  }>
                { label }
            </Tab>
            )
        }</TabsContainer>
        {
            children.map(({ props: { label, children } }, index) =>
                <Body
                    key={ `${label}-child-${index}` }
                    className={ label === current ? null : 'inactive' }
                >{ children }</Body>
            )
        }
    </MainContainer>

};  // TabLinkContainer
