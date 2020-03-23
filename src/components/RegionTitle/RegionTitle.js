// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './RegionTitle.types.js';
import * as Styles from './RegionTitle.styles.js';

const RegionTitle: ComponentType<Props> = ({ region, lastUpdatedAt }: Props) => {
  return (
    <Styles.Container>
      <Styles.Region className="govuk-heading-l">{region}</Styles.Region>
      {/* <Styles.LastUpdated>{lastUpdatedAt}</Styles.LastUpdated> */}
    </Styles.Container>
  );
};

export default RegionTitle;
