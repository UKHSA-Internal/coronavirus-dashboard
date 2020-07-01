import moment from "moment";
import { max, min, group } from "d3-array";

import type { ParsedParams } from "./utils.types";
import type { RGB } from "components/MapTable/MapTable.types";
import { generateUrl } from "hooks/useApi";


export const sortByDate = (a, b) => {

    const
        dateA = new Date(a),
        dateB = new Date(b);

    return (dateA < dateB) || -((dateA > dateB) || 0)

};  // sortByDate


const dateRange = (startDate, stopDate): Array<string> => {

    const
        stop = moment(stopDate),
        days = stop.diff(moment(startDate), "days"),
        dateArray = Array(days).fill("YYYY-MM-DD");

    let currentDate = moment(startDate);

    for ( let index = 0; index <= days; index ++ ) {
        dateArray[index] = currentDate.format('YYYY-MM-DD');
        currentDate = currentDate.add(1, 'days');
    }

    return dateArray;

}; // getDates


export const fillDateGaps = (data: Array<any>, defaultValue: number = 0): Array<any> => {

    const
        dateMin = min(data, d => d.date),
        dateMax = max(data, d => d.date),
        groupedByDate = data.reduce((acc, { date, value }) => {
            acc[date] = value;
            return acc
        }, {})


    for (const date of dateRange(dateMin, dateMax))
        groupedByDate[date] = groupedByDate?.[date] ?? defaultValue;

    return Object
        .keys(groupedByDate)
        .sort(sortByDate)
        .map(date => ({
            date: date,
            value: groupedByDate[date]
        }))

}; // fillDateGaps


/**
 * Composes URL query parameters.
 *
 * @param args { ParsedParams }
 *      Array of parameters, structured as follows:
 *
 *          [
 *              { key: "", sign: "", value:"" }
 *          ]
 *
 * @param joinBy { string }
 *      Character used to separate individual queries. [Default: ``&``]
 * @param definitionChar { string }
 *      Character to be prepended to the query string. [Default: ``?``]
 * @param removeDuplicates { boolean }
 * @returns { string }
 *      The query; starting with ``definitionChar`` and separated using ``joinBy``.
 */
export const createQuery = ( args: ParsedParams, joinBy: string="&", definitionChar: string="?", removeDuplicates=true ): string => {

    let params = "";

    for ( const { key, sign, value } of args ) {

        const
            fullQuery = `${key}${sign}${value}`,
            partialQueryWithSign = `${key}${sign}`,
            fullPattern = new RegExp(`(${fullQuery})`),
            partialPattern = new RegExp(`(${partialQueryWithSign}[A-Za-z0-9\-,\\s]*)`);

        if ( fullPattern.exec(params) && removeDuplicates ) continue;

        if ( partialPattern.exec(params) && removeDuplicates ) {
            params = params.replace(partialPattern, fullQuery)
            continue
        }

        params = params + ( params.length > 0 ? joinBy : "" ) + fullQuery

    }

    // Remove the trailing `joinBy` char if one exists
    if ( joinBy !==  "" )
        params = params.replace(new RegExp(`${"\\" + joinBy}+$`), "");

    return definitionChar + encodeURI(params)

} // createHash


export const getParams = (uri: string, separator: string="&"): ParsedParams => {

    return decodeURIComponent(uri)
        .replace("?", "")
        .split(separator)
        .reduce((acc, item) => {
            const found = /^([a-z]+)([=<>!]{1,2})(.+)$/i.exec(item)

            if (!found) return acc;

            return [
                ...acc,
                {
                    key: found[1],
                    value: found[3],
                    sign: found[2]
                }
            ]
        }, [])

}; // getParams


export const getParamValueFor = (params: Array<ParsedParams>, keyName: string, defaultValue: string|null=null): string | null => {

    return params
        .reduce((acc, { key, value }) =>
            key === keyName ? value : acc,
            defaultValue
        )

};  // getParamValueFor


export const firstObjWithMax = ( arr: Array<{[string|number]: [string|number|null]}>, key: ([string|number]) => [string|number|null] ) => {

    const maxValue = max(arr, key);

    for ( const item of arr )
        if (key(item) === maxValue) return item;

};


export const hexToRgb = (hex: string): RGB => {

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }

}; // hexToRgb


export const strFormat = (str, { args, kwargs }) => {

    let unkeyedIndex = 0;

    return str.replace(/{(\w*)}/g, ( match, key ) => {

        if ( key === '' ) {

            key = unkeyedIndex;
            unkeyedIndex++
        }

        if ( key === +key ) {

            return args[key] !== 'undefined'
                ? args[key]
                : match;

        } else {

            if ( kwargs.hasOwnProperty(key) ) return kwargs[key];

            return match

        }

    })

};  // strFormat



/**
 * Iterates through the data until it finds a valid value (not null) and
 * returns the value with its corresponding date:
 *
 *      { date: 'DATE', value: VALUE }
 *
 * If no valid value is found, it will return:
 *
 *      { date: null, value: null }
 *
 * @param data { Array<{ [string]: string} > | number | null }
 *        Must always be sorted by date (descending).
 *
 * @param valueKey { { date: string | null  , value: string | number | null } }
 *        Key for the value whose validity is tested for a given date.
 *
 * @returns { { date: string | null, value: string | number | null } }
 */
export const getMaxDateValuePair = ( data: Array<{ [string]: string | number | null }>, valueKey: string ): { date: string | null, value: string | number | null } =>  {

    if ( !valueKey || !data ) return { date: null, value: null };

    for ( const { [valueKey]: value, date } of data ) {

        if ( value )
            return { date: moment(date).format("dddd, D MMMM YYYY"), value: value };

    }

    return { date: null, value: null }

};  // getMaxDateValuePair


/**
 * Converts a ``Map`` to a JSON object.
 *
 * @param map { Map }
 * @returns { Object }
 */
export const map2Object = ( map ): Object => {

    const out = Object.create(null)

    map.forEach((value, key) => {
        out[key] = value instanceof Map
            ? map2Object(value)
            : value
    })

    return out

};  // map2Object


export const groupBy = (arr, key) => {

    return map2Object(group(arr, key))

};  // groupBy


/**
 *
 * .. attention::
 *      The ``data`` variable is expected to be ordered (descending) in
 *      using the desired ``key``.
 *
 * @param data { Array<{ [any]: any }> }
 * @param keys { any }
 * @returns { Array<{ [any]: any }> }
 */
export const dropLeadingZeros = (data: Array<{ [any]: any }>, ...keys) => {

    let sum = 0;

    for ( let index = data.length - 1; index > 0; index-- ) {

        sum = keys.reduce((acc, key) => acc + data[index][key], 0);

        if ( sum !== 0 ) return data.slice(0, index + 1);

    }

    return []

};  // dropLeadingZeros


export const fieldToStructure = (fields, params, extraParams=[]) => {

    const  structure = { date: "date" };

    for ( const { key } of params ) {
        structure[key] = key;
    }

    for ( const { value } of fields ) {
        structure[value] = value
    }

    return generateUrl({
        conjunctiveFilters: params,
        structure: structure,
        defaultResponse: [],
        extraParams: extraParams
    })

};  // fieldToStructure


export const isIE = () => {

    const
        ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");

    return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);

};

export const analytics = ({ category, action, label, value }): void => {

    if ( "ga" in window ) {
        const tracker = window.ga.getAll()[0];

        tracker && tracker.send('event', category, action, label, value);
    }

};  // analytics