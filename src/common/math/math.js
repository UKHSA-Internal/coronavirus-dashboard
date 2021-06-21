export const sum = (arr, key=null) => {

    if ( !key ) return arr.reduce((acc, item) => acc + item, 0);

    return arr.reduce((acc, item) => {
        acc = acc + key(item)
        return acc
    }, 0)

};  // sum


export const roundTo = (value: number, precision: number=0) => {

    const multiplier = Math.pow(10, precision);

    return parseFloat(Math.round(value * multiplier) / multiplier).toFixed(precision)

};  // roundTo
