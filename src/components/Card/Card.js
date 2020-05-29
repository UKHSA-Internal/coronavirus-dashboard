// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';

import type { Props } from './Card.types';
import * as Styles from './Card.styles';

const Card: ComponentType<Props> = ({ caption, title, subtitle, backUrl }: Props) => {
  return (
    <Styles.Card className="dashboard-panel">

      <div class="govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-0">
        <div class="govuk-grid-column-one-half">
          <h2 class="govuk-heading-m govuk-!-margin-bottom-1 govuk-!-margin-top-0">Testing</h2>
        </div>
        <div class="govuk-grid-column-one-half">
          <span class="govuk-caption-m govuk-body-s more-detail govuk-!-margin-bottom-0 govuk-!-margin-top-1"><a class="govuk-link more-detail govuk-!-font-weight-bold govuk-link--no-visited-state govuk-!-margin-bottom-0" href="testing">More detail ►</a></span>
        </div>
      </div>

      <hr class="govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible" />

      <div class="govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-0">
        <div class="govuk-grid-column-one-half container-map">
          <img src="/public/images/graph-tests.png" width="100%" alt="" />
        </div>
        <div class="govuk-grid-column-one-half">

          <div class="data-label"><p class="govuk-body govuk-!-margin-bottom-0">No. of tests</p></div><div class="square-blue"></div>
          <div class="data-value"><h3 class="govuk-heading-m govuk-!-margin-bottom-2 govuk-!-padding-top-0">
            128,340
            <p class="govuk-body-s govuk-!-margin-bottom-0 today">Total all time: 3,090,566</p>
          </h3></div>

          <div class="data-label"><p class="govuk-body govuk-!-margin-bottom-0">Planned lab-capacity</p></div><div class="square-grey"></div>
          <div class="data-value"><h3 class="govuk-heading-m govuk-!-margin-bottom-3 govuk-!-padding-top-0">
            145,855
          </h3></div>
          <div class="spacer"> </div>
        </div>
        </div>

      </Styles.Card>
  );
};

export default Card;
