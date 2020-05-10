import React from "react";


export const ArrowUp = () => {

    return <svg role={ "presentation" }
                focusable={ "false" }
                className={ "back-to-top" }
                xmlns={ "http://www.w3.org/2000/svg" }
                width={ "13" }
                height={ "17" }
                viewBox={ "0 0 13 17" }>
        <path fill={ "currentColor" }
              d={ "M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z" }/>
    </svg>

}; // ArrowUp


export const CaretUp = () => {

    return <svg height={ "12" }
                viewBox={ "0 0 1200 1200" }
                width={ "20" }
                xmlns={ "http://www.w3.org/2000/svg" }>
        <path d={ `m1036.571442,526.857147q0,26 -19,45t-45,19l-896,0q-26,0 -45,-19t-19,
        -45t19,-45l448,-448q19,-19 45,-19t45,19l448,448q19,19 19,45z` }/>
    </svg>

}; // CaretUp


export const CaretDown = () => {

    return <svg width={ "20" }
                height={ "12" }
                viewBox={ "0 0 1200 1200" }
                xmlns={ "http://www.w3.org/2000/svg" }>
        <path d={ `m1038.43512,83.653076q0,26 -19,45l-448,448q-19,19 -45,19t-45,-19l-448,
        -448q-19,-19 -19,-45t19,-45t45,-19l896,0q26,0 45,19t19,45z` }/>
    </svg>

}; // CaretDown


export const CaretUpDown = () => {

    return <svg height={ "20" }
                width={ "24" }
                viewBox={ "0 0 25 36" }
                xmlns="http://www.w3.org/2000/svg">
        <path d={ `m25.105327,18.861907q0,0.477077 -0.348634,0.825711l-8.220412,
        8.220412q-0.348634,0.348634 -0.825711,0.348634t-0.825711,-0.348634l-8.220412,
        -8.220412q-0.348634,-0.348634 -0.348634,-0.825711t0.348634,-0.825711t0.825711,
        -0.348634l16.440824,0q0.477077,0 0.825711,0.348634t0.348634,0.825711zm0,
        -7.046067q0,0.477077 -0.348634,0.825711t-0.825711,0.348634l-16.440824,0q-0.477077,
        0 -0.825711,-0.348634t-0.348634,-0.825711t0.348634,-0.825711l8.220412,
        -8.220412q0.348634,-0.348634 0.825711,-0.348634t0.825711,0.348634l8.220412,
        8.220412q0.348634,0.348634 0.348634,0.825711z` }/>
    </svg>

}; // Unsorted
