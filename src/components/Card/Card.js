// @flow

import React, { useState } from 'react';
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
    Caption,
    BodySection,
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
import { colours, fieldToStructure, strFormat, analytics } from "common/utils";
import useApi from "hooks/useApi";
import moment from "moment";
import {
    AgeSexBreakdownTabContent,
    MultiAreaStaticTabContent,
    TabContent,
    TabLink,
    TabLinkContainer
} from "components/TabLink";
import { Radio } from "components/GovUk";
import DropdownButton from "components/DropdownButton";
import Loading from "components/Loading";


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


const HeadlineNumbers = ({ params, headlineNumbers=[] }) => {

    return <NumericReports horizontal={ true }>{
        headlineNumbers?.map((item, index) =>
            <ValueBox params={ params }
                      key={ `headline-number-${index}` }
                      { ...item }/>
        ) ?? null
    }</NumericReports>

} // HeadlineNumbers


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
            ( chart?.colour ?? false ) === false
                ?  null
                : <DataColour role={ "button" }
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
                        {
                            primaryValue
                                ? numeral(primaryValue).format("0,0")
                                : <Loading/>
                        }{ primarySign || null }
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
                            {
                                secondaryValue
                                ? numeral(secondaryValue).format("0,0")
                                : <Loading/>
                            }{ secondarySign || secondarySign }
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


const CardHeader: ComponentType<*> = ({ heading, caption="", linkToHeading=false, children }: Props) => {

    return <>
        <HalfCardHeader className={ linkToHeading ? "" : "govuk-!-margin-bottom-2"}>
            <HalfCardHeading>
            { heading }
            <Caption>{ caption }</Caption>
            </HalfCardHeading>
            {
                linkToHeading &&
                <Link to={ heading.toLowerCase() }
                      className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state no-decoration smaller" }>
                    { linkToHeading }
                </Link>
            }
            { children }
        </HalfCardHeader>
        {
            linkToHeading &&
            <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible" }/>
        }
    </>;

};  // CardHeader


const DownloadOptions = ({ heading, baseUrl, noCsv }) => {

    analytics({
        category: 'Downloads',
        action: 'open',
        label: 'Selection dropdown'
    });

    const downloadTriggered = ( type ) => analytics({
        category: 'Downloads',
        action: heading,
        label: type
    });

    return <>
        {
            !noCsv
                ? <a className={ 'govuk-link govuk-link--no-visited-state' }
                     onClick={ () => downloadTriggered("CSV") }
                     href={ `${ baseUrl }&format=csv` }
                     aria-disabled={ !noCsv }>
                    as CSV
                </a>
                : <span className={ 'govuk-link govuk-link--no-visited-state disabled' }>
                    as CSV
                    <span className={ "govuk-visually-hidden" }>
                        CSV format is not available for this card.
                    </span>
                </span>
        }
        <a className={ 'govuk-link govuk-link--no-visited-state' }
           href={ `${baseUrl}&format=json` }
           onClick={ () => downloadTriggered("JSON") }
           target={ '_blank' }
           rel={ 'noreferrer noopener' }>
            as JSON
        </a>
        <a className={ 'govuk-link govuk-link--no-visited-state' }
           target={ '_blank' }
           onClick={ () => downloadTriggered("XML") }
           rel={ 'noreferrer noopener' }
           href={ `${baseUrl}&format=xml` } download>
            as XML
        </a>
    </>

};  // DownloadOptions


const Card: ComponentType<Props> = ({ heading, url, children, fullWidth=false, noCsv=false }: Props) => {

    const Container = ({ ...props }) =>
        !fullWidth
            ? <HalfCard {...props}/>
            : <FullCard {...props}/>;

    return <Container>
        {
            url &&
            <DropdownButton tooltip={ "Download card data" }
                            launcherSrOnly={ "Download card data" }>
                <DownloadOptions heading={ heading } baseUrl={ url } noCsv={ noCsv }/>
            </DropdownButton>
        }
        { children }
    </Container>;

};  // Card


const MixedCardContainer: ComponentType<*> = ({ children }) => {

    return <section className={ 'util-flex util-flex-wrap' }>{ children }</section>

};  // MixedCardContainer


const CardContent = ({ tabs: singleOptionTabs=null, cardType, params, options=null,
                         heading, fullWidth, ...props }) => {

    const
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    let apiUrl;

    switch ( cardType ) {

        case "chart":
            apiUrl = fieldToStructure([...tabs]?.reverse()?.[0]?.fields ?? [], params);

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>
                            <TabContent params={ params } { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "map":
            apiUrl = fieldToStructure([...tabs]?.reverse()?.[0]?.fields ?? [], params);

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <TabLinkContainer>{
                    tabs?.map(({ heading: tabHeading, ...rest }) =>
                        <TabLink key={ `tab-${ tabHeading }` }
                                 label={ tabHeading }>
                            <p>Not implemented.</p>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "ageSexBreakdown":
            // FixMe: Small cards need min height

            const breakdownMetrics = [...tabs]?.reverse()?.[0]?.requiredMetrics ?? [];

            apiUrl = fieldToStructure(
                breakdownMetrics.map(metric => ({value: metric})),
                params,
                [
                    { key: "latestBy", sign: "=", value: breakdownMetrics?.[0] ?? "" }]

            );

            return <Card heading={ heading } fullWidth={ false } url={ apiUrl } noCsv={ true }>
                <CardHeader heading={ heading } { ...props }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>
                            <AgeSexBreakdownTabContent params={ params } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>

        case "multiAreaStatic":
            apiUrl = fieldToStructure(
                [
                    ...[...tabs]?.reverse()?.[0]?.fields ?? [],
                    { value: "areaName" }
                ],
                tabs?.[0]?.params ?? []
            );

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>
                            <MultiAreaStaticTabContent { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        default:
            return <p>Invalid chart type</p>;

    }


};  // TestingCard


export {
    Card,
    HeadlineNumbers,
    MixedCardContainer,
    CardContent,
    HalfCardSplitBody,
    CardHeader,
    VisualSection,
    ValueItem,
    ValueBox,
    NumericReports,
};
