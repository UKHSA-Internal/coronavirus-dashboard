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
    MatrixColumn,
    HeaderDiv,
    SummaryContainer, 
    Markdown, 
    MatrixButton,
    MetricSummary,
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

const REF_INDEX = 0;
const METRICS_INDEX = 1;

const MetricDescription : ComponentType<Props> = ({ baseUrl, descriptionMd }: Props) => { 
    
    const description = useGenericAPI(baseUrl + descriptionMd, "Not currently available", "text" );

    return <MainDiv>
                <details class="govuk-details govuk-!-margin-top-2 govuk-!-margin-bottom-0" data-module="govuk-details">
                    <summary class="govuk-details__summary govuk-!-margin-bottom-2">
                        <span class="govuk-details__summary-text">     
                            Metric description
                        </span>
                    </summary>
                    <div class="govuk-details__text">
                        <Markdown dangerouslySetInnerHTML={{ __html: description }}/>
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
                        <Markdown dangerouslySetInnerHTML={{ __html: methodology }}/>
                    </div>
                </details> 
            </MainDiv>;
}; //  MetricMethodology

const Matrix: ComponentType<Props> = ({ areaType, metric }: Props) => {

    return areaType.map((at, index) => {

        const availability = (Object.values(metric)[0])[1].availability;
       
        return <>
            {/* Area Name  */}
            <MatrixColumn key={ `metric-an-${ index }`}>
                {at}
            </MatrixColumn>
            {/* UK */}
            <MatrixColumn key={ `metric-uk-${ index }`}>
                { availability[at] ? availability[at].includes("K") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
            </MatrixColumn>
            {/* England */}
            <MatrixColumn key={ `metric-en-${ index }`}>
                { availability[at] ? availability[at].includes("E") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
            </MatrixColumn>
            {/* Scotland */}
            <MatrixColumn key={ `metric-sc-${ index }`}>
                { availability[at] ? availability[at].includes("S") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
            </MatrixColumn>
            {/* NI */}
            <MatrixColumn key={ `metric-ni-${ index }`}>
                { availability[at] ? availability[at].includes("N") ? <img src={ GreenTick } width={ "14px" } /> : null: null}
            </MatrixColumn>
            {/* Wales */}
            <MatrixColumn key={ `metric-wa-${ index }`}>
                { availability[at] ? availability[at].includes("W") ? <img src={ GreenTick } width={ "14px" } /> : null : null}
            </MatrixColumn>
  
            </>

    });

}; // Matrix

const MetricMatrix: ComponentType<Props> = ({ metric }: Props) => {

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
        <Matrix areaType={ areaType }
              metric={ metric }/>
        <MetricDescription baseUrl={ detailsBaseUrl }
                      descriptionMd={ descriptionMd }/>


        <MetricMethodology baseUrl={ detailsBaseUrl }
                       methodologyMd={ methodologyMd }/>
       
    </>

}; //  MatrixMatrix

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

        <div key={ `metric-section-${ item }`} class={ cls }>
    
            <div class="govuk-accordion__section-header">
                <h2 class="govuk-accordion__section-heading">

                    <MatrixButton onClick={expandSection} 
                                  id={ `accordion-default-heading-${ item }`} 
                                  aria-controls={ `accordion-default-content-${ item }`}
                                  aria-expanded={expanded}>

                        <SummaryContainer className={"govuk-!-margin-top-0 govuk-!-margin-bottom-0"}>

                            <MetricSummary textAlign={ 'left' } fontWeight={ 'bold' }>Metric:</MetricSummary> 
                            <MetricSummary textAlign={ 'left' } fontWeight={ 'normal' }>{item}</MetricSummary>
            
                            <MetricSummary textAlign={ 'center' } fontWeight={ 'bold' }>Date added:</MetricSummary>  
                            <MetricSummary textAlign={ 'left' } fontWeight={ 'normal' }>{dateAdded ? moment(dateAdded).format(DATE_FORMAT) : "N/A"}</MetricSummary>

                        </SummaryContainer>
            
                        <span class="govuk-accordion__icon" aria-hidden="true"></span>
                    </MatrixButton>

                    
                </h2>
            </div>
            <div id={ `accordion-default-content-${ item }`} class="govuk-accordion__section-content" aria-labelledby={ `accordion-default-heading-${ item }`}>
                <Container>
                    <MetricDataHeader header={ MetricHeader }/>

                    <MetricMatrix metric={ metric }/>
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

    const allMetrics = Object.keys(data[Object.keys(data)[METRICS_INDEX]]);

    const [metricSearch, setMetricSearch] = useState("");
    const [topicType, setTopicType] = useState(null);
    const [typeType, setTypeType] = useState(null);
    const topics = new Set(Object.values(data[Object.keys(data)[REF_INDEX]]["categories"]));
    const typs = new Set(Object.values(data[Object.keys(data)[REF_INDEX]]["types"]));
    const [allExpanded, setAllExpanded ] = useState(false);
    const [metrics, setMetrics ] = useState(allMetrics);

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
        else {
            setMetrics(allMetrics);
        }
       
    }, [ metricSearch ]);

    useEffect(() => {
        if (topicType) {
            setMetrics(metrics.filter(item => searchTags(item, topicType)));
        }
        else {
            setMetrics(allMetrics);
        }
    }, [ topicType ]);

    useEffect(() => {
        if (typeType) {
            setMetrics(metrics.filter(item => searchTags(item, typeType)));
        } else {
            setMetrics(allMetrics);
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
                    <button onClick={setAllExp}
                            type="button" 
                            class="govuk-accordion__open-all" 
                            aria-expanded={allExpanded}>
                                {allExpanded ? "Close all": "Open all"}
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
