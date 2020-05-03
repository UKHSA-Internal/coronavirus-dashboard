// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './BackToTop.types';
import * as Styles from './BackToTop.styles';

import useBackToTopOverlayVisible from 'hooks/useBackToTopOverlayVisible';

const BackToTopLink: ComponentType<Props> = () => {
  return (
    <div class="govuk-width-container">
      <a class="govuk-link govuk-link--no-visited-state" href="#top">
        <svg role="presentation" focusable="false" class="back-to-top" xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17">
          <path fill="currentColor" d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"></path>
        </svg>Back to top
      </a>
    </div>
  );
};

/**
 * A govuk style back-to-top link component.
 *
 * This component can either appear as an 'overlay' stuck to the bottom of the
 * screen hovering over the content, or as an 'inline' link that sits between
 * other components in the vertical page flow.
 *
 * @param {string} mode Either 'overlay' or 'inline' to choose which style to
 * display this component.
 */
const BackToTop: ComponentType<Props> = ({ mode }: Props) => {
  const visible = useBackToTopOverlayVisible('footer');
  if (mode === 'overlay'){
      return (
        <Styles.OverlayContainer  style={{opacity: visible ? 1 : 0}}>
          <BackToTopLink />
        </Styles.OverlayContainer>
      );
  } else {
      return (
        <Styles.InlineContainer style={{opacity: visible ? 0 : 1}}>
          <BackToTopLink />
        </Styles.InlineContainer>
      );  
    }
};

export default BackToTop;
