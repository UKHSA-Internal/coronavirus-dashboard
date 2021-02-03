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

const Spacer: ComponentType<Props> = () => {
    return <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } style={{gridColumn: "1/ span 6"}}/>
}


const MetricCard: ComponentType<Props> = ({ item, metric, expanded }: Props) => {

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
    ];

    const card = expanded ? 
 
        areaType.map((at, index) => {

        const availability = (Object.values(metric)[0])[1].availability
        console.log(availability)
     
        return <>
            {/* Area Name  */}
            <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-an-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>{at}</div>
            </div>
            {/* UK */}
            <div className={ "govuk-!-margin-top-20 govuk-!-margin-bottom-0" }key={ `metric-uk-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability.includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null}
                </div>
            </div>
            {/* England */}
            {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-en-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability.includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null}
                </div>
            </div> */}
            {/* Scotland */}
            {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }key={ `metric-sc-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability.includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null}
                </div>
            </div> */}
            {/* NI */}
            {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-ni-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability.includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null}
                </div>
            </div> */}
            {/* Wales */}
            {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-wa-${ index }`} style={{height: '2px', borderTop: "1px solid #e5e5e5"}}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability.includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null}
                </div>
            </div> */}
            </>

    }) : null;

    return <>   
        {card}
    </>

};

const MetricItem: ComponentType<Props> = ({ item, metric, expandAll, callClose }: Props) => {

    console.log("MetricItem")

    const dateAdded = (Object.values(metric)[0])[1].dateAdded

    const DATE_FORMAT = "DD/MM/YYYY";

    const [ cardOpen, setCardOpen ] = useState(false)

    const closeOrExpandCard = () => {
        setCardOpen(!cardOpen)
        callClose(!cardOpen, item)
    }

    useEffect(() => {
        setCardOpen(expandAll);
    }, [ expandAll ]);

    return <>

    {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } style={{gridColumn: "1/ span 5",  borderTop: "2px solid #e5e5e5"}}>
        <p id={ "metric-description" } className={ "govuk-heading-s" }>
            {metric[item]["description"]}
        </p> 
    </div> */}

    <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } style={{gridColumn: "6/ span 1", borderTop: "2px solid #e5e5e5"}}>
        <button className={ "govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-0" } onClick={closeOrExpandCard}>
            {cardOpen ? "-" : "+"}
        </button>
    </div>

    <div className={"govuk-!-margin-top-0 govuk-!-margin-bottom-0"} style={{gridColumn: "1/ span 6"}}>
        <p id={ "metric-name" } className={ "govuk-heading-s" }>
            Metric name: {item} Date added: {moment(dateAdded).format(DATE_FORMAT)}
        </p>
    </div>

    

    <MetricDataHeader header={ MetricHeader }
                      expanded={cardOpen}/>

    <MetricCard item={ item }
                metric={ metric }
                expanded={cardOpen}/>

    <Spacer/>

   
  </>
} // MetricItem

const MetricDataHeader: ComponentType<Props> = ({ header, expanded }: Props) => {

    if (expanded) {
        return header.map((item, index) => {
                    return <div key={ `metric-header-${ index }`} 
                            style={{height: '2px', gridColumn:  "{index+1}/ span 1"}} 
                            className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>{item}</div> 
                });  
    }
    else {
        return null;
    
    }       
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

    const metrics = Object.keys(data[Object.keys(data)[1]])

    const [closeAll, setCloseAll] = useState([]);

    useEffect(() => {

        const m = metrics.map(item => {
            return {[item]: false} 
        });
        
        setCloseAll(m)
    }, [ ]);

    const topics = new Set(Object.values(data[Object.keys(data)[0]]["categories"]))
    const typs = new Set(Object.values(data[Object.keys(data)[0]]["types"]))
   
    const [topicType, setTopicType] = useState(null);
    const [typeType, setTypeType] = useState(null);

    const [expandAll, setExpandAll] = useState(false);
 

    const closeOrExpandAll = () => {
        setExpandAll(!expandAll);
    }

    const callClose = (close, metric) => {  
        
        if (close) {
            const m = metrics.map(item => {
            
                if (metric === item) {
                    return {[item]: close} 
                } else {
                    return {[item]: false}
                }
                
            });
            setCloseAll(m)
        }
    };

    useEffect(() => {
        // const allOpen = Object.values(closeAll)[0].some((key) => closeAll[key] === false);
        const allOpen = false;
        if (allOpen) setExpandAll(true)
    }, [ closeAll ]);

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

                <Container> 
                    <div style={{gridColumn: "6/ span 1"}}>
                        <button className={ "govuk-button govuk-!-margin-top-0 govuk-!-margin-bottom-0" }
                                onClick={closeOrExpandAll}>
                            {expandAll ? "Close all" : "Open all"}
                        </button>
                    </div>
                </Container>

                <Container>     
                    {
        
                        metrics.map(item => {
                           
                            const metric = Object.entries(Object.entries(data)[1][1]).filter(it => it[0] === item)
                        
                            return <MetricItem 
                                    item={ item }
                                    metric={ metric }
                                    expandAll={ expandAll }
                                    callClose={ callClose }/>

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
