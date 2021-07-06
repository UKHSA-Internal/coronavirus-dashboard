// @flow

import React from "react";

import type { ComponentType } from "react";
import { ColumnEntry } from "components/Pane";
import useGenericAPI from "hooks/useGenericAPI";
import { capitalise } from "common/utils";


export const Category: ComponentType<*> = ({ ...props }) => {

    const metricTypeData = useGenericAPI(
        "genericApiMetricProps",
        [],
        {},
        "json",
        {by: "category"}
    );

    return metricTypeData.map((item, index) =>
        <ColumnEntry { ...props } id={ item.category }
                     label={ capitalise(item.category) } key={ `category-${index}` }/>
    );

};  // Category
