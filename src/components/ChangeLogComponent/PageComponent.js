// @flow

import React from "react";
import { Container, FeedContainer, MainContent, SideContent } from "./ChangeLogComponent.styles";
import ChangeLogFilters from "./FilterComponents";
import type { ComponentType } from "react";
import Feed from "components/FeedButton"


export const PageComponent: ComponentType<*> = ({ filters=true, feedPath, children }) => {

    return <Container>
        <MainContent className={ "no-border" }>
            { children }
        </MainContent>
        <SideContent>
            <FeedContainer>
                <Feed type={ "Atom 1.0" } url={ `https://api.coronavirus.data.gov.uk/generic/${feedPath}/atom.xml` }/>
                <Feed type={ "RSS 2.0" } url={ `https://api.coronavirus.data.gov.uk/generic/${feedPath}/rss.xml` }/>
            </FeedContainer>
            { filters ? <ChangeLogFilters/> : null }
        </SideContent>
    </Container>;

};  // PageComponent
