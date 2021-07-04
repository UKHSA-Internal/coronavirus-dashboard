// @flow

import React, { useState, useEffect } from "react";

import useGenericAPI from "hooks/useGenericAPI";
import moment from "moment";
import Loading from "components/Loading";
import useTimestamp from "hooks/useTimestamp";

import type { ComponentType } from "react";


export const DateStamp: ComponentType<*> = ({ date }) => {

    const websiteTimestamp = useTimestamp();
    const [timestamp, setTimestamp] = useState(null);
    const payload = useGenericAPI(
            "genericApiSoa",
            null,
            {
                area_type: "nation",
                area_code: "E92000001",
                metric: "cumVaccinationCompleteCoverageByVaccinationDatePercentage"
            },
            "json",
            {date},
            "error",
            "empty"
        );

    useEffect(() => {
        if ( websiteTimestamp ) {
            setTimestamp(
                payload === "error" || payload === "empty"
                    ? moment(websiteTimestamp).subtract(1, "d")
                    : payload?.date
                    ? moment(payload.date)
                    : null
            )
        }
    }, [ payload, websiteTimestamp ]);

    if ( !timestamp ) return <Loading/>;

    return <time dateTime={ timestamp.toISOString() }>{ timestamp.format("D MMMM YYYY") }</time>;


};  // DateStamp
