// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './BackToTop.types';
import * as Styles from './BackToTop.styles';

import useBackToTopOverlayVisible from 'hooks/useBackToTopOverlayVisible';

const BackToTop: ComponentType<Props> = ({ mode }: Props) => {
  const visible = useBackToTopOverlayVisible('footer');
  if (mode === 'overlay'){
    if (visible) {
      return (
        <Styles.OverlayContainer>
            <a class="govuk-link" href="#top">Back to Top</a>
        </Styles.OverlayContainer>
      );
    } else {
      return (
        <Styles.OverlayContainer>
        </Styles.OverlayContainer>
      );
    }
  } else {
    if (visible) {
      return (
        <Styles.InlineContainer>
        </Styles.InlineContainer>
      );  
    } else {
      return (
        <Styles.InlineContainer>
            <a class="govuk-link" href="#top">Back to Top</a>
        </Styles.InlineContainer>
      );  
    }
  }
};

export default BackToTop;
