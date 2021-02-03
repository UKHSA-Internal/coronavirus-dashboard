// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import MetricAvailability from "components/MetricAvailability";

const Metrics = () => {

    // const data = useGenericAPI("metricsAvailability", [], "json");

    const data = {"References":{"categories":{"cases":"cases","testing":"testing","vaccination":"vaccination","deaths":"deaths","healthcare":"healthcare","other":"other"},"types":{"cumulative":"cumulative","daily":"daily","demographics":"demographics","eventDate":"eventDate","nso":"nso","rate":"rate","reportingDate":"reportingDate","rollingRate":"rollingRate","weekly":"weekly"}},"metrics":{"alertLevel":{"PUBLISHED":true,"abstract":null,"availability":{"ltla":"ES"},"dateAdded":"2021-02-03","dateDeprecated":null,"description":"alertLevel.md","methodology":null,"sources":{"England":null,"Scotland":null},"tags":["other"],"updateFrequency":null},"capacityPillarFour":{"PUBLISHED":true,"abstract":null,"availability":{"overview":"K"},"dateAdded":"2021-02-02","dateDeprecated":null,"description":"capacityPillarFour.md","methodology":null,"sources":{"United Kingdom":null},"tags":["testing"],"updateFrequency":null}}}

    // const data = {
    //     metrics: [
    //         {
    //             'newCasesBySpecimenDate': {
    //                 'overview': 'K',
    //                 'nation': 'ENSW',
    //                 'region': 'E',
    //                 'utla': 'ENSW',
    //                 'ltla': 'ENSW',
    //                 'msoa': 'E',
    //                 'tag': ['cases', 'eventDate'],
    //                 'description': 'New Cases by Specimen date',
    //                 'methodology': '1 paragraph',
    //                 'abstract': 'Abstract',
    //                 'dateAdded': '2021-01-21',
    //                 'dateDeprecated': ''
    //             }
    //         },
    //         {
    //             'cumCasesBySpecimenDate': {
    //                 'overview': 'K',
    //                 'nation': 'ENSW',
    //                 'region': 'E',
    //                 'utla': 'ENSW',
    //                 'ltla': 'ENSW',
    //                 'msoa': 'E',
    //                 'tag': ['cases', 'eventDate'],
    //                 'description': 'Cumulative Cases by Specimen date',
    //                 'methodology': '1 paragraph',
    //                 'abstract': 'Abstract',
    //                 'dateAdded': '2021-01-22',
    //                 'dateDeprecated': ''
    //             }
    //         },
    //     ]
    // }

    // if ( !data ) return <Loading/>;

    return <MetricAvailability data={ data }/>

}; // Metrics


export default Metrics;