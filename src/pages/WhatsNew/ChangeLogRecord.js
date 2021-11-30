// @flow

import React, { Fragment } from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import { Helmet } from "react-helmet";

import { useParams } from "react-router";
import { PageComponent } from "components/ChangeLogComponent/PageComponent";
import { ChangeLogHeading, ChangeLogItemBody } from "components/ChangeLogComponent/ChangeLogItem";
import { useMarkdown } from "hooks/useMarkdown";
import { Markdown } from "components/ChangeLogComponent/ChangeLogComponent.styles";
import { Content } from "./WhatsNew.styles";

import { Link } from "react-router-dom";
import AffectedLogMetrics from "components/AffectedLogMetrics";
import AssociatedAreas from "components/AssociatedAreas";

import type { ComponentType } from "react";


const Details: ComponentType<*> = ({ details }) => {

    let detailsPayload = useMarkdown(details);

    if ( !details?.length ) return null;

    detailsPayload =
        `<h4 class="govuk-heading-s govuk-!-margin-top-0">Additional details</h4>` +
        detailsPayload;

    return <Markdown className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                     dangerouslySetInnerHTML={ { __html: detailsPayload } }/>;

};


const WhatsNewRecord: ComponentType<*> = () => {

    const { id } = useParams();

    const data = useGenericAPI(
        "genericApiChangeLogsRecord",
        null,
        { id: id }
        );

    if ( !data ) return <Loading/>;

    return <>
        <Helmet>
            <link type="application/rss+xml"
                  rel="alternate"
                  title="Service logs - RSS feed"
                  href="https://api.coronavirus.data.gov.uk/generic/change_logs/rss.xml"/>
            <link type="application/atom+xml"
                  rel="alternate"
                  title="Service logs - Atom feed"
                  href="https://api.coronavirus.data.gov.uk/generic/change_logs/atom.xml"/>
            <title>{ data.heading } | Coronavirus in the UK</title>
            <meta property="og:title" content={ data.heading + " | Coronavirus in the UK"}/>
            <meta name="twitter:title" content={ data.heading + " | Coronavirus in the UK"}/>
        </Helmet>
        <PageComponent filters={ false } feedPath={ "change_logs" }>
            <div>
                <Link className="govuk-back-link" to={ "/details/whats-new" }>
                    All records
                </Link>
            </div>
            <Content>
                <ChangeLogHeading data={ data } standAlone={ true }/>
                <ChangeLogItemBody data={ data }/>
                <Details details={ data?.details ?? "" }/>
                <AssociatedAreas areas={ data?.applicable_to ?? [] } className={ "govuk-!-margin-bottom-2" }/>
                <AffectedLogMetrics metrics={ data?.metrics }/>
            </Content>
        </PageComponent>
    </>;

}; // ChangeLog


export default WhatsNewRecord;
