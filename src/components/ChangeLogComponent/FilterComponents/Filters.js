// @flow

import React from "react";
import { SideContent } from "../ChangeLogComponent.styles";
import { TextSearch } from "./TextSearch";
import { DateSearch } from "./DateSearch";
import { TypeSearch } from "./TypeSearch";
import { CategorySearch } from "./CategorySearch";
import { Link } from "react-router-dom";
import type { ComponentType } from "react";


const ChangeLogFilters: ComponentType<*> = ({ children }) => {

    return <SideContent>
        <h2 className={ "govuk-visually-hidden" }>Filters</h2>
        <p className={ "govuk-visually-hidden" }>Use these options to filter the logs.</p>
        <TextSearch/>
        <div style={{ display: "grid", gridGap: "1rem" }}>
            <DateSearch/>
            <TypeSearch/>
            <CategorySearch/>
        </div>
        <hr/>
        <Link to={ "/details/whats-new" }
              style={{ width: "40%" }}
              className={ "govuk-button govuk-button--secondary" }>
            Reset filters
        </Link>
    </SideContent>;

};  // PageComponent


export default ChangeLogFilters;
