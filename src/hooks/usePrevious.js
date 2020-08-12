// @flow

import { useRef, useEffect } from "react";


const usePrevious  = ( value: any ) => {

    const ref = useRef(value);

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};  // usePrevious


export default usePrevious;
