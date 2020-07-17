// @flow

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from "react-router-dom";

import { fieldToStructure } from "common/utils";
import usePrevious from "hooks/usePrevious";
import {
    AgeSexBreakdownTabContent,
    MultiAreaStaticTabContent,
    SimpleTable,
    TabContent,
    TabLink,
    TabLinkContainer
} from "components/TabLink";
import { Radio } from "components/GovUk";
import DropdownButton from "components/DropdownButton";
import Abstract from "components/Abstract";

import DownloadOptions from "./DownloadOptions";

import {
    HalfCard,
    HalfCardHeader,
    HalfCardHeading,
    HalfCardSplitBody,
    FullCard,
    Caption,
    BodySection,
    HBodySection,
    MixedCardContainer
} from './Card.styles';

import type { Props } from './Card.types';
import type { ComponentType } from 'react';
import StaticExternalCard from "../StaticExternalCard";
import Loading from "../Loading";


const ContentBox: ComponentType<*> = ({ children, horizontal=false, ...props }) => {

    if ( horizontal )
        return <HBodySection { ...props }>{ children }</HBodySection>;

    return <BodySection { ...props }>{ children }</BodySection>

}; // ContentBox


const CardHeader: ComponentType<Props> = ({ heading, caption="", linkToHeading=false, children }: Props) => {

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
    </>

};  // CardHeader


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
    </Container>

};  // Card


const CardsContainer: ComponentType<*> = ({ children }) => {

    return <MixedCardContainer>
        { children }
    </MixedCardContainer>

};  // MixedCardContainer


const CardContent = ({ tabs: singleOptionTabs=null, cardType, download=[], params, options=null,
                         heading, fullWidth, abstract=null, ...props }) => {

    const
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        [ dataState, setDataState ] = useState(true),
        strParams = JSON.stringify(params),
        prevParams = usePrevious(strParams),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    let apiUrl;

    useEffect(() => {

        if ( prevParams !== strParams ) setDataState(true);

    }, [ prevParams, strParams ])


    if ( !dataState ) return null;


    switch ( cardType ) {

        case "chart":
            apiUrl = fieldToStructure(download, params);

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl } dataState={ dataState }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio heading={ heading } options={ options } dataState={ dataState } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <Abstract content={ abstract }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }) =>
                        <TabLink key={ `tab-${ heading }` } label={ heading }>
                            <TabContent params={ params } setDataState={ setDataState } dataState={ dataState } { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "map":
            apiUrl = fieldToStructure(download, params);

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl } dataState={ dataState }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio heading={ heading } options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <Abstract content={ abstract }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading: tabHeading, ...rest }, index) =>
                        <TabLink key={ `tab-${ tabHeading }-${ index }` }
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
                breakdownMetrics,
                params,
                [
                    { key: "latestBy", sign: "=", value: breakdownMetrics?.[0] ?? "" }
                ]

            );

            return <Card heading={ heading } fullWidth={ false } url={ apiUrl } noCsv={ true } dataState={ dataState }>
                <CardHeader heading={ heading } { ...props }/>
                <Abstract content={ abstract }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }, index) =>
                        <TabLink key={ `tab-${ heading }-${ index }` } label={ heading }>
                            <AgeSexBreakdownTabContent setDataState={ setDataState } params={ params } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>

        case "multiAreaStatic":
            apiUrl = fieldToStructure(
                download,
                // [
                //     ...[...tabs]?.reverse()?.[0]?.fields ?? [],
                //     { value: "areaName" }
                // ],
                tabs?.[0]?.params ?? []
            );

            return <Card heading={ heading } fullWidth={ fullWidth } url={ apiUrl } dataState={ dataState }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio heading={ heading } options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <Abstract content={ abstract }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }, index) =>
                        <TabLink key={ `tab-${ heading }-${ index }` } label={ heading }>
                            <MultiAreaStaticTabContent setDataState={ setDataState } dataState={ dataState } { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "simpleTableStatic":
            apiUrl = fieldToStructure(download, params);

            return <Card heading={ heading } fullWidth={ fullWidth } dataState={ dataState }>
                <CardHeader heading={ heading } { ...props }>
                    { active && <Radio heading={ heading } options={ options } value={ active } setValue={ setActive }/> }
                </CardHeader>
                <Abstract content={ abstract }/>
                <TabLinkContainer>{
                    tabs?.map(({ heading, ...rest }, index) =>
                        <TabLink key={ `tab-${ heading }-${ index }` } label={ heading }>
                            <SimpleTable setDataState={ setDataState } dataState={ dataState } { ...props } { ...rest }/>
                        </TabLink>
                    ) ?? null
                }</TabLinkContainer>
            </Card>;

        case "simpleExternalStatic":

            const StaticExternalCard = lazy(() => import('components/StaticExternalCard'));

            return <Card heading={ heading } fullWidth={ fullWidth }>
                <Suspense fallback={ <Loading/> }>
                    <StaticExternalCard download={ download || null }
                                        heading={ heading }
                                        abstract={ abstract }
                                        { ...props }/>
                </Suspense>
            </Card>;

        default:
            console.warn(`Invalid card type: "${cardType}"`)
            return null;

    }


};  // TestingCard


export {
    Card,
    CardsContainer,
    CardContent,
    HalfCardSplitBody,
    CardHeader,
    ContentBox
};
