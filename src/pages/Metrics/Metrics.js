// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Metrics.types';

import { Container } from './Metrics.styles';

import Loading from "components/Loading";

import GreenTick from "assets/green-tick.svg";

import useGenericAPI from 'hooks/useGenericAPI';

const MetricHeader = [
    'Metric',
    'Area Type',
    '',
    '',
    'Availability',
    '',
    '',
    '',
    '',
    'UK',
    'England',
    'Scotland',
    'Northern Ireland',
    'Wales'
]

const MetricItem: ComponentType<Props> = ({ item, metric }: Props) => {

    const areaType = [
        'nation',
        'region',
        'utla',
        'ltla',
        'overview',
        'msoa'
    ]

    return <>

    { areaType.map(at => {

        const values = metric[item][at]

        return <>
        {/* Metric */}
        <div style={{height: '2px'}}>
            {at === 'utla' ? item : null}
        </div>   
         {/* Area Type */}
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

        <Container>
            <MetricDataHeader header={ MetricHeader }/>
             {
                data.metrics.map(item => {

                    return <MetricData metric={ item }/>

                })
            }
        </Container>

       

    </Fragment>

    );
}; // Metrics

export default Metrics
