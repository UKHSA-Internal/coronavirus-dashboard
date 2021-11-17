// @flow

import React from "react";

import { Option, Header, Category, Tag } from "./MetricView.styles";
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


const RenderMetrics: ComponentType<*> = ({ data, filter }) => {

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
            <div className={ "govuk-!-margin-bottom-2" }>
                <strong className={ "govuk-!-font-size-14 govuk-!-margin-right-1" }>
                    API name:
                </strong>
                <code dangerouslySetInnerHTML={ markedContent(metric.metric, filter) }/>
            </div>
            <div className={ "govuk-!-margin-top-1" }>{
                (metric?.tag ?? metric?.tags).map( tag => <Tag key={ tag }>{ tag }</Tag> )
            }</div>
        </Option>
    );

};  // RenderMetrics


export default RenderMetrics;
