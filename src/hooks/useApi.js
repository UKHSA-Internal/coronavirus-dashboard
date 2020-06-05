// @flow

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import URLs from "common/urls";
import { createQuery } from "common/utils";
import deepEqual from "deep-equal";

import type {
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


const useApi = ({ conjunctiveFilters=[], disjunctiveFilters=[], structure,
                    defaultResponse=[], extraParams=[] }: useApiInputs): useApiResponse => {

    const
        [ data, setData ] = useState(defaultResponse),
        prevConjunctiveParams =  usePrevious(conjunctiveFilters),
        prevDisjunctiveParams =  usePrevious(disjunctiveFilters),
        prevStructure =  usePrevious(structure),
        prevExtraParams =  usePrevious(extraParams);

    useEffect(() => {

        const
            conjunctive = createQuery(conjunctiveFilters, ";", "") || "",
            disjunctive = createQuery(disjunctiveFilters, "|", "") || "",
            paramString = `${conjunctive}${(conjunctive && disjunctive) ? ";" : ""}${disjunctive}`,
            urlParams = createQuery([
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

        (async () => {

            if (
                !deepEqual(prevConjunctiveParams, conjunctiveFilters) ||
                !deepEqual(prevDisjunctiveParams, disjunctiveFilters ) ||
                !deepEqual(prevStructure, structure) ||
                !deepEqual(prevExtraParams, extraParams)
            )
                try {
                    const { data: dt } = await axios.get(URLs.api + urlParams);
                    setData(dt.data)
                } catch (e) {
                    console.error(e)
                }

        })()

    }, [ conjunctiveFilters, extraParams, structure, disjunctiveFilters ])

    return data

};  // useApi


export default useApi;
