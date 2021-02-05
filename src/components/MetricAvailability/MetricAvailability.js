// @flow

import React, { Fragment, useState, useEffect } from 'react';

import type { ComponentType } from 'react';

import moment from "moment";

import type { Props } from './MetricAvailability.types';

import PageTitle from 'components/PageTitle';

import { 
    MainContainer,
    MainContent, 
    SideContent, 
    Container,
    MainDiv,
    CardColumn,
    HeaderDiv,
}
from './MetricAvailability.styles';

import URLs from "common/urls";

import MetricTextSearch from './MetricTextSearch';

import MetricFilter from './MetricFilter';

import { Form } from "components/Formset";

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

const MetricDescription : ComponentType<Props> = ({ baseUrl, descriptionMd }: Props) => { 
    
    const description = useGenericAPI(baseUrl + descriptionMd, "Not currently available", "text" );

    return <MainDiv>
                <details class="govuk-details govuk-!-margin-top-0 govuk-!-margin-bottom-0" data-module="govuk-details">
                    <summary class="govuk-details__summary">
                        <span class="govuk-details__summary-text">
                            Metric description
                        </span>
                    </summary>
                    <div class="govuk-details__text">
                        {description}
                    </div>
                </details>
            </MainDiv>;
}; // MetricDescription

const MetricMethodology : ComponentType<Props> = ({ baseUrl, methodologyMd }: Props) => {    

    const methodology = useGenericAPI(baseUrl + methodologyMd, "Not currently available", "text" );

    return <MainDiv>
                <details class="govuk-details govuk-!-margin-top-0 govuk-!-margin-bottom-0" data-module="govuk-details">
                    <summary class="govuk-details__summary">
                        <span class="govuk-details__summary-text">
                            Methodology
                        </span>
                    </summary>
                    <div class="govuk-details__text">
                        {methodology}
                    </div>
                </details> 
            </MainDiv>;
}; //  MetricMethodology

const Card: ComponentType<Props> = ({ areaType, metric }: Props) => {

    return areaType.map((at, index) => {

        const availability = (Object.values(metric)[0])[1].availability;
       
        return <>
            {/* Area Name  */}
            <CardColumn className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-an-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>{at}</div>
            </CardColumn>
            {/* UK */}
            <CardColumn className={ "govuk-!-margin-top-20 govuk-!-margin-bottom-0" }key={ `metric-uk-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </CardColumn>
            {/* England */}
            <CardColumn className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-en-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </CardColumn>
            {/* Scotland */}
            <CardColumn className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" }key={ `metric-sc-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </CardColumn>
            {/* NI */}
            <CardColumn className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-ni-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null: null}
                </div>
            </CardColumn>
            {/* Wales */}
            <CardColumn className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } key={ `metric-wa-${ index }`}>
                <div className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    { availability[at] ? availability[at].includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
                </div>
            </CardColumn>
  
            </>

    });

}; // Card

const MetricCard: ComponentType<Props> = ({ item, metric }: Props) => {

    const detailsBaseUrl = URLs["metricDetails"];
    const descriptionMd = (Object.values(metric)[0])[1].description;
    const methodologyMd = (Object.values(metric)[0])[1].methodology;

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
    ];

    return <> 
        <Card areaType={ areaType }
              metric={ metric }/>
        <MetricDescription baseUrl={ detailsBaseUrl }
                      descriptionMd={ descriptionMd }/>


        <MetricMethodology baseUrl={ detailsBaseUrl }
                       methodologyMd={ methodologyMd }/>
       
    </>

}; //  MetricCard

const MetricItem: ComponentType<Props> = ({ item, metric, allExpanded }: Props) => {

    const dateAdded = (Object.values(metric)[0])[1].dateAdded;

    const DATE_FORMAT = "DD/MM/YYYY";

    const [ expanded, setExpanded ] = useState(false);
    const [ cls, setCls] = useState ("govuk-accordion__section");

    const expandSection = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {

        if (expanded) {
            setCls("govuk-accordion__section govuk-accordion__section--expanded");
        }
        else {
            setCls("govuk-accordion__section");
        }
    }, [ expanded ]);

    useEffect(() => {
        if (allExpanded) {
            setExpanded(true);
        } else if (expanded) {
            setExpanded(false); 
        }
    }, [ allExpanded ]);
    

    return <>

      <div key={ `metric-section-${ item }`} class={cls}>
            <div class="govuk-accordion__section-header">
                <h2 class="govuk-accordion__section-heading">

                    <button type="button" onClick={expandSection} id={ `accordion-default-heading-${ item }`} aria-controls={ `accordion-default-content-${ item }`} class="govuk-accordion__section-button" aria-expanded={expanded}>

                       
                       

                        <div className={"govuk-!-margin-top-0 govuk-!-margin-bottom-0"}>

                            {/* Not available at the moment */}
                            {/* <div className={ "govuk-!-margin-top-0 govuk-!-margin-bottom-0" } style={{gridColum: '1/ span 2'}}>
                                <p id={ "metric-????" } className={ "govuk-heading-s" } style={{color: '#1d70b8', fontSize: '13pt'}}>
                                    {???}
                                </p>
                            </div> */}

                            <div id={ "metric" } className={ "govuk-heading-s" } style={{fontSize: '13pt', marginRight: '2px', float: 'left'}}>
                                Metric: {item}
                            </div>

                            <div id={ "metric-date-added" } className={ "govuk-heading-s" } style={{textAlign: 'right', fontSize: '13pt', float: 'right', marginRight: '2px'}}>
                                Date added:  {dateAdded ? moment(dateAdded).format(DATE_FORMAT) : "99/99/9999"}
                            </div>
            
                            
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
                    return <HeaderDiv key={ `metric-header-${ index }`} 
                                      index={index+1}>
                                {item}
                            </HeaderDiv> 
                });  
       
} // MetricDataHeadrer

const MetricAvailabilty: ComponentType<Props> = ({ data }: Props) => {

    const [metricSearch, setMetricSearch] = useState("");
    const [topicType, setTopicType] = useState(null);
    const [typeType, setTypeType] = useState(null);
    const topics = new Set(Object.values(data[Object.keys(data)[0]]["categories"]));
    const typs = new Set(Object.values(data[Object.keys(data)[0]]["types"]));
    const [allExpanded, setAllExpanded ] = useState(false);
    const [metrics, setMetrics ] = useState(Object.keys(data[Object.keys(data)[1]]));

    const searchTags = (item, metricSearch) => {
        const metric = Object.entries(Object.entries(data)[1][1]).filter(it => it[0] === item);
        const tags = (Object.values(metric)[0])[1].tags;
        const res = tags.some(item => item.includes(metricSearch));
        return res;
    }

    useEffect(() => {
        if (metricSearch) {
            setMetrics(metrics.filter(item => item.includes(metricSearch) || searchTags(item, metricSearch)));
        }
       
    }, [ metricSearch ]);

    useEffect(() => {
        if (topicType) {
            setMetrics(metrics.filter(item => searchTags(item, topicType)));
        }
    }, [ topicType ]);

    useEffect(() => {
        if (typeType) {
            setMetrics(metrics.filter(item => searchTags(item, typeType)));
        }
    }, [ typeType ]);

    const setAllExp = () => {
        setAllExpanded(!allExpanded);
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
                            
                            const metric = Object.entries(Object.entries(data)[1][1]).filter(it => it[0] === item);
                            
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

export default MetricAvailabilty;
