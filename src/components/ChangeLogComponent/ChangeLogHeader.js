// @flow

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getParams, getParamValueFor, getPathAttributes } from "common/utils";
import { ChangeLogBanner, ChangeLogBannerContainer, ChangeLogBannerTag } from "./ChangeLogComponent.styles";

import type { ChangeLogInputProps } from "./ChangeLogComponent.types";
import type { ComponentType } from "react";
import useGenericAPI from "hooks/useGenericAPI";
import { useLocation } from "react-router";
import { DefaultParams } from "common/utils";


export const ChangeLogHeader: ComponentType<*> = ({ timestamp, ...props }: ChangeLogInputProps) => {

    const { pathname, search } = useLocation();
    const { title="Daily Summary", hasLog=true } = getPathAttributes(pathname);
    const urlParams = getParams(search);
    const areaParams = urlParams.length ? urlParams : DefaultParams;

    const data = useGenericAPI(
        "genericApiLogBanners",
        null,
        {
            area_type: getParamValueFor(areaParams, "areaType"),
            area_name: getParamValueFor(areaParams, "areaName"),
            page: title,
            date: moment(timestamp).format("YYYY-MM-DD")
        },
        "json",
        null,
        null
    );

    if ( !hasLog || !data ) {
        return null;
    }

    return <ChangeLogBannerContainer>{
        data.map((item, index) => <ChangeLogBanner key={ `change-log-banner-${index}` }>
            <div className={ "govuk-body-s govuk-!-font-weight-bold govuk-!-margin-bottom-0" }>
                <ChangeLogBannerTag>
                    { item.type }
                </ChangeLogBannerTag>
                <time dateTime={ item.date }>
                    { moment(item.date).format("D MMMM YYYY") }
                </time> &mdash; { item.heading }
                <Link to={ `/details/whats-new/record/${ item.id }` }
                      className={ "govuk-link govuk-link--no-visited-state govuk-!-margin-left-1" }>
                    More
                </Link>
            </div>
        </ChangeLogBanner>)
    }</ChangeLogBannerContainer>

};  // ChangeLogHeader
