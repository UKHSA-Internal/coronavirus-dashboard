// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Metrics.types';

import PageTitle from 'components/PageTitle';

import { 
    MainContainer,
    MainContent, 
    SideContent, 
    Container } 
from './Metrics.styles';

import { MetricTextSearch, searchContent } from "components/MetricTextSearch";

import { MetricFilter } from "components/MetricFilter";

import { Form } from "components/Formset";

import Loading from "components/Loading";

import GreenTick from "assets/green-tick.svg";

import useGenericAPI from 'hooks/useGenericAPI';

const MetricHeader = [
    'Area Type',
    'Availability',
    '',
    '',
    '',
    '',
    '',
    'UK',
    'England',
    'Scotland',
    'Northern Ireland',
    'Wales'
];

const Spacer: ComponentType<Props> = () => {
    return <div style={{gridColumn: "1/ span 6"}}/>
}

const MetricItem: ComponentType<Props> = ({ item, metric }: Props) => {

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
        'msoa'
    ];

    return <>

    { areaType.map(at => {

        const values = metric[item][at]

        return <>
         {/* Area Name */}
        <div style={{height: '2px'}}>
            {at}
        </div>
        {/* UK */}
        <div style={{height: '2px'}}>
            {values.includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null}
        </div>
        {/* England */}
        <div style={{height: '2px'}}>
            {values.includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null}
        </div>
        {/* Scotland */}
        <div style={{height: '2px'}}>
            {values.includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null}
        </div>
        {/* NI */}
        <div style={{height: '2px'}}>
            {values.includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null}
        </div>
        {/* Wales */}
        <div style={{height: '2px'}}>
            {values.includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null}
        </div>
         

      </>
    })}
    <Spacer/>
  </>
} // MetricItem

const MetricData: ComponentType<Props> = ({ metric }: Props) => {

    const item = Object.keys(metric)[0];

    return <MetricItem item={ item }
                        metric={ metric }/>
   
} // MetricData

const MetricDataHeader: ComponentType<Props> = ({ header }: Props) => {

    return header.map(item => {
                return <div style={{height: '2px'}}>{item}</div> 
            });         
} // MetricDataHeadrer

const Metrics: ComponentType<Props> = ({ }: Props) => {

    // const
    //     data = useGenericAPI("metricsDetail",{});

        
    // if ( !data?.metrics ) return <Loading/>;

    const [metricSearch, setMetricSearch] = useState("");

    const topicTypes = [
        'Cases',
        'Deaths',
        'Healthcare',
        'Vaccinations',
        'Tests'
    ];

    const typeTypes = [
        'Cumulative',
        'Daily',
        'Count'
    ];

    const [topicType, setTopicType] = useState(topicTypes.map(item => ({[item]: true})));
    const [typeType, setTypeType] = useState(typeTypes.map(item => ({[item]: true})));

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
                    'description': 'changeInCumCasesBySpecimenDate.md',
                    'methodology': '1 paragraph',
                    'abstract': 'Abstract',
                    'dateAdded': '2021-01-21',
                    'dateDeprecated': ''
                }
            },
            {
                'newCasesByPublishDate': {
                    'overview': 'K',
                    'nation': 'ENSW',
                    'region': 'E',
                    'utla': 'ENSW',
                    'ltla': 'ENSW',
                    'msoa': 'E',
                    'tag': ['cases', 'eventDate'],
                    'description': 'changeInCumCasesBySpecimenDate.md',
                    'methodology': '1 paragraph',
                    'abstract': 'Abstract',
                    'dateAdded': '2021-01-21',
                    'dateDeprecated': ''
                }
            },
        ]
    }

    return ( <Fragment>



        <PageTitle title={"Metric availability matrix"} />

      


        <MainContainer>
            <MainContent className={ "no-border" }>

                <div className={ "govuk-phase-banner status-banner govuk-!-margin-bottom-0" }>
                    <p className={ "govuk-phase-banner__content" }>
                        This page lists all the available metrics, displaying their availability across
                        area type and country.
                    </p>
                </div>

                <Container>
                    <MetricDataHeader header={ MetricHeader }/>
                    {
                        data.metrics.map(item => {

                            return <MetricData metric={ item }/>

                        })
                    }
                </Container>

            </MainContent>

            <SideContent>
                <div className={ "govuk-!-margin-top-1" }>
                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
                        <MetricTextSearch 
                            metricSearch={ metricSearch }
                            setMetricSearch={ setMetricSearch }/>

                        <MetricFilter label={"Topic"}
                                    metricTypes={ topicTypes } 
                                    metricType={ topicType }
                                    setMetricType={ setTopicType }/>

                         <MetricFilter label={"Type"}
                                    metricTypes={ typeTypes } 
                                    metricType={ typeType }
                                    setMetricType={ setTypeType }/>



                    </Form>
                </div>
            </SideContent>

        </MainContainer>

        
       

    </Fragment>

    );
}; // Metrics

export default Metrics
