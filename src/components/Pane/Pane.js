// @flow

import React, { useState, useEffect } from "react";
import { groupBy, sort } from "common/utils";
import type { ComponentType } from "react";
import { Column, MainContainer, SelectorLabelContainer, SelectorDescription, SelectorLabel, SelectorContainer } from "./Pane.styles";
import { useLocation} from "react-router";
import { Link } from "react-router-dom";
import useResponsiveLayout from "../../hooks/useResponsiveLayout";


export const ColumnEntry: ComponentType<*> = ({id, label, description, children, parentPath, nextColumn }) => {

    const { pathname } = useLocation();

    if ( children ) {
        return children
    }

    const active = pathname.split("/").indexOf(id) > -1;

    return <SelectorContainer isActive={ active }>
        <Link className={ "govuk-link govuk-link--no-visited-state govuk-link--no-underline " }
              to={ active ? parentPath : `${parentPath}/${id}` }>
            <SelectorLabelContainer isActive={ active }>
                <SelectorLabel isActive={ active }>{ label }</SelectorLabel>
            </SelectorLabelContainer>
            {
                description
                    ? <SelectorDescription isActive={ active }>{ description }</SelectorDescription>
                    : null
            }
        </Link>
    </SelectorContainer>;

};  // ColumnEntry


export const PaneColumn: ComponentType<*> = ({ children }) => {

    return <Column>{ children }</Column>

};  // PaneColumn


const Pane: ComponentType<*> = ({ basePath, children }) => {

    return <MainContainer>{ children }</MainContainer>

};  // MetricDocs


export default Pane;
