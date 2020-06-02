import moment from "moment";
import { max, min } from "d3-array";
import type { ParamItem } from "../components/DashboardHeader/DashboardHeader.types";


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


export const createQuery = ( args: Array<{key: string, sign: string, value: string}>, joinBy: string="&", definitionChar: string="?"): string => {

    const params = [];

    for ( let index = 0; index < args.length; index ++ ) {

        const
            { key, sign, value } = args[index],
            existingValueIndex = params.reduce(
                (acc, item, ind) =>
                    item.startsWith(encodeURI(`${key}${sign}`))
                        ? ind
                        : acc,
                -1
            );

        if (existingValueIndex > -1) {
            params[existingValueIndex] = encodeURI(`${key}${sign}${value}`)
            continue
        }

        params.push(encodeURI(`${key}${sign}${value}`))

    }

    return definitionChar + params.join(joinBy)

} // createHash


export const getParams = (uri: string, separator: string="&"): Array<{key: string, sign: string, value: string}> => {

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


export const getParamValueFor = (params: Array<ParamItem>, keyName: string, defaultValue: string|null=null): string | null => {

    return params
        .reduce((acc, { key, value }) =>
            key === keyName ? value : acc,
            defaultValue
        )

};  // getParamValueFor
