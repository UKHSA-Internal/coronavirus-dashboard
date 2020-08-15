// @flow

import { useState, useEffect } from "react";

import axios from "axios";

import URLs from "common/urls";

import type { GeoDataResponseType } from "./hooks.types"


const useGeoData = (filename: string, geoKey: string,
                    areaCodeSuffix: string = "cd"): GeoDataResponseType => {

    const
        [geoData, setGeoData] = useState(null),
        areaCodeKey = `${geoKey}${areaCodeSuffix}`,
        baseUrl = URLs.baseGeo;

    useEffect(() => {

        (async () => {

            const { data: responseData } = await axios.get(filename, { baseURL: baseUrl });

            const data = responseData.features.map(f => ({
                ...f,
                properties: {
                    ...f.properties,
                    id: f.properties?.[areaCodeKey] ?? "",
                },
            }));

            setGeoData(data);

        })()

    }, [ filename, baseUrl, areaCodeKey ]);

    return geoData

}; // getGeoData


export default useGeoData;
