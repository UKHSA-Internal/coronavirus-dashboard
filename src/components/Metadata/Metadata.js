// @flow

import React from "react";

import { Link } from "react-router-dom";

import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import Timestamp from "components/Timestamp";

import { MetadataContainer, MetricContainer, MetricsList } from "./Metadata.styles";

import type { ComponentType } from "react";


const MetricItem: ComponentType<*> = ({ metric }) => {

    const data = useGenericAPI(
        "genericApiMetricSearch",
        [],
        {},
        "json",
        { search: metric, exact: "1" }
    );

    if ( !data?.length ) return <Loading/>;

    return data.map(metricData =>
        <MetricContainer key={ metricData.metric }>
            <Link className={ "govuk-link govuk-link--no-visited-state" }
                  to={ `/metrics/doc/${ metricData.metric }` }>
                { metricData.metric_name }
            </Link>
            <span className={ "last-modified govuk-body-s" }>
                Documentation last updated on: <Timestamp timestamp={ metricData.doc_last_modified }/>
            </span>
        </MetricContainer>
    );

};  // MetricItem


const Metadata: ComponentType<*> = ({ download, heading, ...props }) => {

    return <MetadataContainer { ...props }>
        <p>
            Read about the { download.length > 1 ? `${download.length} metrics` : "metric" } used for
            presenting the <strong>{ heading }</strong> data on
            the&nbsp;<Link className={ "govuk-link govuk-link--no-visited-state" }
                      to={ "/metrics" }>Metrics&nbsp;documentation</Link> page or click
            on metric names below:
        </p>
        <MetricsList>{
            download.map(metric =>
                <li key={ metric }>
                    <MetricItem metric={ metric }/>
                </li>
            )
        }</MetricsList>
    </MetadataContainer>;

};  // Metadata


export default Metadata;
