// @flow

import React from "react";
import moment from "moment";
import { Markdown, Category, CategoryContainer } from "./ChangeLogComponent.styles";
import { Link } from "react-router-dom";
import { useMarkdown } from "hooks/useMarkdown";
import AffectedLogMetrics from "components/AffectedLogMetrics";

import type { ComponentType } from "react";
import AssociatedAreas from "../AssociatedAreas";


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
        <AffectedLogMetrics metrics={ data?.metrics ?? [] }/>
    </details>

};  // Details


export const ChangeLogType: ComponentType<*> = ({ type, standAlone=false, ...props }) => {

    return <CategoryContainer standAlone={ standAlone } { ...props } >
        <span className={ "govuk-visually-hidden" }>Log category:</span>
        <Category color={ colours[type]?.text ?? "#000000" }
                  bgColor={ colours[type]?.background ?? "inherit" }
                  standAlone={ standAlone }
                  dangerouslySetInnerHTML={{ __html: type.replace(/\s/g, "&nbsp;") }}/>
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
        <AssociatedAreas areas={ data?.applicable_to ?? [] } className={ "govuk-!-margin-bottom-2" }/>
        <Details data={ data }/>
    </li>

}; // ChangeLogItem
