// @flow

import React from "react";

import useTimestamp from "hooks/useTimestamp";
import moment from "moment";
import useApi from "hooks/useApi";
import { MapToolbox } from "../VaccinationsMap.styles";
import Loading from "components/Loading";
import { InfoCard } from "./InfoCard";

import type { ComponentType } from "react";


export const LocalAuthorityCard: ComponentType<*> = ({ currentLocation, date, areaType, ...props }) => {

    const
        timestamp = useTimestamp(),
        dataDate = moment(date).subtract(1, "d"),
        apiData = useApi({
            ...(areaType !== "msoa" && timestamp !== "" )
                ? {
                    conjunctiveFilters: [
                        { key: "areaCode", sign: "=", value: currentLocation },
                        { key: "areaType", sign: "=", value: areaType },
                    ],
                }
                : {},
            cache: true,
            latestBy: "cumVaccinationFirstDoseUptakeByVaccinationDatePercentage",
            structure: {
                date: "date",
                name: "areaName",
                type: "areaType",
                first: "cumVaccinationFirstDoseUptakeByVaccinationDatePercentage",
                complete: "cumVaccinationCompleteCoverageByVaccinationDatePercentage"
            },
            defaultResponse: null
        });

    if ( !currentLocation || areaType === "msoa" ) return null;

    if ( !apiData )
        return <MapToolbox><Loading/></MapToolbox>;

    const data = apiData[0];

    return <InfoCard areaName={ data.name }
                     date={ data.date }
                     first={ data.first }
                     complete={ data.complete }
                     areaCode={ currentLocation }
                     areaType={ areaType }
                     { ...props }/>

};
