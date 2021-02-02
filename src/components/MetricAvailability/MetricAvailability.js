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
 
        areaType.map((at, index) => {

        const values = metric[item][at]
     
        return <>
            {/* Area Name */} 
            <div key={ `metric-an-${ index }`} style={{height: '2px'}}>
                {at}
            </div>
            {/* UK */}
            <div key={ `metric-uk-${ index }`} style={{height: '2px'}}>
                {values.includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null}
            </div>
            {/* England */}
            <div key={ `metric-en-${ index }`} style={{height: '2px'}}>
                {values.includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null}
            </div>
            {/* Scotland */}
            <div key={ `metric-sc-${ index }`} style={{height: '2px'}}>
                {values.includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null}
            </div>
            {/* NI */}
            <div key={ `metric-ni-${ index }`} style={{height: '2px'}}>
                {values.includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null}
            </div>
            {/* Wales */}
            <div key={ `metric-wa-${ index }`} style={{height: '2px'}}>
                {values.includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null}
            </div>
            </>

    }) : null;

    return <>   
        {card}
    </>

};

const MetricItem: ComponentType<Props> = ({ metric, expandAll }: Props) => {

    const item = Object.keys(metric)[0];

    const DATE_FORMAT = "DD/MM/YYYY";

    const [ closeOrExpandButton, setCloseOrExpandButton ] = useState("+")
    const [ expandCard, setExpandCard ] = useState(false)

    const closeOrExpandCard = () => {
        const open = closeOrExpandButton === "+" ? true : false;
        setCloseOrExpandButton(open ? "-": "+");
        setExpandCard(open)
    }

    return <>

    <div style={{gridColumn: "1/ span 5"}}>
        <p id={ "metric-description" } className={ "govuk-heading-s" }>
            {metric[item]["description"]}
        </p> 
    </div>

    <div style={{gridColumn: "1/ span 5"}}>
        <p id={ "metric-name-and-date-added" } className={ "govuk-heading-s" }>
            Metric name: {item} Date added: {moment(metric[item]["dateAdded"]).format(DATE_FORMAT)}
        </p>
    </div>

    <div style={{gridColumn: "6/ span 1"}}>
        <button className={ "govuk-button" } onClick={closeOrExpandCard}>
            {expandAll ? "-" : closeOrExpandButton}
        </button>
    </div>

    <MetricDataHeader header={ MetricHeader }
                      expanded={expandAll ? true : expandCard ? true : false}/>

    <MetricCard item={ item }
                metric={ metric }
                expanded={expandAll ? true : expandCard}/>

   
  </>
} // MetricItem

const MetricData: ComponentType<Props> = ({ metric, expandAll }: Props) => {

    

    return <MetricItem  metric={ metric }
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

export const searchContent = (data, token) => {

    return ( !token || (token?.length ?? 0) === 0 ) ||
        new RegExp(token, 'ig').exec(`${data?.headline ?? ""} ${data.body}`) !== null

};


export const MetricTextSearch: ComponentType = ({ metricSearch, setMetricSearch }) => {

    const inputRef = useRef();

    useEffect(() => {
        if ( metricSearch ) inputRef.current.focus();
    }, [metricSearch]);

    return <FormItem aria-labelledby={ "aria-search-filter-label" }
                     aria-describedby={ "aria-search-filter-descr" }
                     className={ "govuk-!-margin-top-2" }
                     width={ "full" }>
            <span
                id={ "search-filter-label" }
                className={ "govuk-label govuk-label--s" }>
                Search
            </span>

        <div aria-describedby={ "search-filter-descr" }
             aria-labelledby={ "search-filter-label" }>
            <input
                id={ "search-filter-id" }
                value={ metricSearch }
                ref={ inputRef }
                className={ "govuk-input govuk-input--width-15" }
                type={ "text" }
                onChange={ item => setMetricSearch(item.target.value) }/>
        </div>
    </FormItem>

}; // MetricTextSearch

export const MetricFilter: ComponentType = ({ label, metricType, metricTypes, setMetricType }) => {


    return <FormItem aria-labelledby={ "aria-type-filter-label" }
                     aria-describedby={ "aria-type-filter-descr" }
                     width={ "full" }>

        <span id={ "type-filter-label" }
              className={ "govuk-label govuk-label--s" }>
            {label}
        </span>

        {
            metricTypes.map((key, index) =>

                <div aria-describedby={ "type-filter-descr" }
                     aria-labelledby={ "type-filter-label" }
                     key={ `checkbox-${ key }-${ index }` }
                     className="govuk-!-margin-bottom-1">
                    <label htmlFor={ key }>
                        <input
                            id={ `type-filter-${ index }` }
                            name={ key }
                            type="checkbox"
                            checked={false}
                            checked={ metricType[key] }
                            onChange={ (event) =>
                                setMetricType( prev => ({...prev, [key]: !metricType[key] }))
                            }
                            />
                        { key }
                    </label>
                </div>
            )

        }

    </FormItem>

}; // MetricFilter


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

    const [topicType, setTopicType] = useState(topicTypes.map(item => ({[item]: true})));
    const [typeType, setTypeType] = useState(typeTypes.map(item => ({[item]: true})));

    const [expandAll, setExpandAll] = useState(false);

    const closeOrExpandAll = () => {
        setExpandAll(!expandAll)
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


}; // MetricAvailabilty

export default MetricAvailabilty
