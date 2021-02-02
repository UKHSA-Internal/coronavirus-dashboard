// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import MetricAvailability from "components/MetricAvailability";

const Metrics = () => {

    // const data = useGenericAPI("changeLogData", [], "json");

    const data = {
        metrics: [
            {
                'newCasesBySpecimenDate': {
                    'overview': 'K',
                    'nation': 'ENSW',
                    'region': 'E',
                    'utla': 'ENSW',
                    'ltla': 'ENSW',
                    'msoa': 'E',
                    'tag': ['cases', 'eventDate'],
                    'description': 'New Cases by Specimen date',
                    'methodology': '1 paragraph',
                    'abstract': 'Abstract',
                    'dateAdded': '2021-01-21',
                    'dateDeprecated': ''
                }
            },
            {
                'cumCasesBySpecimenDate': {
                    'overview': 'K',
                    'nation': 'ENSW',
                    'region': 'E',
                    'utla': 'ENSW',
                    'ltla': 'ENSW',
                    'msoa': 'E',
                    'tag': ['cases', 'eventDate'],
                    'description': 'Cumulative Cases by Specimen date',
                    'methodology': '1 paragraph',
                    'abstract': 'Abstract',
                    'dateAdded': '2021-01-22',
                    'dateDeprecated': ''
                }
            },
        ]
    }

    // if ( !data ) return <Loading/>;

    return <MetricAvailability data={ data }/>

}; // Metrics


export default Metrics;