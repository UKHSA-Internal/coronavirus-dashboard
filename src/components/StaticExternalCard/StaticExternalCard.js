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

    const browserFormats = ['xml', 'json'];

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
           rel={ browserFormats.indexOf(format.toLowerCase()) > -1 ? 'noreferrer noopener' :  '' }
           target={ browserFormats.indexOf(format.toLowerCase()) > -1 ? '_blank' :  '' }
           onClick={ () => downloadTriggered(format) }>
            as { format.toLowerCase() }
        </a>
    )

};  // DownloadOptions


const StaticExternalCard: ComponentType<*> = ({ download=[], abstract=null, heading, resource=null, image=null, ...props }) => {

    if ( !resource ) return null;

    const extLinkTriggered = ( link ) => analytics({
        category: 'External link',
        action: "click",
        label: link
    });

    return <>
        <DropdownButton tooltip={ "Download card data" }
                        launcherSrOnly={ "Download card data" }>
            <DownloadOptions download={ download } heading={ heading }/>
        </DropdownButton>
        <CardHeader heading={ heading } { ...props }/>
        <HalfCardSplitBody>
            <div className={ "govuk-grid-row" }>
                <div className={ 'govuk-grid-column-one-half' }>
                    <ContentBox className={ "govuk-!-margin-top-5" }>
                        <LinkDescription className={ "govuk-body-s" }>
                            { abstract }
                        </LinkDescription>
                        <LinkDescription className={ 'govuk-body-s' }>
                            Link to a different website:
                        </LinkDescription>
                        <p>
                            <ExternalLink className={ "govuk-button govuk-!-margin-bottom-0" }
                                          onClick={ () => extLinkTriggered(resource.url) }
                                          target={ '_blank' }
                                          rel={ 'noreferrer noopener' }
                                          href={ resource.url }>
                                { resource.label }
                            </ExternalLink>
                        </p>
                    </ContentBox>
                </div>
                {
                    image &&
                    <div className={ 'govuk-grid-column-one-half' }>
                        <ContentBox>
                            <Image src={ image.url } alt={ image.alt }/>
                        </ContentBox>
                    </div>
                }
            </div>
        </HalfCardSplitBody>
    </>

};  // StaticExternalCard


export default StaticExternalCard;
