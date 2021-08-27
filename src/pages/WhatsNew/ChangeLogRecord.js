// @flow

import React, { Fragment } from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import { Helmet } from "react-helmet";

import { useParams } from "react-router";
import { PageComponent } from "components/ChangeLogComponent/PageComponent";
import { ChangeLogHeading, ChangeLogItemBody } from "components/ChangeLogComponent/ChangeLogItem";
import { useMarkdown } from "hooks/useMarkdown";
import { DataList, Markdown } from "components/ChangeLogComponent/ChangeLogComponent.styles";

import type { ComponentType } from "react";
import { Link } from "react-router-dom";


const Metrics: ComponentType<*> = ({ metrics }) => {

    if ( !metrics || !metrics?.length ) return null;

    return <div className={ "govuk-!-padding-top-4 govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
        <h4 className={ "govuk-heading-s" }>Affected metrics</h4>
        <DataList>{
            metrics.map(item =>
                <Fragment key={ item.metric }>
                    <dt>{ item.metric_name }</dt>
                    <dd><code>{ item.metric }</code></dd>
                </Fragment>
            )
        }</DataList>
    </div>;

};


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
            <section className="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6"
                     style={{ maxWidth: 50 + "em" }}>
                <ChangeLogHeading data={ data } standAlone={ true }/>
                <ChangeLogItemBody data={ data }/>
                <Details details={ data?.details ?? "" }/>
                <Metrics metrics={ data?.metrics }/>
            </section>
        </PageComponent>
    </>;

}; // ChangeLog


export default WhatsNewRecord;
