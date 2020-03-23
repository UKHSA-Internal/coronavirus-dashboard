// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { InsetText } from 'govuk-react-jsx';

import type { Props } from './StatisticWithContext.types.js';
import * as Styles from './StatisticWithContext.styles.js';

const StatisticWithContext: ComponentType<Props> = ({ caption, percentage, contextTitle, contextText }: Props) => {
  return (
    <Styles.Container>
      <Styles.Caption className="govuk-caption-s">{caption}</Styles.Caption> 
      <Styles.Number class="govuk-heading-l">
        {percentage}%
      </Styles.Number>
      <InsetText>
        <h4 className="govuk-heading-s">{contextTitle}</h4>
        <p className="govuk-body">{contextText}</p>
      </InsetText>
    </Styles.Container>
  );
};

export default StatisticWithContext;
