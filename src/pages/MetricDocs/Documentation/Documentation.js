// @flow

import React from "react";

import { useParams } from "react-router";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import { useMarkdown } from "hooks/useMarkdown";

import type { ComponentType } from "react";
import { APILabel, APIMetric, APIMetricContainer, MarkdownContent } from "./Documentation.style";

import { Accordion } from "govuk-react-jsx/govuk/components/accordion" ;
import { Link } from "react-router-dom";
import { ChangeLogType } from "components/ChangeLogComponent/ChangeLogItem";
import { DataTable } from "components/GovUk";
import moment from "moment";


const Markdown: ComponentType<*> = ({ payload }) => {

    const data = useMarkdown(payload ? payload.replace(/([#]+)/g, '###$1') : null);

    if ( !payload ) return null
    else if ( !data ) return <Loading/>;

    return <MarkdownContent
        className={ "govuk-body markdown page" }
        dangerouslySetInnerHTML={ { __html: data } }
    />;

};  // Markdown


const Introduction: ComponentType<*> = ({ data }) => {

    if ( !data ) return null;

    return <section>
        <h3 className={ "govuk-heading-m" }>Introduction</h3>
        <Markdown payload={ data?.body }/>
        <hr className={ "govuk-section-break govuk-section-break--l" }/>
    </section>;

}; // Introduction


const AssociatingLogs: ComponentType<*> = ({ data }) => {

    return <section className={ "govuk-!-margin-top-5" }>
        <h3 className={ "govuk-heading-m" }>Logs and changes</h3>
        <DataTable
            sortable={ false }
            fields={[
                { label: "Date", value: "dt", type: "text" },
                { label: "Headline", value: "link", type: "text" },
                { label: "Type", value: "type", type: "text" },
                { label: "Applicable until", value: "expiry", type: "text" }
            ]}
           data={
               data.map(item => ({
                   dt: <time dateTime={ item.date }>
                       { moment(item.date).format("D MMMM YYYY") }
                   </time>,
                   link:
                       <Link className={ "govuk-link" }
                             to={ `/details/whats-new/record/${item.id}` }>
                           { item.heading }
                       </Link>,
                   type: <ChangeLogType type={ item.type }/>,
                   expiry: item?.expiry
                       ? <time dateTime={ item.expiry }>
                           { moment(item.expiry).format("D MMMM YYYY") }
                       </time>
                       : <span style={{ color: "#797979" }}>N/A</span>,
               }))
           }
        />
        {
            data ? null : <span>No records for this metric.</span>
        }
    </section>;

};  // AssociatingLogs


const DocumentationLabels = {
    description: "Detailed description",
    methodology: "Methodologies",
    source: "Sources",
    notice: "Notice"
};


const MetricDocumentation: ComponentType<*> = ({}) => {

    const { metric } = useParams();
    const data = useGenericAPI(
        "genericApiMetricDocs",
        null,
        { metric }
    );

    if ( !data ) return <Loading/>;

    return <div className={ "govuk-body govuk-!-margin-top-5" } style={{ maxWidth: "45em"}}>
        <h2 className={ "govuk-heading-l govuk-!-margin-bottom-1" }>{ data.metric_name }</h2>
        <APIMetricContainer>
                <APILabel>
                    API
                </APILabel>
                <APIMetric>{ data.metric }</APIMetric>
        </APIMetricContainer>
        <Introduction data={ data.documentation?.abstract }/>

        <section className={ "govuk-!-margin-top-5" }>
            <h3 className={ "govuk-heading-m" }>Additional details</h3>
            <p>This section covers more generic information about the metric.</p>
            <Accordion headingLevel={ "3" } items={
                Object.keys(DocumentationLabels).map(docName => {
                    if ( docName in data.documentation ) {
                        return {
                            heading: {children: DocumentationLabels[docName]},
                            summary: {children:
                                <span style={{ color: "#797979" }} className={ "govuk-body-s" }>
                                    Last updated on <time dateTime={ data.documentation?.[docName].last_modified }>{
                                        moment(data.documentation?.[docName].last_modified).format("D MMMM YYYY")
                                    }</time>
                                </span> },
                            content: {children: <Markdown payload={ data.documentation?.[docName]?.body }/> }
                        }
                    }
                })
            }/>
        </section>
        <hr className={ "govuk-section-break govuk-section-break--l" }/>
        <AssociatingLogs data={ data?.logs }/>
    </div>

};


export default MetricDocumentation;
