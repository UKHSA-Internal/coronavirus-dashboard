// @flow

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import useDestinationLookup from "hooks/useDestinationLookup";

import { getParams } from "common/utils";
// import { PathNameMapper } from "./Constants";


// const usePrevious = ( value ) => {
//
//     const
//         ref = useRef("");
//
//     useEffect(() => {
//
//         ref.current = value
//
//     })
//
//     return ref.current
//
// };  // usePrevious


export const Mapper = {
    "/": "summary",
    "/cases": "cases",
    "/testing": "testing",
    "/healthcare": "healthcare",
    "/deaths": "deaths",
};

// const DestinationProposal = ({ queries, pathname }) => {
//
//     const
//         params = getParams(queries),
//         destinationPage = Mapper?.[pathname] ?? "",
//         destination = useDestinationLookup(params),
//         [ dispatch, setDispatch ] = useState(null);
//
//     console.log(">>", pathname);
//     console.log(queries);
//     console.log(destinationPage, destination);
//
//     useEffect(() => {
//
//         if ( destinationPage && destination ) {
//             setDispatch(<p>
//                 Not available. Go to { destination[pathname].areaType }&nbsp;{ destination[pathname].areaCode } instead.
//             </p>)
//         }
//
//     }, [ destination ])
//
//     return dispatch
//
// };  // DestinationProposal


const LocationProposer = ({ lastParams, referrer }) => {

    const
        { location: { pathname: currentLocation } } = useHistory(),
        destinationPage = Mapper?.[currentLocation] ?? "",
        destination = useDestinationLookup(lastParams),
        [dispatch, setDispatch] = useState(null);
        // prevLocation = usePrevious(currentLocation);

    console.log(referrer, currentLocation)

    useEffect(() => {

        if ( currentLocation !== referrer && destinationPage && destination ) {
            console.log(destination);

            setDispatch(null
            //     <p style={{ fontFamily: "monospace" }}>
            //     <strong>FEATURE TEST [Dev use]:</strong><br/>
            //     Referrer: { referrer }<br/>
            //     Destination: { destinationPage }<br/>
            //     Suggestion: { destination[destinationPage].areaName }
            // </p>
            )
        } else {
            setDispatch(null)
        }

    }, [ destination, destinationPage ])


    // if ( currentLocation !== referrer )
    //     return <DestinationProposal queries={ lastParams } pathname={ currentLocation }/>;

    return dispatch;

};  // LocationProposer


export default LocationProposer;
