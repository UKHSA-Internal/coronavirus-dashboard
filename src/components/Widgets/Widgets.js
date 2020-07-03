import React from "react";

import { NotAvailable as NA } from "widgets.styles";


export const NotAvailable = () =>
    <NA data-tip={ "Data not available" }
                  data-for={ "table-tooltip-text" }>
        N/A
        <span className={ "govuk-visually-hidden" }>
            Data not available
        </span>
    </NA>; // NA
