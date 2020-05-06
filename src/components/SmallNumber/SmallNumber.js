import React, { Component } from "react";
import * as Styles from "./SmallNumber.styles";
import numeral from "numeral";


export const SmallNumberContainer: Component<Props> = ({ heading, caption="", children }) => {

    return <Styles.MainContainer>
        {
            caption
                ? <Styles.HeadingCaption className={ "govuk-caption-l" }>
                    { caption }
                </Styles.HeadingCaption>
                : null
        }
        <Styles.Heading className={ "govuk-heading-l" }>{ heading }</Styles.Heading>
        <Styles.Children>{ children }</Styles.Children>
    </Styles.MainContainer>

}; // SmallNumberContainer

export const SmallNumber: Component<Props> = ({ caption, number }) => {

    return <Styles.Container>
      <Styles.Caption className={ "govuk-caption-m" }>{ caption }</Styles.Caption>
      <Styles.Number className={ "govuk-heading-m" }>{numeral(number).format('0,0')}</Styles.Number>
    </Styles.Container>

}; // SmallNumber
