import { zip } from "d3-array";
import { roundTo } from "../math";


export const leastSquareRegression =  (x, y, domain) => {

    const
        XY = zip(x, y),
        N = XY.length,
        sigmaXY = XY.reduce((acc,[x_i, y_i]) => acc + (x_i * y_i), 0),
        sigmaX =  x.reduce((acc, val) => acc + val, 0),
        sigmaY =  x.reduce((acc, val) => acc + val, 0),
        sigmaX2 =  x.reduce((acc, val) => acc + (val * val), 0);

    const
        numerator = (N * sigmaXY) - (sigmaX * sigmaY),
        denominator = (N * sigmaX2) - (sigmaX * sigmaX),
        m = numerator / denominator,
        b  =  (sigmaY - (m * sigmaX)) / N,
        Y  = [],
        X = domain;

    for ( let x_i of X )
        Y.push(Math.round(m * x_i + b))

    return [X, Y]

};  // leastSquareRegression


const numberOrNan = value => typeof value === 'number' ? value : NaN;


/**
 * Moving average
 * --------------
 * Centered moving average.
 *
 * @param data { Array<number> } Array of numbers
 * @param size { number } Size of the moving window
 * @param round { number }
 * @returns { Array<number> } Array of moving averages
 */
export const movingAverage = ( data: number[], size: number, round: number=1 ): number[] => {

    const
        N = data.length,
        floor = Math.floor(size / 2),
        ceil = Math.ceil(size / 2);

    let
        movingMean = Array(N).fill(NaN),
        sum ;

    for ( let index = floor; index < (N + size); index++ ) {

        if ( typeof data[index] === "number" )
            sum = 0;
        else
            continue;

        for ( let sumIndex = index - floor; sumIndex < (index + ceil); sumIndex ++ )
            sum = sum + numberOrNan(data[sumIndex]);

        movingMean[index] = roundTo(sum / size, round);
    }

    return movingMean

} // movingAverage
