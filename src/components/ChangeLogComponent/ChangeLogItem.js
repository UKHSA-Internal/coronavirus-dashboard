// @flow

import React, { Fragment } from "react";
import moment from "moment";
import { Markdown, Category, DataList, CategoryContainer } from "./ChangeLogComponent.styles";
import { Link } from "react-router-dom";
import { useMarkdown } from "hooks/useMarkdown";
import type { ComponentType } from "react";


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

export const ChangeLogItemBody: ComponentType = ({ data }) => {

    const body = useMarkdown(data?.body)

    return <div className="govuk-body govuk-!-margin-0">
        <Markdown className="govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                  dangerouslySetInnerHTML={{ __html: body }}/>
    </div>

}; // ChangeLogItemBody


const Metrics: ComponentType = ({ data }) => {

    if ( !data?.metrics?.length ) return null;

    return <div className={ "govuk-!-padding-top-4 govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
        <h4 className={ "govuk-heading-s" }>Affected metrics</h4>
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


export const ChangeLogType: ComponentType<*> = ({ type, standAlone=false, ...props }) => {

    return <CategoryContainer standAlone={ standAlone } { ...props } >
        <Category color={ colours[type]?.text ?? "#000000" }
                  bgColor={ colours[type]?.background ?? "inherit" }
                  standAlone={ standAlone }>
            <span className={ "govuk-visually-hidden" }>Log category:</span>
            { type }
        </Category>
    </CategoryContainer>

}; // ChangeLogType

export const ChangeLogHeading: ComponentType = ({ data, standAlone=false }) => {

    return <h3 className={ `govuk-heading-s govuk-!-font-size-${standAlone ? 24 : 19} govuk-!-margin-bottom-1` }
               id={ data.id }>
        <small className={ "govuk-caption-m govuk-!-font-size-19 govuk-!-margin-bottom-1" }>
            <time dateTime={ data.date }>
                <span className={ "govuk-visually-hidden" }>Log date:</span>
                {
                    standAlone
                        ? moment(data.date).format("D MMMM YYYY")
                        : moment(data.date).format("D MMMM")
                }
            </time>
        </small>
        <ChangeLogType type={ data.type } standAlone={ standAlone }/>
        {
            !standAlone
                ? <Link to={ `/details/whats-new/record/${data.id}` }
                        className={ "govuk-link govuk-!-font-weight-bold" }>
                    { data.heading }
                </Link>
                : data.heading
        }
    </h3>;

};  // ChangeLogHeading


export const ChangeLogItem: ComponentType = ({ data, changeTypes, ...props }) => {

    return <li className="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6" {...props}>
        <ChangeLogHeading data={ data }/>
        <ChangeLogItemBody changeTypes={ changeTypes } data={ data }/>
        <Details data={ data }/>
    </li>

}; // ChangeLogItem
