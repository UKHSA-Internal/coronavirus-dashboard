// @flow

import React from "react";
import moment from "moment";
import { ChangeLogSpan, Markdown } from "./ChangeLogComponent.styles";
import { Link } from "react-router-dom";

import type { ComponentType } from "react";


const ChangeLogItemBody: ComponentType = ({ data }) => {

    return <div className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">
        <Markdown className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0"
                  dangerouslySetInnerHTML={{ __html: data.body }}/>
        <Link to={ data.relativeUrl } className={ "govuk-link govuk-!-font-weight-bold" }>
            { data.linkText }
        </Link>
    </div>

}; // ChangeLogItemBody


export const ChangeLogItem: ComponentType = ({ data, changeTypes, colour }) => {

    return <div className="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-6">
        <h3 className={ "govuk-heading-s govuk-!-margin-bottom-1" }>
            <small className={ "govuk-caption-m govuk-!-font-size-16 govuk-!-margin-bottom-1 govuk-!-font-weight-bold" }>
                { moment(data.date).format("D MMMM") }
                {/*<ChangeLogSpan color={ colour?.text ?? "#000000" }*/}
                {/*               bgColor={ colour?.background ?? "inherit" }>*/}
                {/*    { data.type }*/}
                {/*</ChangeLogSpan>*/}
            </small>
            { data.headline }
        </h3>
        <ChangeLogItemBody changeTypes={ changeTypes } data={ data }/>
    </div>

}; // ChangeLogItem
