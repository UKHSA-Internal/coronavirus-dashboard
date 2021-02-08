// @flow

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { heading2id } from "common/utils";
import { ChangeLogBanner } from "./ChangeLogComponent.styles";

import type { ChangeLogInputProps } from "./ChangeLogComponent.types";
import type { ComponentType } from "react";


export const ChangeLogHeader: ComponentType<*> = ({ data, ...props }: ChangeLogInputProps) => {

    if ( !data ) {
        return null;
    }

    return <>{
        data.map((item, index) => <ChangeLogBanner key={ `change-log-banner-${index}` }>
            <div className={ "govuk-body-s govuk-!-font-weight-bold govuk-!-margin-bottom-0" }>
                <time dateTime={ item.date }>
                    { moment(item.date).format("D MMMM YYYY") }
                </time> &mdash; { item.headline }
                <Link to={ `/details/whats-new#${ heading2id(item.headline) }` }
                      className={ "govuk-link govuk-link--no-visited-state govuk-!-margin-left-1" }>
                    More
                </Link>
            </div>
        </ChangeLogBanner>)
    }</>

};  // ChangeLogHeader
