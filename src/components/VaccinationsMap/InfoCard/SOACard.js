// @flow

import React from "react";

import useGenericAPI from "hooks/useGenericAPI";
import { MapToolbox } from "../VaccinationsMap.styles";
import Loading from "components/Loading";
import { InfoCard } from "./InfoCard";

import type { ComponentType } from "react";


export const SoaCard: ComponentType<*> = ({ currentLocation, postcodeData, date, areaType, ...props }) => {

    const
        first = useGenericAPI(
            "genericApiSoa",
            null,
            {
                area_type: "msoa",
                area_code: currentLocation,
                metric: "cumVaccinationFirstDoseUptakeByVaccinationDatePercentage"
            },
            "json",
            {date}
        ),
        complete = useGenericAPI(
            "genericApiSoa",
            null,
            {
                area_type: "msoa",
                area_code: currentLocation,
                metric: "cumVaccinationCompleteCoverageByVaccinationDatePercentage"
            },
            "json",
            {date}
        ),
        locationData = useGenericAPI(
            "genericApiCode",
            null,
            { area_type: "msoa", area_code: currentLocation }
        );

    if ( !locationData || !currentLocation || !first || !complete )
        return <MapToolbox><Loading/></MapToolbox>;

    return <InfoCard areaName={ locationData?.msoaName ?? "" }
                     date={ first?.date }
                     first={ first?.payload?.value ?? null }
                     complete={ complete?.payload?.value ?? null }
                     areaCode={ currentLocation }
                     areaType={ areaType }
                     postcode={ currentLocation === postcodeData?.msoa ? postcodeData.postcode : null }
                     { ...props }/>

};