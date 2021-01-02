// @flow

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from "react-router-dom";

import { fieldToStructure, getParamValueFor, heading2id } from "common/utils";
import usePrevious from "hooks/usePrevious";
import TabLinkContainer from "components/TabLink";
import { Radio } from "components/GovUk";
import DropdownButton from "components/DropdownButton";
import DownloadOptions from "./DownloadOptions";
import BrowserHistory from "components/BrowserHistory";
import Loading from "components/Loading";
import ShareOptions from "./ShareOptions";

import {
    HalfCard,
    HalfCardHeader,
    HalfCardHeading,
    HalfCardSplitBody,
    FullCard,
    Caption,
    BodySection,
    HBodySection,
    MixedCardContainer, 
    DefaultTag,
    ShareRow
} from './Card.styles';

import type { IsIncludedTypeProps, Props } from './Card.types';
import type { ComponentType } from 'react';

import DownloadIcon from "assets/icon-download.svg";
import ShareIcon from "assets/icon-share.svg";


import moment from "moment";


const ContentBox: ComponentType<*> = ({ children, horizontal=false, ...props }) => {

    if ( horizontal )
        return <HBodySection { ...props }>{ children }</HBodySection>;

    return <BodySection { ...props }>{ children }</BodySection>

}; // ContentBox




const CardHeader: ComponentType<Props> = ({ heading, caption="", linkToHeading=false,
                                              experimental=false, children }: Props) => {

    return <>
        <HalfCardHeader className={ linkToHeading ? "" : "govuk-!-margin-bottom-2"}>
            <HalfCardHeading role={ 'heading' }
                             aria-level={ 2 }>
                { heading }
                { experimental ? <DefaultTag className={ "govuk-tag" }>EXPERIMENTAL</DefaultTag> : null}
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


const Card: ComponentType<Props> = ({ heading, url, children, fullWidth=false, noCsv=false, ...props }: Props) => {

    const
        preppedLabel = heading2id(heading),
        Container = ({ ...props }) =>
            !fullWidth
                ? <HalfCard {...props}/>
                : <FullCard {...props}/>;

    return <Container role={ "article" }
                      id={ `card-${preppedLabel}` }
                      aria-labelledby={ `card-heading-${preppedLabel}` }
                      className={ "card" }>

        { children }
        <ShareRow>
            {
                url &&
                <DropdownButton tooltip={ "Download card data" }
                                launcherSrOnly={ `Download card data for "${ heading }"` }
                                heading={ heading }
                                buttonLabel={ "Download" }
                                icon={ DownloadIcon }
                                { ...props }>
                    <DownloadOptions heading={ heading }
                                    baseUrl={ url }
                                    noCsv={ noCsv }
                                    { ...props }/>

                </DropdownButton>
            }
            <DropdownButton tooltip={ "Share card data" }
                            launcherSrOnly={ `Share card data for "${ heading }"` }
                            buttonLabel={ "Share" }
                            icon={ ShareIcon }
                            heading={ heading }>
                <ShareOptions subject={ heading }
                              label={ heading2id(heading) }/>
            </DropdownButton>
        </ShareRow>

    </Container>

};  // Card


const CardsContainer: ComponentType<*> = ({ children }) => {

    return <MixedCardContainer>
        { children }
    </MixedCardContainer>

};  // MixedCardContainer


const NoTabCard: ComponentType<*> = ({ cardType, ...props }) => {

    switch ( cardType ) {

        case "simpleExternalStatic":
            const StaticExternalCard = lazy(() => import('components/StaticExternalCard'));

            return <Suspense fallback={ <Loading/> }>
                <StaticExternalCard { ...props }/>
            </Suspense>;

        default:
            console.warn(`Invalid card type: "${cardType}"`)
            return null;

    }

};  // NoTabCards


const isIncluded = ({ params, locationAware={} }: IsIncludedTypeProps): boolean => {

    if ( !Object.keys(locationAware).length )
        return true;

    const
        areaType = getParamValueFor(
            params,
            "areaType",
            "overview"
        ).toLowerCase(),
        areaName = getParamValueFor(
            params,
            "areaName",
            "United Kingdom"
        ).toLowerCase(),
        includedAreaType = locationAware?.included?.areaType ?? [],
        includedAreaName = locationAware?.included?.areaName ?? [],
        excludedAreaType = locationAware?.excluded?.areaType ?? [],
        excludedAreaName = locationAware?.excluded?.areaName ?? [],
        hasExclusion = excludedAreaType.length > 0 && !(excludedAreaName.length > 0),
        isExcluded = (
            excludedAreaType.map(value => value.toLowerCase()).indexOf(areaType) > -1 ||
            excludedAreaName.map(value => value.toLowerCase()).indexOf(areaName) > -1
        ),
        isIncluded = (
            includedAreaType.map(value => value.toLowerCase()).indexOf(areaType) > -1 ||
            includedAreaName.map(value => value.toLowerCase()).indexOf(areaName) > -1
        );

    return !hasExclusion ? isIncluded : !isExcluded

};  // isIncluded


const CardContent = ({ tabs: singleOptionTabs=null, cardType, download=[], params, options=null,
                         heading, fullWidth, abstract=null, ...props }) => {

    const
        noTabCards = ["simpleExternalStatic"],
        [ active, setActive ] = useState(options?.choices?.[0] ?? null),
        [ dataState, setDataState ] = useState(true),
        strParams = JSON.stringify(params),
        prevParams = usePrevious(strParams),
        tabs = !active
            ? (singleOptionTabs || [])
            : ( props?.[active]?.tabs ?? [] );

    useEffect(() => {

        if ( prevParams !== strParams ) setDataState(true);

    }, [ prevParams, strParams ])


    if ( !dataState ) return null;

    if ( cardType === "recentData" ) {
        params = [
            ...params,
            {
                key: "date",
                sign: ">",
                value: moment().subtract(3, "months").format("YYYY-MM-DD")
            }
        ]
    }

    const customProps = {
        ageSexBreakdown: {
            noCsv: true,
            url: (() => {
                const breakdownMetrics = [...tabs]?.reverse()?.[0]?.requiredMetrics ?? [];

                return fieldToStructure(
                    [...breakdownMetrics, ...download],
                    params,
                    [
                        { key: "latestBy", sign: "=", value: breakdownMetrics?.[0] ?? "" }
                    ]

                );
            })()
        },
        multiAreaStatic: {
            url: fieldToStructure(download, tabs?.[0]?.params ?? [])
        },
        simpleTableStatic: {
            url: false
        },
        recentData: {
            url: fieldToStructure(download, params)
        }
    };

    const cardProps = {
        tabs: tabs,
        cardType: cardType,
        dataState: dataState,
        heading: heading,
        params: params,
        setDataState: setDataState,
        abstract: abstract,
        download: download,
        fullWidth: fullWidth,
        url: fieldToStructure(download, params),
        ...props,
        ...customProps?.[cardType] ?? {}
    };

    if ( !isIncluded(cardProps) )
        return null;

    const element = <CardHeader heading={ heading } { ...cardProps }>{
                        active &&
                        <Radio heading={ heading }
                            options={ options }
                            value={ active }
                            setValue={ setActive }/>
                    }</CardHeader>

    return <Card heading={ heading }
                 fullWidth={ fullWidth }
                 dataState={ dataState }
                 { ...cardProps }>{
        noTabCards.indexOf(cardType) > -1
            ? <NoTabCard { ...cardProps }/>
            : <>
                <BrowserHistory element={element}/>
                <TabLinkContainer { ...cardProps }/>
             </>
    }</Card>;

};  // TestingCard


export {
    Card,
    CardsContainer,
    CardContent,
    HalfCardSplitBody,
    CardHeader,
    ContentBox
};
