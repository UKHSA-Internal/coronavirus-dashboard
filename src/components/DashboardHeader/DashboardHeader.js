// @flow

import React, { Fragment } from "react";
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './DashboardHeader.types';
import * as Styles from './DashboardHeader.styles';

const DashboardHeader: ComponentType<Props> = ({ location: { pathname }, title}: Props) => {
    const layout = useResponsiveLayout(768);

    return (
        <Fragment>
            <div class="sticky-header govuk-!-padding-top-3">

                <div class="govuk-grid-row govuk-!-margin-top-0">

                    <div class="govuk-grid-column-one-half">
                        <span class="govuk-caption-l">{title}</span>
                    </div>
                    <div class="govuk-grid-column-one-half filters govuk-!-padding-top-1">
                        <span id="pointer" class="govuk-body-s">►</span> <span class="govuk-body-s change-location govuk-body govuk-!-margin-bottom-0 " onclick="showLocalisation()"><b>Location:</b> United Kingdom</span>
                        <span id="pointer-date" class="govuk-body-s govuk-!-margin-left-5">►</span> <span class="govuk-body-s change-location govuk-body govuk-!-margin-bottom-0 " onclick="showDatePicker()"><b>Date:</b> 01 Jan 2020 - 28 May 2020</span>
                    </div>

                </div>
            </div>
            <div class="govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-4">
                <div class="govuk-grid-column-full">
                    <hr class="govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" />
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(DashboardHeader);
