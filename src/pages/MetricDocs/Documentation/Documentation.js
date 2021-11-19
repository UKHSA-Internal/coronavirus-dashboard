// @flow

import React from "react";

import { useParams } from "react-router";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import { useMarkdown } from "hooks/useMarkdown";

import type { ComponentType } from "react";
import {
    APILabel,
    APIMetric,
    MainLabelsContainer, Deprecated,
    MarkdownContent,
    MetadataContainer,
    APIMetricContainer
} from "./Documentation.style";

import { Accordion } from "govuk-react-jsx/govuk/components/accordion" ;
import { Link } from "react-router-dom";
import { ChangeLogType } from "components/ChangeLogComponent/ChangeLogItem";
import { DataTable } from "components/GovUk";
import { Container, MainContent, SideContent } from "components/ChangeLogComponent/ChangeLogComponent.styles";
import useTimestamp from "hooks/useTimestamp";
import Timestamp from "components/Timestamp";


const DocumentationLabels = {
    description: "Detailed description",
    methodology: "Methodologies",
    source: "Sources",
    notice: "Notice"
};


const AreaTypes = {
    "overview": "United Kingdom",
    "nation": "Nations",
    "region": "Regions",
    "nhsRegion": "Healthcare Regions",
    "nhsTrust": "NHS Trusts",
    "utla": "Upper Tier Local Authorities (UTLA)",
    "ltla": "Lower Tier Local Authorities (LTLA)",
    "msoa": "Middle layer Super Output Areas (MSOA)"
};


const Markdown: ComponentType<*> = ({ payload, className="", toc=false }) => {

    payload = toc ? "# Table of contents\n\r\n\r" + payload : payload;

    const data = useMarkdown(
        payload ? payload.replace(/([#]+)/g, '###$1') : null,
        toc
    );

    if ( !payload ) return null
    else if ( !data ) return <Loading/>;

    return <MarkdownContent
        className={ `govuk-body markdown page ${className} ${ toc ? "with-toc" : "" }` }
        dangerouslySetInnerHTML={ { __html: data } }
    />;

};  // Markdown


const Summary: ComponentType<*> = ({ data }) => {

    if ( !data ) return null;

    return <section>
        <h3 className={ "govuk-heading-m" }>Summary</h3>
        <Markdown payload={ data?.body } className={ "no-left-margin" }/>
        <hr className={ "govuk-section-break govuk-section-break--l" }/>
    </section>;

}; // Summary


const AssociatingLogs: ComponentType<*> = ({ data }) => {

    return <section>
        <h3 className={ "govuk-heading-m" }>Changes and updates</h3>
        <MarkdownContent className={ "markdown page no-left-margin" }>
            <p>Logs of changes made to the metric over time.</p>
            <p>
                Note that all log entries come into effect from the date on which they are
                published. Some changes are temporary and have an expiry date. They only
                affect the data published during a specific period.
            </p>
        </MarkdownContent>
        <DataTable
            sortable={ false }
            fields={[
                { label: "Date", value: "dt", type: "date" },
                { label: "Headline", value: "link", type: "text", className: "body-text" },
                { label: "Type", value: "type", type: "text" },
                { label: "Applicable until", value: "expiry", type: "date" }
            ]}
            className={ "metric-doc-table" }
            parentClassName={ "doc-table-container" }
            data={
                data.map(item => ({
                    dt: <Timestamp timestamp={ item.date } format={ "DD MMM YYYY" }/>,
                    link:
                        <Link className={ "govuk-link" }
                              to={ `/details/whats-new/record/${item.id}` }>
                            { item.heading }
                        </Link>,
                    type: <ChangeLogType type={ item.type }/>,
                    expiry:
                        item?.expiry
                            ? <Timestamp timestamp={ item.expiry } format={ "DD MMM YYYY" }/>
                            : <span style={{ color: "#797979" }}>N/A</span>,
                }))
            }
        />
        {
            !data || !(data?.length)
                ? <span>There are no logs associated with this metric.</span>
                : null
        }
    </section>;

};  // AssociatingLogs


const Availability: ComponentType<*> = ({ metric, timestamp }) => {

    const areaAvailability = useGenericAPI(
        "genericApiMetricAreas",
        null,
        { metric, date: timestamp.replace(/T.+/, "") }
    );

    if ( !areaAvailability ) return <Loading/>;

    if ( !areaAvailability || !areaAvailability?.length ) return null;

    return <section>
        <h3>Availability by area</h3>
        <ul className={ "govuk-list govuk-list--dashed" }>{
            Object.keys(AreaTypes).map( area_type => {
                const item = areaAvailability.find(v => v.area_type === area_type);

                if ( !item ) return null;

                return <li key={ area_type } className={ "govuk-!-margin-bottom-5" }>
                    <strong className={ "govuk-!-font-size-16" }>{ AreaTypes[area_type] }</strong> <br/>
                    <span className={ "govuk-!-font-size-14" } style={ { color: "#797979" } }>
                    Latest record:&nbsp;<Timestamp timestamp={ item.last_update }/>
                </span>
                    <br/>
                    <MainLabelsContainer small>
                        <APILabel small>
                            API
                            <span className={ "govuk-visually-hidden" }>
                            Metric name to be used for API access.
                        </span>
                        </APILabel>
                        <APIMetric small>{ area_type }</APIMetric>
                    </MainLabelsContainer>
                </li>
            })
        }</ul>
    </section>;

};  // Availability


const AdditionalDetails: ComponentType<*> = ({ documentation }) => {

    if ( Object.keys(documentation).filter(k => k !== "abstract").length < 1 )
        return null;

    return <section className={ "govuk-!-margin-top-5" }>
        <h3 className={ "govuk-heading-m" }>Additional details</h3>
        <p>This section covers more generic information about the metric.</p>
        <Accordion headingLevel={ "3" } items={
            Object.keys(DocumentationLabels).map(docName => {
                if ( docName in documentation ) {
                    return {
                        heading: {
                            children: DocumentationLabels[docName]
                        },
                        summary: {
                            children:
                                <span style={{ color: "#797979" }} className={ "govuk-body-s" }>
                                    Last updated
                                    on <Timestamp timestamp={ documentation?.[docName].last_modified }/>
                                </span>
                        },
                        content: {
                            children: <Markdown payload={ documentation?.[docName]?.body } toc/>
                        }
                    }
                }
            })
        }/>
    </section>;

};  // AdditionalDetails


const Metadata: ComponentType<*> = ({ data }) => {

    return <div>
        <MetadataContainer className={ "govuk-!-margin-bottom-0" }>
            <dt>Category</dt>
            <dd><span className={ "dark-blue" }>{ data.category }</span></dd>
            <dt>Types</dt>
            <dd>{
                data.tags.map(tag =>
                    <span className={ "light-blue govuk-!-margin-right-1" }
                          key={ tag }
                    >{ tag }</span>
                )
            }</dd>
        </MetadataContainer>
    </div>;

};  // Metadata


const NoData: ComponentType<*> = ({ data, metric, deprecated }) => {

    if ( data && Object.keys(data).length ) {
        return null;
    }

    const messageSubject = encodeURI(`Metric documentation: issue with '${metric}'`);

    return <div className={ "govuk-notification-banner govuk-!-margin-bottom-1" }
                role={ "region" }
                style={{ maxWidth: "40em" }}
                aria-labelledby={ "govuk-notification-banner-title" }
                data-module={ "govuk-notification-banner" }>
        <div className={ "govuk-notification-banner__header" }>
            <h2 className={ "govuk-notification-banner__title" } id={ "govuk-notification-banner-title" }>
                Documentation not found
            </h2>
        </div>
        <div className={ "govuk-notification-banner__content" }>
            <p className={ "govuk-notification-banner__heading" }>
                We do not have the documentation for this metric.
            </p>
            <p>{
                deprecated
                    ? <>
                        This is because the metric was deprecated
                        on <Timestamp timestamp={ deprecated }/>.
                    </>
                    : "The documentation may be under construction. Please check back later."
            }</p>
            <p>
               If you believe that this information is incorrect, please&nbsp;
                <a className={ "govuk-notification-banner__link" }
                   href={ `mailto:coronavirus-tracker@phe.gov.uk?Subject=${messageSubject}` }>contact us</a>.
            </p>
        </div>
    </div>;

};  // NoData


const MetricDocumentation: ComponentType<*> = ({}) => {

    const { metric } = useParams();
    const timestamp = useTimestamp();

    const data = useGenericAPI(
        "genericApiMetricDocs",
        null,
        { metric }
    );

    if ( !data ) return <Loading/>;

    return <>
    <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">
                experimental
            </strong>
            <span className="govuk-phase-banner__text">
                This is a new prat of the service.
                Your <a className="govuk-link"
                        href="mailto:coronavirus-tracker@phe.gov.uk?Subject=Metrics%20documentation%20feedback">
                    feedback
                </a> will
                help us to improve it.
            </span>
        </p>
    </div>
    <article className={ "govuk-body govuk-!-margin-top-5" }>
        <header>
            <h2 className={ "govuk-heading-l govuk-!-margin-bottom-1" }>
                { data.metric_name }
            </h2>
            <MainLabelsContainer>
                <APIMetricContainer>
                    <APILabel>
                        API
                        <span className={ "govuk-visually-hidden" }>
                            Metric name to be used for API access.
                        </span>
                    </APILabel>
                    <APIMetric>{ data.metric }</APIMetric>
                </APIMetricContainer>
                {
                    data.deprecated
                        ? <Deprecated>
                            Deprecated on&nbsp;<Timestamp timestamp={ data.deprecated }/>
                        </Deprecated>
                        : null
                }
            </MainLabelsContainer>
        </header>
        <Container>
            <MainContent style={{ borderTop: "none" }}>
                <NoData data={ data?.documentation } metric={ metric } deprecated={ data?.deprecated }/>
                <Summary data={ data.documentation?.abstract }/>
                <AdditionalDetails documentation={ data.documentation }/>
                <hr className={ "govuk-section-break govuk-section-break--l"  }/>
                <AssociatingLogs data={ data?.logs }/>
            </MainContent>
            <SideContent>
                <Metadata data={ data }/>
                {
                    timestamp !== ""
                        ? <Availability metric={ metric } timestamp={ timestamp }/>
                        : null
                }
            </SideContent>
        </Container>
    </article>
    </>
};


export default MetricDocumentation;
