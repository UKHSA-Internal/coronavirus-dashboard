// @flow

import React, { Fragment, useState, useEffect, useRef } from 'react';


import FormItem from "../Formset";


import type { ComponentType } from 'react';

import moment from "moment";

import type { Props } from './MetricAvailability.types';

import PageTitle from 'components/PageTitle';

import { 
    MainContainer,
    MainContent, 
    SideContent, 
    Container } 
from './MetricAvailability.styles';

import URLs from "common/urls";

import searchContent from './MetricTextSearch';

import MetricTextSearch from './MetricTextSearch';

import MetricFilter from './MetricFilter';

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

const MetricCard: ComponentType<Props> = ({ item, metric }: Props) => {

    const detailsBaseUrl = URLs["metricDetails"];
    const descriptionMd = (Object.values(metric)[0])[1].description
    const methodologyMd = (Object.values(metric)[0])[1].methodology

    const description = useGenericAPI(detailsBaseUrl + descriptionMd, "Not currently available", "text" );
    const methodology = useGenericAPI(detailsBaseUrl + methodologyMd, "Not currently available", "text" );

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
    ];

    const card = areaType.map((at, index) => {

        const availability = (Object.values(metric)[0])[1].availability
       
        return <>
            {/* Area Name  */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-an-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>{at}</div>
            </div>
            {/* UK */}
            <div className={ "govuk-!-margin-top-20 govuk-!-margin-bottom-0" }key={ `metric-uk-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </div>
            {/* England */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-en-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </div>
            {/* Scotland */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }key={ `metric-sc-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </div>
            {/* NI */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-ni-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null: null}
                </div>
            </div>
            {/* Wales */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-wa-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </div>
  
            </>

    });

   

    const metricDescription =   
            <div style={{gridColumn: "1/ span 6"}}>
                <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                    <span class="govuk-details__summary-text">
                        Metric description
                    </span>
                </summary>
                <div class="govuk-details__text">
                    {description}
                </div>
            </details>
            </div>;

  
    const metricMethodology =    
        <div style={{gridColumn: "1/ span 6"}}>
            <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                    <span class="govuk-details__summary-text">
                        Methodology
                    </span>
                </summary>
                <div class="govuk-details__text">
                    {methodology}
                </div>
            </details> 
        </div>;

    return <> 
        {card}
        {metricMethodology}
        {metricDescription}
       
    </>

};

const MetricItem: ComponentType<Props> = ({ item, metric, allExpanded }: Props) => {

    const dateAdded = (Object.values(metric)[0])[1].dateAdded

    const DATE_FORMAT = "DD/MM/YYYY";

    const [ expanded, setExpanded ] = useState(false)
    const [ cls, setCls] = useState ("govuk-accordion__section")

    const expandSection = () => {
        if (expanded === true) allExpanded = false;
        setExpanded(!expanded)
    }

    useEffect(() => {
        if (expanded || allExpanded) {
            setCls("govuk-accordion__section govuk-accordion__section--expanded")
        }
        else {
            setCls("govuk-accordion__section")
        }
    }, [ expanded, allExpanded ]);

    return <>

      

      <div key={ `metric-section-${ item }`} class={cls}>
            <div class="govuk-accordion__section-header">
                <h2 class="govuk-accordion__section-heading">

                    <button type="button" onClick={expandSection} id={ `accordion-default-heading-${ item }`} aria-controls={ `accordion-default-content-${ item }`} class="govuk-accordion__section-button" aria-expanded={expanded}>

                        <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
                            {/* <p id={ "metric-????" } className={ "govuk-heading-s" }>
                                {???}
                            </p>  */}
                        </div>

                        <div className={"govuk-!-margin-top-0 govuk-!-margin-bottom-0"}>
                            <p id={ "metric-name" } className={ "govuk-heading-s" }>
                                Metric name: {item} Date added: {moment(dateAdded).format(DATE_FORMAT)}
                            </p>
                       </div>
                        
                       <span class="govuk-accordion__icon" aria-hidden="true"></span>
                    </button>
                </h2>
            </div>
            <div id={ `accordion-default-content-${ item }`} class="govuk-accordion__section-content" aria-labelledby={ `accordion-default-heading-${ item }`}>
                <Container>
                    <MetricDataHeader header={ MetricHeader }/>

                    <MetricCard item={ item }
                                metric={ metric }/>
                </Container>
            </div>
        </div>

   
    </>
} // MetricItem

const MetricDataHeader: ComponentType<Props> = ({ header }: Props) => {

   
    return header.map((item, index) => {
                    return <div key={ `metric-header-${ index }`} 
                            style={{height: '2px', gridColumn:  "{index+1}/ span 1"}} 
                            className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>{item}</div> 
                });  
       
} // MetricDataHeadrer


const MetricAvailabilty: ComponentType<Props> = ({ data }: Props) => {

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

    console.log("MA")
    console.log(data)
    const metrics = Object.keys(data[Object.keys(data)[1]])

    const topics = new Set(Object.values(data[Object.keys(data)[0]]["categories"]))
    const typs = new Set(Object.values(data[Object.keys(data)[0]]["types"]))
   
    const [topicType, setTopicType] = useState(null);
    const [typeType, setTypeType] = useState(null);

    const [allExpanded, setAllExpanded ] = useState(false);
 
    const setAllExp = () => {
        setAllExpanded(!allExpanded)
    }

    return <Fragment>

        <PageTitle title={"Metric availability matrix"} />

        <MainContainer>
            <MainContent className={ "no-border" }>
  
                <div className={ "govuk-phase-banner status-banner govuk-!-margin-bottom-0" }>
                    <p className={ "govuk-phase-banner__content" }>
                        This page lists all the available metrics, displaying their availability across
                        area type and country.
                    </p>
                </div>

                <div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default">

                <div class="govuk-accordion__controls">
                    <button onClick={setAllExp}type="button" class="govuk-accordion__open-all" aria-expanded={allExpanded}>{allExpanded ? "Close all": "Open all"}
                        <span class="govuk-visually-hidden"> sections</span>
                    </button>
                </div>
                    {
            
                        metrics.map(item => {
                            
                            const metric = Object.entries(Object.entries(data)[1][1]).filter(it => it[0] === item)
                            
                            return <MetricItem 
                                    item={ item }
                                    metric={ metric }
                                    allExpanded={ allExpanded }/>

                        })
                    }
                  
                </div>


            </MainContent>

            <SideContent>
                <div className={ "govuk-!-margin-top-1" }>
                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
                        
                        <MetricTextSearch 
                            metricSearch={ metricSearch }
                            setMetricSearch={ setMetricSearch }/>

                        <MetricFilter label={"Topic"}
                                    metricTypes={ topics } 
                                    metricType={ topicType }
                                    setMetricType={ setTopicType }/>

                         <MetricFilter label={"Type"}
                                    metricTypes={ typs } 
                                    metricType={ typeType }
                                    setMetricType={ setTypeType }/>
                    </Form>
                </div>
            </SideContent>

        </MainContainer>

        
       

    </Fragment>


}; // MetricAvailabilty

export default MetricAvailabilty
