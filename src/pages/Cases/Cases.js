// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { CardContent, MixedCardContainer, HeadlineNumbers } from 'components/Card';
import type { Props } from './Cases.types';
import { getParams } from "common/utils";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import { MainLoading } from "components/Loading";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.cases,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <MainLoading/>;

    return <>
        <HeadlineNumbers params={ params } { ...layout }/>
        <MixedCardContainer>{
            layout?.cards.map(( cardProps, index ) =>
                <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
            ) ?? null
        }</MixedCardContainer>
    </>
};

export default withRouter(Cases);
