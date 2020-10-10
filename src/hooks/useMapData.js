// @flow

import { useState, useEffect, useRef } from "react";

import axios from "axios";
import URLs from "common/urls";


export const useMapReference = (areaType, category): any => {

    const [ reference, setReference ] = useState(null);

    useEffect(() => {
        (async () => {
            if ( areaType && category ) {
                const { data } = await axios.get(
                    `${ areaType }/${ category }/reference.json`,
                    { baseURL: URLs.mapData }
                );
                setReference(data)
            }
        })()
    }, [areaType, category]);

    return reference

};  // useMapReference


export const useMapData = (path): any => {

    const cachedData = useRef({});
    const [ data, setData ] = useState(null);

    useEffect(() => {

        (async () => {

            if ( !path ) {

                setData(null);

            }
            else if ( path in cachedData.current ) {

                setData(cachedData.current[path])

            }
            else {

                try {
                    const { data, status } = await axios.get(path, { baseURL: URLs.downloads });

                    if ( status < 400 ) {
                        cachedData.current[path] = data;
                        setData(data)
                    } else {
                        setData([])
                    }
                } catch (e) {
                    console.error(e)
                    setData([])
                }

            }

        })()

    }, [ path ]);

    return data

};  // useMapData


export const useFullRollingRates = (areaType): any => {

    const cachedData = useRef([]);
    const [ data, setData ] = useState(null);

    useEffect(() => {

        (async () => {

            if ( !areaType ) {

                setData([]);

            }
            else if ( areaType in cachedData.current ) {

                setData(cachedData.current[areaType])

            }
            else {

                try {
                    const { data, status } = await axios.get(`/maps/data/${areaType}-RollingRate.json`, { baseURL: URLs.downloads });

                    if ( status < 400 ) {
                        cachedData.current[areaType] = data;
                        setData(data)
                    } else {
                        setData([])
                    }
                } catch (e) {
                    console.error(e)
                    setData([])
                }

            }

        })()

    }, [ areaType ]);

    return data

};  // useFullRollingRates


export const useMapLookupTable = (): any => {

    const [ lookupTable, setLookupTable ] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                "lookup_v1.json",
                { baseURL: URLs.mapData }
                );
            setLookupTable(data)
        })()
    }, []);

    return lookupTable

};  // useMapLookupTable
