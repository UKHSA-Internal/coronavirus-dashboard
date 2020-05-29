// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import PageTitle from 'components/PageTitle';
import SideNavigation from 'components/SideNavigation';
import DashboardHeader from 'components/DashboardHeader';
import Card from 'components/Card';
import type { Props } from './Cases.types';
import * as Styles from './Cases.styles';


const Cases: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return (
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">

                <p className="govuk-body">Last updated on Thursday 28 May 2020 at 3:37pm</p>

                <div class="govuk-grid-column-menu">
                    <SideNavigation />
                </div>

                <div class="govuk-grid-column-dashboard">
                    <DashboardHeader title={"Cases"} />

                    <Styles.FlexContainer>
                        <Card />
                    </Styles.FlexContainer>

                    <Styles.FlexContainer>
                        <Card />
                    </Styles.FlexContainer>
                </div>

            </div>
        </div>

    );
};

export default Cases
