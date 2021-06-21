// @flow

import { useState, useEffect } from "react";

import axios from "axios";
import URLs from "common/urls";

import type { LookupDataType } from "useLookupTable.types";


const useLookupTable = (): LookupDataType | null => {

    const [ lookupTable, setLookupTable ] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(
                'lookupTable_bothWay_v2.json',
                { baseURL: URLs.lookups }
                );

            setLookupTable(data)
        }

        getData()

    }, []);

    return lookupTable

};  // GetLookup


export default useLookupTable;
