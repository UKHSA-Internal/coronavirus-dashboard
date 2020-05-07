// @flow

import React from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import MapTable from "components/MapTable";

import { MainLoading, timestamp } from "pages/Regional/Regional";

import type { Props } from './MobileRegionTable.types';
import * as Styles from './MobileRegionTable.styles';


const MobileRegionTable: ComponentType<Props> = ({}: Props) => {
    const data = useLoadData();

    if ( !data ) return <MainLoading/>;

    return (
        <Styles.Container className="govuk-width-container" role="main">
            <PageTitle
                caption="Regional view"
                title="Coronavirus (COVID-19) in the UK"
                subtitle={ `Last updated on ${ timestamp(data) }` }
            />
            <MapTable isMobile={ true }/>
        </Styles.Container>
    );
};

export default MobileRegionTable;