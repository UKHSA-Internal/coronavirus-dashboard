import moment from "moment";
import { max, min } from "d3-array";
import type { ParsedParams } from "./utils.types";

const isNumeric = subject => typeof subject === 'number'


export const sortByDate = (a, b) => {

    const
        dateA = new Date(a),
        dateB = new Date(b);

    return (dateA < dateB) || -((dateA > dateB) || 0)

};


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
 * Moving average
 * --------------
 * Centered moving average.
 *
 * @param data { Array<number> } Array of numbers
 * @param size { number } Size of the moving window
 * @returns { Array<number> } Array of moving averages
 */
export const movingAverage = ( data: number[], size: number ): number[] => {

    const
        N = data.length,
        floor = Math.floor(size / 2),
        ceil = Math.ceil(size / 2);

    let
        movingMean = Array(N).fill(NaN),
        sum ;

    for ( let index = floor; index < N - size; index++ ) {
        sum = 0;

        for ( let sumIndex = index - floor; sumIndex < index + ceil; sumIndex ++ )
            sum = sum + data[sumIndex];

        movingMean[index] = sum / size;
    }

    return movingMean

} // movingAverage


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


export const sum = (arr, key=null) => {

    if ( !key ) return arr.reduce((acc, item) => acc + item, 0);

    return arr.reduce((acc, item) => {
        acc = acc + key(item)
        return acc
    }, 0)

};  // sum


export const firstObjWithMax = ( arr: Array<{[string|number]: [string|number|null]}>, key: ([string|number]) => [string|number|null] ) => {

    const maxValue = max(arr, key);

    for ( const item of arr )
        if (key(item) === maxValue) return item;

};
