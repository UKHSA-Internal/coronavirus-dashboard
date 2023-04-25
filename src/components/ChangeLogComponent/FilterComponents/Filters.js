// @flow

import React, { useState } from "react";
import { TriangleMarker, TitleButton } from "components/DashboardHeader/DashboardHeader.styles";
import { TextSearch } from "./TextSearch";
import { DateSearch } from "./DateSearch";
import { TypeSearch } from "./TypeSearch";
import { CategorySearch } from "./CategorySearch";
import { Link } from "react-router-dom";
import type { ComponentType } from "react";
import useResponsiveLayout from "hooks/useResponsiveLayout";


const Heading: ComponentType<*> = ({ layout, setIsOpen, isOpen }) => {

    if ( layout === "desktop" ) {
        return <h2 className={ "govuk-visually-hidden" }>Filters</h2>;
    }

    return <h2 className={ "govuk-heading-m govuk-!-margin-0" }
               style={{ display: "flex", alignItems: "center" }}>
        <TitleButton onClick={ () => setIsOpen(prev => !prev) }>
            Filter records&nbsp;<TriangleMarker direction={ isOpen ? "up" : "down" }
                                                style={{ marginTop: 1 }}/>
        </TitleButton>
    </h2>;

};  // Heading


const ChangeLogFilters: ComponentType<*> = ({ children }) => {

    const layout = useResponsiveLayout(1000);
    const [isOpen, setIsOpen] = useState(layout === "desktop");

    return <>
        { children }
        <Heading layout={ layout } isOpen={ isOpen } setIsOpen={ setIsOpen }/>
        {
            !isOpen
                ? null
                : <>
                    <p className={ "govuk-visually-hidden" }>Use these options to filter the logs.</p>
                    <TextSearch/>
                    <div style={ { display: "grid", gridGap: "1rem" } }>
                        <DateSearch key={new Date().getTime()}/>
                        <TypeSearch/>
                        <CategorySearch/>
                    </div>
                    <Link to={ "/details/whats-new" }
                          style={ { maxWidth: "200px" } }
                          className={ "govuk-button govuk-button--secondary govuk-!-margin-top-2" }>
                        Reset filters
                    </Link>
                </>
        }
    </>;

};  // PageComponent


export default ChangeLogFilters;
