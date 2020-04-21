// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './PageTitle.types';
import * as Styles from './PageTitle.styles';

const PageTitle: ComponentType<Props> = ({ caption, title, subtitle, backUrl }: Props) => {
  return (
    <Styles.Container>
      {/* <Styles.Caption className="govuk-caption-s">{caption}</Styles.Caption> */}
      {/* need to add back link with gatsby link */}
      <Styles.Title className="govuk-heading-xl">{title}</Styles.Title>
      <Styles.Subtitle>{subtitle}</Styles.Subtitle>
    </Styles.Container>
  );
};

export default PageTitle;
