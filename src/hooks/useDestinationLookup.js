// @flow

import { useState, useEffect, useRef } from "react";

import axios from "axios";
import URLs from "common/urls";
import { createQuery } from "common/utils";

import deepEqual from "deep-equal";


const usePrevious = (value) => {

    const ref = useRef([]);

    useEffect(() => {
        ref.current = value
    })

    return ref.current

};  // usePrevious


const useDestinationLookup = (conjunctiveFilters=[]) => {

    const
        [ lookupTable, setLookupTable ] = useState(null),
        prevConjunctiveParams =  usePrevious(conjunctiveFilters);

    useEffect(() => {
        const
            conjunctive = createQuery(conjunctiveFilters, ";", "") || "",
            urlParams = createQuery([{
                key: 'filters',
                sign: '=',
                value: conjunctive
            }, {
                key: 'structure',
                sign: '=',
                value: JSON.stringify({
                    destinations: "destinations"
                })
            }]);

        console.log(urlParams);

        (async () => {

            if ( conjunctive && !deepEqual(prevConjunctiveParams, conjunctiveFilters) ) {
                const { data } = await axios.get(URLs.lookupApi + urlParams);
                setLookupTable(data.data?.[0]?.destinations ?? {})
            }
        })()

    });

    return lookupTable

};  // GetLookup


export default useDestinationLookup;
