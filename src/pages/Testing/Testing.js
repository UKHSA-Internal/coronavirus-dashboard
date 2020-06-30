// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import {
    MixedCardContainer,
    HeadlineNumbers,
    CardContent
} from 'components/Card';
import type { Props } from './Testing.types';
import { getParams, } from "common/utils";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import Loading from "components/Loading";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


const Testing: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.testing,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <Loading large={ true }/>;

    return <>
        <HeadlineNumbers params={ params } { ...layout }/>
        <MixedCardContainer>{
            layout?.cards.map(( cardProps, index ) =>
                <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
            ) ?? null
        }</MixedCardContainer>
    </>
};

export default withRouter(Testing);
