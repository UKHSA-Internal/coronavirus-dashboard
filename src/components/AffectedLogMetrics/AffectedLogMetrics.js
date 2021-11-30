// @flow

import React from "react";

import { Link } from "react-router-dom";

import { DataList } from "./AffectedLogMetrics.styles";
import type { ComponentType } from "react";


const Metric: ComponentType<*> = ({ metric, metric_name }) => {

    return <li>
        <Link to={ `/metrics/doc/${metric}` }
              className={ "govuk-link govuk-link--no-visited-state govuk-body-s" }
              children={ metric_name }/>
    </li>;

};  // Metric


const AffectedLogMetrics: ComponentType<*> = ({ metrics }) => {

    if ( !metrics || !metrics?.length ) return null;

    return <div className={ "govuk-!-padding-top-4 govuk-details__text govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
        <h4 className={ "govuk-heading-s" }>Affected metrics</h4>
        <DataList>{
            metrics.map(item => <Metric key={ item.metric } { ...item }/>)
        }</DataList>
    </div>;

};  // AffectedLogMetrics


export default AffectedLogMetrics;
