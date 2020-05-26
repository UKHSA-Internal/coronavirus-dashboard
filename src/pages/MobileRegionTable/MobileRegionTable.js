// @flow

import React from 'react';
import type { ComponentType } from 'react';

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import MapTable from "components/MapTable";

import { MainLoading, timestamp } from "pages/Regional/Regional";

import type { Props } from './MobileRegionTable.types';
import * as Styles from './MobileRegionTable.styles';


const MobileRegionTable: ComponentType<Props> = ({ ...props }: Props) => {
    const data = useLoadData();

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;

    if ( !data ) return <MainLoading/>;

    return (
        <Styles.Container { ...props } className="govuk-width-container">
            <Styles.Content className="govuk-main-wrapper" role="main">
                <PageTitle
                    caption="Regional view"
                    title="Coronavirus (COVID-19) in the UK"
                    subtitle={ `Last updated on ${ timestamp(data) }` }
                />
                <MapTable isMobile={ true }/>
            </Styles.Content>
        </Styles.Container>
    );
};

export default MobileRegionTable;