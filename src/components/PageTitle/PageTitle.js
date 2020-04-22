// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';

import type { Props } from './PageTitle.types';
import * as Styles from './PageTitle.styles';

const PageTitle: ComponentType<Props> = ({ caption, title, subtitle, backUrl }: Props) => {
  return (
    <Styles.Container>
      {/* <Styles.Caption className="govuk-caption-s">{caption}</Styles.Caption> */}
      {backUrl && (
        <BackLink href={backUrl}>
          Back
        </BackLink>
      )}
      <Styles.Title className="govuk-heading-xl">{title}</Styles.Title>
      <Styles.Subtitle>{subtitle}</Styles.Subtitle>
    </Styles.Container>
  );
};

export default PageTitle;
