// @flow

import React, { useState, useMemo, Fragment } from "react";
import moment from "moment";
import { Markdown, ChangeLogSpan, DataList } from "./ChangeLogComponent.styles";
import { Link } from "react-router-dom";

import type { ComponentType } from "react";
import remark from "remark";
import html from "remark-html";


const colours = {
    "new feature": {
        "background": "#CCE2D8",
        "text": "#005A30"
    },
    "new metric": {
        "background": "#BFE3E0",
        "text": "#10403C"
    },
    "change to metric": {
        "background": "#FFF7BF",
        "text": "#594D00"
    },
    "update": {
        "background": "#FCD6C3",
        "text": "#6E3619"
    },
    "new content": {
        "background": "#DBD5E9",
        "text": "#3D2375"
    },
    "data issue": {
        "background": "#EEEFEF",
        "text": "#383F43"
    },
    "other": {
        "background": "#D2E2F1",
        "text": "#144E81"
    },
};


const useMarkdown = (content: string | undefined) => {

    const [body, setBody] = useState(null);

    useMemo(() => {
        remark()
            .use(html)
            .process(content, (err, text) => {
                setBody(err ? null : String(text));
            });

    }, [ content ])

    return body

};  // ProcessedMarkdown


const ChangeLogItemBody: ComponentType = ({ data }) => {

    const body = useMarkdown(data?.body)

    return <div className="govuk-body govuk-!-margin-0">
        <Markdown className="govuk-body govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                  dangerouslySetInnerHTML={{ __html: body }}/>
    </div>

}; // ChangeLogItemBody


const Metrics: ComponentType = ({ data }) => {

    if ( !data?.metrics?.length ) return null;

    return <div className={ "govuk-!-padding-top-4 govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
        <h3 className={ "govuk-heading-s" }>Affected metrics</h3>
        <DataList>{
            data.metrics.map(item =>
                <Fragment key={ item.metric }>
                    <dt>{ item.metric_name }</dt>
                    <dd><code>{ item.metric }</code></dd>
                </Fragment>
            )
        }</DataList>
    </div>

};  // Details


const Details: ComponentType = ({ data }) => {

    const details = useMarkdown(data?.details);

    if ( !data?.details && !data?.metrics?.length ) return null;

    return <details className="govuk-details govuk-!-margin-top-2"
                    data-module="govuk-details">
        <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">
                Additional details
            </span>
        </summary>
        {   !data?.details
                ? null
                : <Markdown className="govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                            dangerouslySetInnerHTML={ { __html: details } }/>
        }
        <Metrics data={ data }/>
    </details>

};  // Details


const ChangeLogHeading: ComponentType = ({ data }) => {

    return <h3 className={ "govuk-heading-s govuk-!-font-size-19 govuk-!-margin-bottom-1" }
               id={ data.id }>
        <small className={ "govuk-caption-m govuk-!-font-size-19 govuk-!-margin-bottom-1" }>
            <time dateTime={ data.date }>
                <span className={ "govuk-visually-hidden" }>Date of change: </span>
                { moment(data.date).format("D MMMM") }
            </time>
            <ChangeLogSpan color={ colours[data.type]?.text ?? "#000000" }
                           bgColor={ colours[data.type]?.background ?? "inherit" }>
                <span className={ "govuk-visually-hidden" }>Type of log: </span>{ data.type }
            </ChangeLogSpan>
        </small>
        {
            data?.relativeUrl
                ? data.relativeUrl.indexOf("details") > -1
                ? <Link to={ data.relativeUrl } className={ "govuk-link govuk-!-font-weight-bold" }>
                    { data.heading }
                </Link>
                : <a href={ data.relativeUrl } className={ "govuk-link govuk-!-font-weight-bold" }>
                    { data.heading }
                </a>
                : data.heading
        }
    </h3>

};  // ChangeLogHeading


export const ChangeLogItem: ComponentType = ({ data, changeTypes, ...props }) => {

    return <section className="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6" {...props}>
        <ChangeLogHeading data={ data }/>
        <ChangeLogItemBody changeTypes={ changeTypes } data={ data }/>
        <Details data={ data }/>
    </section>

}; // ChangeLogItem
