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


const Metadata: ComponentType<*> = ({ download, ...props }) => {

    return <MetadataContainer { ...props }>
        <p>
            Documentation for all metrics are available under
            the <Link className={ "govuk-link govuk-link--no-visited-state" }
                      to={ "/metrics" }>Metrics documentation</Link> page.
        </p>
        <p>
            Click on each of the { download.length } metrics used in
            this card to see the details:
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
