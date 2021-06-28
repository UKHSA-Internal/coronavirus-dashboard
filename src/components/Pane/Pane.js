// @flow

import React, { useState, useEffect } from "react";
import { groupBy, sort } from "common/utils";
import type { ComponentType } from "react";
import { Column, MainContainer, SelectorLabelContainer, SelectorDescription, SelectorLabel, SelectorContainer } from "./Pane.styles";
import { useLocation} from "react-router";
import { Link } from "react-router-dom";


export const ColumnEntry: ComponentType<*> = ({id, label, description, children, parentPath }) => {

    const { pathname } = useLocation();

    if ( children ) {
        return children
    }

    const active = pathname.indexOf(id) > -1;

    return <SelectorContainer isActive={ active }>
        <Link className={ "govuk-link govuk-link--no-visited-state govuk-link--no-underline " }
              to={ active ? parentPath : `${parentPath}/${id}` }>
            <SelectorLabelContainer>
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


export const PaneColumn: ComponentType<*> = ({ isLast, children }) => {

    return <Column isLast={ isLast }>
        { children }
    </Column>

};


const Pane: ComponentType<*> = ({ basePath, children }) => {

    const groupedChildren = groupBy(
        children.filter(item => item),
            el => el.props.level
    );

    const groups = Object.keys(groupedChildren).sort(sort).reverse();
    const lastGroup = Math.max(...groups).toString();

    return <MainContainer>
        {
            groups.map(level =>
                <PaneColumn key={ `panel-col-${level}` } isLast={ level !== "undefined" && level === lastGroup }>
                    { groupedChildren[level] }
                </PaneColumn>
            )
        }
    </MainContainer>

};  // MetricDocs


export default Pane;
