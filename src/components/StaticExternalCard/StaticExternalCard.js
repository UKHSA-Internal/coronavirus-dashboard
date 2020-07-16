// @flow

import React from "react";

import {
    HalfCardSplitBody,
    ContentBox,
    CardHeader
} from "components/Card";

import {
    ExternalLink,
    LinkDescription,
    Image
} from "./StaticExternalCard.styles";

import type { ComponentType } from "react";
import { analytics } from "common/utils";
import DropdownButton from "components/DropdownButton";
import Abstract from "components/Abstract";


const DownloadOptions = ({ download=[], heading }) => {

    if ( !heading ) return null;

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

    return download.map(({ format, url }) =>
        <a className={ 'govuk-link govuk-link--no-visited-state' }
           key={ format }
           href={ url }
           onClick={ () => downloadTriggered(format) }>
            as { format.toLowerCase() }
        </a>
    )

};  // DownloadOptions


const StaticExternalCard: ComponentType<*> = ({ download=[], abstract=null, heading, resource=null, image=null, ...props }) => {

    if ( !resource ) return null;

    return <>
        <DropdownButton tooltip={ "Download card data" }
                        launcherSrOnly={ "Download card data" }>
            <DownloadOptions download={ download } heading={ heading }/>
        </DropdownButton>
        <CardHeader heading={ heading } { ...props }/>
        <Abstract content={ abstract }/>
        <HalfCardSplitBody>
            <ContentBox className={ "govuk-!-margin-top-5" }>
                <LinkDescription className={ 'govuk-body-s' }>
                    Link to a different website:
                </LinkDescription>
                <p>
                    <ExternalLink className={ "govuk-button" }
                                  target={ '_blank' }
                                  rel={ 'noreferrer noopener' }
                                  href={ resource.url }>
                        { resource.label }
                    </ExternalLink>
                </p>
            </ContentBox>
            {
                image &&
                <ContentBox>
                    <Image src={ image.url } alt={ image.alt }/>
                </ContentBox>
            }
        </HalfCardSplitBody>
    </>

};  // StaticExternalCard


export default StaticExternalCard;
