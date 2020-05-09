import moment from "moment";
import { max, min } from "d3-array";

const isNumber = subject => typeof subject === 'number'


const sortFunc = (a, b) => {

    const
        dateA = new Date(a),
        dateB = new Date(b);

    // if (dateA < dateB) return 1;

    return (dateA < dateB) || -((dateA > dateB) || 0)

};


const dateRange = (startDate, stopDate): Array<string> => {

    const
        stop = moment(stopDate),
        days = stop.diff(moment(startDate), "days"),
        dateArray = Array(days).fill("YYYY-MM-DD");

    let currentDate = moment(startDate);

    for (let index = 0; index <= days; index ++) {
        dateArray[index] = currentDate.format('YYYY-MM-DD');
        currentDate = currentDate.add(1, 'days');
    }

    return dateArray;

}; // getDates


export const fillDateGaps = (data: Array<any>, defaultValue: number = 0): Array<any> => {

    const groupedByDate = {};

    for (const { date, value } of data) 
        groupedByDate[date] = value;

    for (const date of dateRange(min(data, d => d.date), max(data, d => d.date)))
        groupedByDate[date] = groupedByDate?.[date] ?? defaultValue;

    return Object
        .keys(groupedByDate)
        .sort(sortFunc)
        .map(date => ({
            date: date,
            value: groupedByDate[date]
        }))

}; // fillDateGaps


/**
 * Moving average
 * --------------
 * Courtesy of `kaelzhang`_, under MIT License.
 *
 * .. _kaelzhang: https://github.com/kaelzhang/moving-averages
 *
 * @param data { Array<number> } Array of numbers
 * @param size { number } Size of the moving window
 * @returns { Array<number> } Array of moving averages
 */
export const movingAverage = ( data: number[], size: number ): number[] => {
    const
        length = data.length,
        prepare = size - 1,
        ret = Array(length).fill(NaN);

    let
        sum = 0,
        i = 0,
        counter = 0,
        datum;

    for ( ; i < length && counter < prepare; i++ ) {
        datum = data[i]

        if ( isNumber(datum) ) {
            sum += datum;
            counter++
        }
    }

    for ( ; i < length; i++ ) {
        datum = data[i]

        if ( isNumber(datum) )
            sum += datum;


        if ( isNumber(data[i - size]) )
            sum -= data[i - size];

        ret[i] = sum / size
    }

    return ret.slice(size - 1)

} // movingAverage
