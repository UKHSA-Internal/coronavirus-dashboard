// @flow

import React from "react";
import { Container, MainContent } from "./ChangeLogComponent.styles";
import BrowserHistory from "../BrowserHistory";
import ChangeLogFilters from "./FilterComponents";
import type { ComponentType } from "react";


export const PageComponent: ComponentType<*> = ({ children }) => {

    return <Container>
        <BrowserHistory>
            <MainContent className={ "no-border" }>
                <p>
                    We regularly update the dashboard with new data and features.
                    Here is a timeline of changes.
                </p>
                <div className={ "govuk-!-margin-top-1" }>{ children }</div>
            </MainContent>
        </BrowserHistory>
        <ChangeLogFilters/>
    </Container>

};  // PageComponent
