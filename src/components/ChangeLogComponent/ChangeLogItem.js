// @flow

import React, { useState, useMemo } from "react";
import moment from "moment";
import { Markdown } from "./ChangeLogComponent.styles";
import { Link } from "react-router-dom";

import type { ComponentType } from "react";
import remark from "remark";
import html from "remark-html";


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

    return <div className="govuk-body govuk-!-margin-top-0 govuk-!-margin-bottom-0">
        <Markdown className="govuk-body govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                  dangerouslySetInnerHTML={{ __html: body }}/>
    </div>

}; // ChangeLogItemBody


const Details: ComponentType = ({ data }) => {

    const details = useMarkdown(data?.details);

    if ( !details ) return null;

    return <details className="govuk-details govuk-!-margin-top-2"
                    data-module="govuk-details">
        <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">
                Additional details
            </span>
        </summary>
        <Markdown className="govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                  dangerouslySetInnerHTML={{ __html: details }}/>
    </details>

};  // Details


const ChangeLogHeading: ComponentType = ({ data }) => {

    return <h3 className={ "govuk-heading-s govuk-!-font-size-19 govuk-!-margin-bottom-1" }>
        <small className={ "govuk-caption-m govuk-!-font-size-19 govuk-!-margin-bottom-1" }>
            <time dateTime={data.date}>
                <span className={ "govuk-visually-hidden" }>Date of change: </span>
                { moment(data.date).format("D MMMM") }
            </time>
            {/*<ChangeLogSpan color={ colour?.text ?? "#000000" }*/}
            {/*               bgColor={ colour?.background ?? "inherit" }>*/}
            {/*    { data.type }*/}
            {/*</ChangeLogSpan>*/}
        </small>
        {
            data?.relativeUrl
                ? <Link to={ data.relativeUrl } className={ "govuk-link govuk-!-font-weight-bold" }>
                    { data.headline }
                </Link>
                : data.headline
        }
    </h3>

};  // ChangeLogHeading


export const ChangeLogItem: ComponentType = ({ data, changeTypes, colour }) => {

    return <div className="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6">
        <ChangeLogHeading data={ data }/>
        <ChangeLogItemBody changeTypes={ changeTypes } data={ data }/>
        <Details data={ data }/>
    </div>

}; // ChangeLogItem
