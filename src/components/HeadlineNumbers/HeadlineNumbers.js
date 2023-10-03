// @flow

import React from "react";

import { getParamValueFor, isAreaIncluded } from "common/utils";

import type { Props } from "./HeadlineNumbers.types";
import ValueBox from "components/ValueBox";

import { Container } from "./HeadlineNumbers.styles";

import type { ComponentType } from "react";


const HeadlineNumbers: ComponentType<Props> = ({ params, headlineNumbers=[] }) => {

    const getValueBox = (item, index) => {
        return <>
            {
                isAreaIncluded({params, ...item})
                    ? <ValueBox params={ params }
                                key={ `headline-number-${ index }` }
                                heading={ item.caption }
                                { ...item }/>
                    : null
            }
        </>
    }

    console.log("headline numbers:", headlineNumbers)

    return <Container aria-label={ "Headline numbers" }
                      aria-describedby={ 'headline-nums-desc' }>
        <span id={ 'headline-nums-desc' } className={ "govuk-visually-hidden" }>
            Latest available data
        </span>
        {
            headlineNumbers?.map((item, index) => getValueBox(item, index)) ?? null
        }
    </Container>

}; // HeadlineNumbers


export default HeadlineNumbers;
