// @flow

import React from "react";

import type { Props } from "./HeadlineNumbers.types";
import ValueBox from "components/ValueBox";

import { ComponentType } from "react";


const HeadlineNumbers: ComponentType<Props> = ({ params, headlineNumbers=[] }) => {

    return headlineNumbers?.map((item, index) =>
            <ValueBox params={ params }
                      key={ `headline-number-${index}` }
                      heading={ item.caption }
                      { ...item }/>
        ) ?? null

}; // HeadlineNumbers


export default HeadlineNumbers;
