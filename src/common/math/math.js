export const sum = (arr, key=null) => {

    if ( !key ) return arr.reduce((acc, item) => acc + item, 0);

    return arr.reduce((acc, item) => {
        acc = acc + key(item)
        return acc
    }, 0)

};  // sum
