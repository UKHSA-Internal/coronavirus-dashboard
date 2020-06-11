// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';

import type { Props } from './PageTitle.types';
import {
  Container,
  Title ,
  Subtitle
} from './PageTitle.styles';

const PageTitle: ComponentType<Props> = ({ caption, title, subtitle, backUrl }: Props) => {
  return (
    <Container>
      {/* <Styles.Caption className="govuk-caption-s">{caption}</Styles.Caption> */}
      {backUrl && (
        <BackLink href={backUrl}>
          Back
        </BackLink>
      )}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default PageTitle;
