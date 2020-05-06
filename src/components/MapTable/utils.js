import { transpose } from "d3-array";

import { RatePerPopulation } from "./constants";

import type {
    DataObjectType,
    PopulationDataType,
    ValuesDataType,
    KeyedDataType,
    RGB,
    URIParameters
} from "./MapTable.types"


export const hexToRgb = (hex: string): RGB => {

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }

}; // hexToRgb


export const glAvailable = (): boolean => {

    if ( !window.WebGLRenderingContext )
        return false; // WebGL is not supported

    // WebGL is supported
    const
        canvas = document.createElement("canvas"),
        drivers = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    let context = false;

    for ( const driverName of drivers ) {

        try {

            context = canvas.getContext(driverName);

            if ( context && typeof context.getParameter === "function" )
                return true;  // WebGL is enabled

        } catch (e) { }

    }

    return false;  // WebGL is disabled

}; // glAvailable


export const getParams = (uri: string): URIParameters => {

    let results = {};

    uri
        .replace("#", "")
        .split("&")
        .filter(item => item.indexOf("=") > -1)
        .map(item => {
            const [key, value] = item.split("=");
            results[key] = value
        })

    return results

}; // getParams


export const prepAsKey = (value: string): string => {

    return value?.replace(/\s/g, "_")?.toLowerCase() ?? ""

}; // prepAsKey


export const createHash = ( kwargs: URIParameters ): string => {

    return '#' + Object
        .keys(kwargs)
        .map(key => `${prepAsKey(key)}=${prepAsKey(kwargs[key])}`)
        .join("&")

} // createHash


export class Data implements DataObjectType {

    constructor(data: any, pData: PopulationDataType) {

        const
            [DATA_VALUES, RATE_DATA] = [0, 1],
            dataValues = Object
                .keys(data)
                .map(d => ({ key: d,  value: this.#valueGetter(d, data) })),
            rateData = dataValues.map(({key, value}) => ({
                key: key,
                value: (value / this.#getPopulationFor(key, pData)) * RatePerPopulation
            }));

        this.valuesData = transpose([dataValues, rateData])
            .map(item => ({
                key: item[DATA_VALUES].key,
                name: this.#nameGetter(item[DATA_VALUES].key, data),
                rawData: item[DATA_VALUES],
                rateData: { key: item[RATE_DATA].key, value: item[RATE_DATA].value }
            }))

        this.keyedValues = {};

        for ( const { key, name, rawData, rateData } of this.valuesData ) {

            this.keyedValues[key] = {
                name: name,
                rawData: rawData,
                rateData: rateData
            }

        }

    } // constructor

    #getPopulationFor = (id: string, pData: PopulationDataType): number => {

        return pData?.[id] ?? 1

    }; // getPopulationFor

    #nameGetter = (d: string, data: any): string => {

        return data?.[d]?.name?.value ?? ""

    } // nameGetter

    #valueGetter = (d: string, data): number => {

        return data?.[d]?.totalCases?.value ?? 0
        // this.rawData?.[d]?.totalCases?.value ?? 0

    }; // valueGetter

    get values (): Array<ValuesDataType> {

        return this.valuesData

    } // values

    getByKey (key: string): KeyedDataType {

        return this.keyedValues[key]

    } // getByKey

} // Data
