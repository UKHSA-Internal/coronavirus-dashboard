// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import MetricAvailability from "components/MetricAvailability";

const Metrics = () => {

    const data = useGenericAPI("metricsAvailability", null, "json");

    if ( !data ) return <Loading/>;

    return <MetricAvailability data={ data }/>

}; // Metrics


export default Metrics;