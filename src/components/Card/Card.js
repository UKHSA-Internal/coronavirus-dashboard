// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';
import { Link } from "react-router-dom";

import ModalTooltip from "components/Modal";

import type { Props, ValueItemType } from './Card.types';
import {
    HalfCard,
    HalfCardHeader,
    HalfCardHeading,
    HalfCardSplitBody,
    FullCard,
    FullCardHeader,
    FullCardHeading,
    Caption,
    BodySection,
    SectionBreak,
    DataContainer,
    DataColour,
    Heading,
    DataNumbersContainer,
    NumericData,
    DataLabel,
    Number,
    HBodySection
} from './Card.styles';
import numeral from 'numeral'
import ReactTooltip from "react-tooltip";
import { colours, strFormat } from "common/utils";
import useApi from "hooks/useApi";
import moment from "moment";


const VisualSection: ComponentType<Props> = ({ children }: Props) => {

    return <BodySection>
        { children }
    </BodySection>

}; // Visuals


const NumericReports: ComponentType<Props> = ({ children, horizontal=false }: Props) => {

    if ( horizontal )
        return <HBodySection>{ children }</HBodySection>;

    return <BodySection>{ children }</BodySection>

}; // ValueItemContainer


const ValueBox = ({ params, primaryValue, secondaryValue=null, primaryTooltip="", secondaryTooltip="", ...rest }) => {

    const
        defaultResponse = [ { date: null, value: null } ],
        getApiArgs = varName => ({
            conjunctiveFilters: params,
            extraParams: [
                { key: "latestBy", sign: "=", value: varName }
            ],
            structure: {
                date: "date",
                value: varName
            },
            defaultResponse: defaultResponse
        }),
        primaryData = useApi(getApiArgs(primaryValue)),
        secondaryData = useApi(
            secondaryValue
                ? getApiArgs(secondaryValue)
                : {conjunctiveFilters: [], defaultResponse: defaultResponse}
        ),
        primaryReplacements = {
            kwargs: {
                ...(primaryData?.[0] ?? {} ),
                date: moment(primaryData?.[0]?.date ?? null).format("dddd, D MMMM YYYY")
            }
        },
        secondaryReplacements = {
            kwargs: {
                ...(secondaryData?.[0] ?? {} ),
                date: moment(secondaryData?.[0]?.date ?? null).format("dddd, D MMMM YYYY")
            }
        };

    return <ValueItem primaryValue={ primaryData?.[0]?.value }
                      primaryTooltip={ strFormat(primaryTooltip, primaryReplacements) }
                      primaryModal={ primaryValue }
                      primaryModalReplacements={ primaryReplacements }
                      secondaryValue={ secondaryData?.[0]?.value }
                      secondaryTooltip={ strFormat(secondaryTooltip, secondaryReplacements) }
                      secondaryModal={ secondaryValue }
                      secondaryModalReplacements={ secondaryReplacements }
                      { ...rest }/>

};  // getValueItemSections


const ValueItem: ComponentType<ValueItemType> = ({ ...props }: ValueItemType) => {

    const
        {
            caption, primaryLabel, primaryValue, primaryModal=null, primaryTooltip=null,
            primarySign=null, primaryModalReplacements={},

            secondaryLabel=null, secondaryValue=null, secondaryModal=null,
            secondaryTooltip=null, secondarySign=null, secondaryModalReplacements={},

            chart={}, isEnabled=true, setChartState=() => null
        } = props,
        tipId = encodeURI(props.primaryLabel);

    return <DataContainer>
        {
            ( chart?.colour ?? false ) &&
            <DataColour role={ "button" }
                        data-for={ tipId }
                        data-tip={
                            `Click to ${ isEnabled ? "hide" : "show" } 
                            the "${ caption.toLowerCase() }" on the graph.`
                        }
                        onClick={ setChartState }
                        colour={ isEnabled ? (colours?.[chart.colour] ?? "") : "none" } />
        }
        <Heading>{ caption }</Heading>
        <DataNumbersContainer>
            <NumericData>
                { primaryLabel && <DataLabel>{ primaryLabel }</DataLabel> }
                <Number>
                    <ModalTooltip data-tip={ primaryTooltip }
                                  data-for={ tipId }
                                  markdownPath={ primaryModal }
                                  replacements={ primaryModalReplacements }>
                        { numeral(primaryValue).format("0,0") }{ primarySign }
                        <p className={ "govuk-visually-hidden" }>
                            Abstract information on { primaryLabel }: { primaryTooltip }<br/>
                            Click for additional details.
                        </p>
                    </ModalTooltip>
                </Number>
            </NumericData>

        {
            secondaryLabel
                ? <NumericData>
                    { secondaryLabel && <DataLabel>{ secondaryLabel }</DataLabel> }
                    <Number>
                        <ModalTooltip
                            data-tip={ secondaryTooltip }
                            data-for={ tipId }
                            markdownPath={ secondaryModal }
                            replacements={ secondaryModalReplacements }
                        >
                            { numeral(secondaryValue).format("0,0") }{ secondarySign }
                            <p className={ "govuk-visually-hidden" }>
                                Abstract information on { secondaryLabel }: { secondaryTooltip }<br/>
                                Click for additional details.
                            </p>
                        </ModalTooltip>
                    </Number>
                </NumericData>
                : null
        }
        </DataNumbersContainer>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </DataContainer>

}; // ValueItem


const CardHeader: ComponentType<*> = ({ heading, caption="", fullWidth=false, linkToHeading=false, children }: Props) => {

    // if ( !fullWidth )
        return <HalfCardHeader>
            <HalfCardHeading>
                <Caption>{ caption }</Caption>
                { heading }
            </HalfCardHeading>
            {
                linkToHeading &&
                <Link to={ heading.toLowerCase() }
                      className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state" }>
                    { linkToHeading }
                </Link>
            }
            { children }
        </HalfCardHeader>;

    // return <FullCardHeader>
    //     <FullCardHeading>
    //         <Caption>{ caption }</Caption>
    //         { heading }
    //     </FullCardHeading>
    //     { children }
    // </FullCardHeader>;

};  // CardHeader


const Card: ComponentType<Props> = ({ fullWidth=false, children }: Props) => {

    if ( !fullWidth )
        return <HalfCard>
            { children }
        </HalfCard>;

    return <FullCard>
        { children }
    </FullCard>

};  // Card


export {
    Card,
    HalfCardSplitBody,
    CardHeader,
    VisualSection,
    ValueItem,
    ValueBox,
    NumericReports,
};
