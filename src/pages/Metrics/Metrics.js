// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import PageTitle from 'components/PageTitle';
import type { Props } from './Metrics.types';

import { Container } from './Metrics.styles';

import Loading from "components/Loading";

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

const MetricData: ComponentType<Props> = ({ metric }: Props) => {

    return <>

            <div>
                
            </div>

            {/* Nation */}
            <div>
                nation
            </div>
            <div>
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>

            {/* Region */}

            <div>
            </div>
            <div>
                region
            </div>
            <div>
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>

             {/* Utla */}

             <div>
                 {Object.keys(metric)[0]}
            </div>
            <div>
                utla
            </div>
            <div>
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>

             {/* ltla */}

             <div>
            </div>
            <div>
                ltla
            </div>
            <div>
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>
            <div>
                *
            </div>

             {/* overview */}

             <div>
            </div>
            <div>
                overview
            </div>
            <div>
                *
            </div>
            <div>
                
            </div>
            <div>
               
            </div>
            <div>
               
            </div>
            <div>
                
            </div>




          </>
}

const MetricDataHeader: ComponentType<Props> = ({ header }: Props) => {

    return header.map(item => {
                return <div>{item}</div> 
            });
                 
              
          
}

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
        ]
    }

    return ( <Fragment>

        <PageTitle title={"Metrics"} />

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
};

export default Metrics
