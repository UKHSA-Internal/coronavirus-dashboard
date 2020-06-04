// @flow

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import URLs from "common/urls";
import { createQuery } from "common/utils";
import deepEqual from "deep-equal";

import type {
    useApiStructureInput,
    useApiResponseInput,
    useApiResponse
} from "./hooks.types";
import type { ParsedParams } from "common/utils.types";


const usePrevious = (value) => {

    const ref = useRef([]);

    useEffect(() => {
        ref.current = value
    })

    return ref.current

};  // usePrevious


const useApi = ( params: ParsedParams, structure: useApiStructureInput, defaultResponse: useApiResponseInput=[], extraParams: ParsedParams=[] ): useApiResponse => {

    const
        [ data, setData ] = useState(defaultResponse),
        prevParams =  usePrevious(params);

    useEffect(() => {

        const urlParams = createQuery([
            {
                key: 'filters',
                sign: '=',
                value: createQuery(params, ";", "")
            },
            ...extraParams,
            {
                key: 'structure',
                sign: '=',
                value: JSON.stringify(structure)
            }
        ]);

        (async () => {

            if ( !deepEqual(prevParams, params) )
                try {
                    const { data: dt } = await axios.get(URLs.api + urlParams);
                    setData(dt.data)
                } catch (e) {
                    console.error(e)
                }

        })()

    }, [ params, extraParams, structure ])

    return data

};  // useApi


export default useApi;
