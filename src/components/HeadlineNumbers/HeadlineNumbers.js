// @flow

import React from "react";

import type { Props } from "./HeadlineNumbers.types";
import ValueBox from "components/ValueBox";

import { Container } from "./HeadlineNumbers.styles";

import { ComponentType } from "react";


const HeadlineNumbers: ComponentType<Props> = ({ params, headlineNumbers=[] }) => {

    return <Container aria-label={ "Headline numbers" }
                      aria-describedby={ 'headline-nums-desc' }>
        <span id={ 'headline-nums-desc' } className={ "govuk-visually-hidden" }>
            Latest available data
        </span>
        {
            headlineNumbers?.map((item, index) =>
                <ValueBox params={ params }
                          key={ `headline-number-${ index }` }
                          heading={ item.caption }
                          { ...item }/>
            ) ?? null
        }
    </Container>

}; // HeadlineNumbers


export default HeadlineNumbers;
