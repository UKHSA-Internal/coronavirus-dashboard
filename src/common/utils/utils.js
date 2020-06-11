import moment from "moment";
import { max, min } from "d3-array";

import type { ParsedParams } from "./utils.types";
import type { RGB } from "../../components/MapTable/MapTable.types";


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


export const createQuery = ( args: ParsedParams, joinBy: string="&", definitionChar: string="?"): string => {

    const params = [];

    for ( const { key, sign, value } of args )
        params.push(encodeURI(`${key}${sign}${value}`));

    return definitionChar + params.join(joinBy)

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