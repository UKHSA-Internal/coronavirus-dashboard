// @flow

import React, { useState } from "react";

import {
    Body,
    MainContainer,
    Tab,
    TabsContainer
} from "components/TabLink/TabLink.styles";

import { TablinkBodyContainer } from "../ApiDocs.styles";
import type { ComponentType } from "react";


const LanguageTabs: ComponentType<*> = ({ tabs, content }) => {

    const [ current, setCurrent ] = useState(0);

    return <MainContainer>
            <TabsContainer className={ 'govuk-!-margin-bottom-0' }>{
                tabs.map((label, index) =>
                    <Tab type={ "button" }
                         key={ `${label}-${index}` }
                         role={ "button" }
                         aria-label={ label }
                         className={ `${index === current ? 'active govuk-!-font-weight-bold' : '' }` }
                         onClick={ () => setCurrent(index)  }>
                        <span className={ "govuk-visually-hidden" }>
                            Click to display content
                        </span>
                         { label }
                    </Tab>
                )
            }</TabsContainer>
        <Body height={ "auto" }><TablinkBodyContainer>{ content[current] }</TablinkBodyContainer></Body>
    </MainContainer>

};  // TabLinkContainer


export default LanguageTabs;
