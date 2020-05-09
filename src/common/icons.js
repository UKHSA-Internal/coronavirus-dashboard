import React from "react";


export const ArrowUp = ({ ...props }) => {

    return <span { ...props }>
        <svg role={ "presentation" }
             focusable={ "false" }
             className={ "back-to-top" }
             xmlns={ "http://www.w3.org/2000/svg" }
             width={ "13" }
             height={ "17" }
             viewBox={ "0 0 13 17" }>
            <path fill={ "currentColor" }
                  d={ "M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z" }/>
        </svg>
    </span>

}; // ArrowUp


export const CaretUp = ({ ...props }) => {

    return <span { ...props }>
        <svg height={ "22" }
             viewBox={ "0 0 1792 1792" }
             width={ "22" }
             xmlns={ "http://www.w3.org/2000/svg" }>
            <path d={ "M1408 704q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" }/>
        </svg>
    </span>

}; // CaretUp


export const CaretDown = ({ ...props }) => {

    return <span { ...props }>
        <svg height={ "22" }
             viewBox={ "0 0 1792 1792" }
             width={ "22" }
             xmlns={ "http://www.w3.org/2000/svg" }>
            <path d={ "M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" }/>
        </svg>
    </span>

}; // CaretDown
