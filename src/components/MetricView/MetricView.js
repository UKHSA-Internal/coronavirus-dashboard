// @flow

import React from "react";

import {
    Option, Header, Category, Tag, SearchToken,
    TagsContainer, APIMetricContainer, ResultsHeader
} from "./MetricView.styles";
import { Link } from "react-router-dom";

import type { ComponentType } from "react";
import type { MarkedContentData } from "./MetricView.types";


const markedContent = ( content: string, filter: string ): MarkedContentData => {

    return {
        __html: content.replace(
            new RegExp(filter, "gi"),
            match => `<mark>${ match }</mark>`
        )
    }

};  // MarkedContent


const Metrics: ComponentType<*> = ({ data, filter }) => {

    return data.map(metric =>
        <Option key={ metric.metric }>
            <Header>
                <Link className={ "govuk-link govuk-link--no-underline govuk-link--no-visited-state govuk-!-font-weight-bold" }
                      to={ `/metrics/doc/${metric.metric}` }
                      dangerouslySetInnerHTML={ markedContent(metric.metric_name, filter) }/>
                <div>
                    <Category>{ metric.category }</Category>
                </div>
            </Header>
            <APIMetricContainer>
                <strong className={ "govuk-!-font-size-14 govuk-!-margin-right-1" }>
                    API name:
                </strong>
                <code dangerouslySetInnerHTML={ markedContent(metric.metric, filter) }/>
            </APIMetricContainer>
            <TagsContainer>{
                ( metric?.tag ?? metric?.tags )
                    .map( tag => <Tag key={ tag }>{ tag }</Tag> )
            }</TagsContainer>
        </Option>
    );

};  // Metrics


const RenderMetrics: ComponentType<*> = ({ data, filterFunc, download, downloadName,
                                           userInput, category=null, types=null }) => {

    const filteredData = data.filter(filterFunc);

    return <>
        <ResultsHeader>
            <span>
                <b>Count:</b> { data.length } metrics
            </span>
            <a className={ "govuk-link govuk-link--no-visited-state" }
               download={ downloadName }
               rel={ "noopener noreferrer" }
               target={ "_blank" }
               href={ download }>Export results as JSON</a>
        </ResultsHeader>
        <ul className={ "govuk-list" }>{
            !filteredData.length
                ? <li>
                    No metrics to match <SearchToken>{ userInput }</SearchToken>
                    { category || types ? "." : " and / or the defined criteria." }
                </li>
                : <Metrics data={ filteredData } filter={ userInput }/>
        }</ul>
    </>

}; // RenderMetrics


export default RenderMetrics;
