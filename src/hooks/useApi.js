// @flow

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import URLs from "common/urls";
import { createQuery } from "common/utils";
import deepEqual from "deep-equal";

import type {
    generateUrlInputs,
    useApiInputs,
    useApiResponse
} from "./hooks.types";


const usePrevious = (value) => {

    const ref = useRef([]);

    useEffect(() => {
        ref.current = value
    })

    return ref.current

};  // usePrevious


export const generateUrl = ({ conjunctiveFilters=[], disjunctiveFilters=[], structure,
                        extraParams=[], endpoint="mainApi"}: generateUrlInputs): string => {

    const
        conjunctive = createQuery(conjunctiveFilters, ";", "") || "",
        disjunctive = createQuery(disjunctiveFilters, "|", "", false) || "",
        paramString = `${conjunctive}${(conjunctive && disjunctive) ? ";" : ""}${disjunctive}`;

    return URLs[endpoint] + createQuery([
        {
            key: 'filters',
            sign: '=',
            value: paramString
        },
        ...extraParams,
        {
            key: 'structure',
            sign: '=',
            value: JSON.stringify(structure)
        }
    ]);

};  // generateUrl


const useApi = ({ conjunctiveFilters=[], disjunctiveFilters=[], structure,
                    defaultResponse=[], extraParams=[],
                    endpoint="mainApi"}: useApiInputs): useApiResponse => {

    const
        [ data, setData ] = useState(defaultResponse),
        prevConjunctiveParams =  usePrevious(conjunctiveFilters),
        prevDisjunctiveParams =  usePrevious(disjunctiveFilters),
        prevStructure =  usePrevious(structure),
        prevExtraParams =  usePrevious(extraParams);

    useEffect(() => {

        (async () => {

            if (
                (
                    conjunctiveFilters.length > 0 ||
                    disjunctiveFilters.length > 0 ||
                    extraParams.length > 0
                ) && (
                    !deepEqual(prevConjunctiveParams, conjunctiveFilters) ||
                    !deepEqual(prevDisjunctiveParams, disjunctiveFilters ) ||
                    !deepEqual(prevStructure, structure) ||
                    !deepEqual(prevExtraParams, extraParams)
                )
            ) {
                try {
                    const { data: dt, status } = await axios.get(generateUrl({
                        conjunctiveFilters:  conjunctiveFilters,
                        disjunctiveFilters: disjunctiveFilters,
                        structure: structure,
                        extraParams: extraParams,
                        endpoint: endpoint
                    }));

                    setData(status < 400 ? dt.data : null)
                } catch (e) {
                    console.error(e)
                    setData([])
                }
            }

        })()

    },
        [
            conjunctiveFilters,
            disjunctiveFilters,
            endpoint,
            extraParams,
            prevConjunctiveParams,
            prevDisjunctiveParams,
            prevExtraParams,
            prevStructure,
            structure
        ]
    )

    return data

};  // useApi


export default useApi;
