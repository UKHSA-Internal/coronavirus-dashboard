// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import moment from "moment";

import useLoadData from 'hooks/useLoadData';
import PageTitle from 'components/PageTitle';
import SideNavigation from 'components/SideNavigation';
import DashboardHeader from 'components/DashboardHeader';
import Card from 'components/Card';
import type { Props } from './DailySummary.types';
import * as Styles from './DailySummary.styles';

/**
 * Extracts the number of deaths from the latest date included in
 * the data, under: ``data.overview.K02000001.dailyDeaths``
 * @param data
 * @returns {number} Latest number of deaths or 0.
 */
const getLatestDailyDeaths = (data: any): number => {

    const defaultDate = '0000.00.00';

    try {
        return data?.overview?.K02000001?.dailyDeaths?.sort((a, b) =>
            new Date(b?.date ?? defaultDate) - new Date(a?.date ?? defaultDate)
        )[0] ?? {}
    } catch (e) {
        return {}
    }

}; // getLatestDailyDeaths

const formatStr = (s: string,  replacements: ReplacementsType): string  => {

    for (const key in replacements) {

        if (!replacements.hasOwnProperty(key)) continue

        s = s.replace(`{${key}}`, replacements?.[key] ??  "")

    }

    return s

}; // formatStr

export const timestamp = (data): string =>
    data.hasOwnProperty("metadata")
        ? moment(data?.metadata?.lastUpdatedAt).format("dddd D MMMM YYYY [at] h:mma")
        : "";

export const MainLoading = () => {

    return <div className="govuk-width-container" role="main">
        <div className={ "govuk-body govuk-!-font-size-24" }>
            The website is loading. Please wait&hellip;
        </div>
    </div>

}; // MainLoading


const DailySummary: ComponentType<Props> = ({ }: Props) => {

    const
        data = useLoadData();

    if ( !data ) return <MainLoading/>;

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return (
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">

                <p className="govuk-body">Last updated on { timestamp(data) }</p>

                <div class="govuk-grid-column-menu">
                    <SideNavigation />
                </div>

                <div class="govuk-grid-column-dashboard">
                    <DashboardHeader title={"Daily Summary"} />

                    <Styles.FlexContainer>
                        <Card />
                        <Card />
                    </Styles.FlexContainer>
                </div>

            </div>
        </div>

    );
};

export default DailySummary
