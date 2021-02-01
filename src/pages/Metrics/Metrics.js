// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';

import moment from "moment";

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


const MetricCard: ComponentType<Props> = ({ item, metric, expanded }: Props) => {

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
        'msoa'
    ];

    const card = expanded ? 
 
        areaType.map(at => {

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

    }) : null;

    return <>   
        {card}
    </>

};

const MetricItem: ComponentType<Props> = ({ item, metric, expandAll }: Props) => {

    const DATE_FORMAT = "DD/MM/YYYY";

    const [ closeOrExpandButton, setCloseOrExpandButton ] = useState("+")
    const [ expandCard, setExpandCard ] = useState(false)

    const closeOrExpandCard = () => {
        const open = closeOrExpandButton === "+" ? true : false;
        setCloseOrExpandButton(open ? "-": "+");
        setExpandCard(!open)
    }

    return <>

    <div style={{gridColumn: "1/ span 5"}}>
        <p id={ "metric-description" } className={ "govuk-heading-s" }>
            {metric[item]["description"]}
        </p>
         
        <p id={ "metric-name-and-date-added" } className={ "govuk-heading-s" }>
            Metric name: {item} Date added: {moment(metric[item]["dateAdded"]).format(DATE_FORMAT)}
        </p>
    </div>

    <div style={{gridColumn: "6/ span 1"}}>
        <button className={ "govuk-button" } onClick={closeOrExpandCard}>
            {closeOrExpandButton}
        </button>
    </div>

    <MetricDataHeader header={ MetricHeader }
                      expanded={expandAll ? true : expandCard ? true : false}/>

    <MetricCard item={ item }
                metric={ metric }
                expanded={expandAll ? true : expandCard ? true : false}/>

   
  </>
} // MetricItem

const MetricData: ComponentType<Props> = ({ metric, expandAll }: Props) => {

    const item = Object.keys(metric)[0];

    return <MetricItem item={ item }
                        metric={ metric }
                        expandAll={ expandAll }/>
   
} // MetricData

const MetricDataHeader: ComponentType<Props> = ({ header, expanded }: Props) => {

    if (expanded) {
        return header.map((item, index) => {
                    return <div key={ `metric-header-${ index }`} 
                            style={{height: '2px', gridColumn:  "{index+1}/ span 1"}} 
                            className={ "govuk-!-margin-top-2" }>{item}</div> 
                });  
    }
    else {
        return null;
    
    }       
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

    const [expandAll, setExpandAll] = useState(false);

    const closeOrExpandAll = () => {
        setExpandAll(!expandAll)
    }

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

                <div className={ "govuk-phase-banner status-banner govuk-!-margin-bottom-0" }>
                    <button className={ "govuk-button" } onClick={closeOrExpandAll}>
                        {expandAll ? "Close all" : "Open all"}
                    </button>
                </div>

                <Container>     
                    {
                        data.metrics.map(item => {

                            return <MetricData metric={ item }
                                    expandAll={ expandAll }/>

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
