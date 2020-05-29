// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import PageTitle from 'components/PageTitle';
import SideNavigation from 'components/SideNavigation';
import DashboardHeader from 'components/DashboardHeader';
import Card from 'components/Card';
import type { Props } from './Tests.types';
import * as Styles from './Tests.styles';


const Tests: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return (
        <Styles.Container className={"govuk-width-container"}>
            <Styles.Content className="govuk-main-wrapper" role="main">
                <Styles.Container className="govuk-grid-row">
                    <Styles.Container className="govuk-grid-column-full">

                        <PageTitle title={"Tests"} />

                        <div class="govuk-grid-column-menu">
                            <SideNavigation />
                        </div>

                        <div class="govuk-grid-column-dashboard">
                            <DashboardHeader />

                            <Styles.FlexContainer>
                                <Card />
                            </Styles.FlexContainer>

                            <Styles.FlexContainer>
                                <Card />
                            </Styles.FlexContainer>
                        </div>

                    </Styles.Container>
                </Styles.Container>
            </Styles.Content>
        </Styles.Container>
    );
};

export default Tests
