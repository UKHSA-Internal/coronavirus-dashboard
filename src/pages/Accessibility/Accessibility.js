// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Accessibility.types';
import * as Styles from './Accessibility.styles';

const Accessibility: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container className="govuk-width-container">

      <h1 id="accessibility-statement-for-website-name">Accessibility statement for Coronavirus (COVID-19) cases in the UK</h1>
      <p>This accessibility statement applies to coronavirus.data.gov.uk.</p>
      <p>This website is run by Public Health England. We want as many people as possible to be able to use this website. For example, that means you should be able to:</p>
      <ul>
        <li>change colours, contrast levels and fonts</li>
        <li>zoom in up to 300% without the text spilling off the screen</li>
        <li>navigate most of the website using just a keyboard</li>
        <li>navigate most of the website using speech recognition software</li>
        <li>listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)</li>
      </ul>

      <h2 id="how-accessible-this-website-is">How accessible this website is</h2>
      <p>We know some parts of this website are not fully accessible:</p>
      <ul>
        <li>page regions not identified with ARIA landmarks</li>
        <li>page titles are not descriptive on about the data and accessibility statement pages</li>
        <li>rendering issues bbserved zooming text only/increasing font size</li>
        <li>two dimensional scrolling is present at 1280px width and 400% zoom</li>
        <li>headings and labels do not describe a topic or purpose</li>
        <li>map is included twice in tab order</li>
        <li>UTLA meaning not clear</li>
        <li>chart hover content is not hoverable and dismissable</li>
        <li>visible tab focus indicator missing on map</li>
        <li>map name is not meaningful on screen readers</li>
        <li>region page is missing footer content on mobile view</li>
      </ul>
      
      <h2 id="reporting-accessibility-problems-with-this-website">Reporting accessibility problems with this website</h2>
      <p>We’re always looking to improve the accessibility of this website. If you find any problems not listed on this page or think we’re not meeting accessibility requirements, contact Public Health England at <a href="mailto:coronavirus-tracker@phe.gov.uk?Subject=Coronavirus%20dashboard%20accessibility%20feedback" rel="noopener noreferrer" target="_blank">coronavirus-tracker@phe.gov.uk</a>.</p>
      
      <h2 id="enforcement-procedure">Enforcement procedure</h2>
      <p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018
(the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, <a rel="external" href="https://www.equalityadvisoryservice.com/" class="govuk-link">contact the Equality Advisory and Support Service (EASS)</a>.</p>
      
      <h2 id="technical-information-about-this-websites-accessibility">Technical information about this website’s accessibility</h2>
      <p>Public Health England is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>
      
      <h3 id="compliance-status">Compliance status</h3>
      <p>This website is fully partially with the <a rel="external" href="https://www.w3.org/TR/WCAG21/" class="govuk-link">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances and exemptions listed below.</p>

      <h2 id="non-accessible-content">Non-accessible content</h2>
      <p>The content listed below is non-accessible for the following reasons.</p>
      <h3 id="non-compliance-with-the-accessibility-regulations">Non-compliance with the accessibility regulations</h3>
      <p>Page regions not identified with ARIA landmarks. This fails WCAG 2.1 success criterion 1.3.1 (Info and Relationships).</p>
      <p>Page titles are not descriptive on about the data and accessibipty statement pages. This fails WCAG 2.1 success criterion 2.4.2 (Page Titled).</p>
      <p>Rendering issues bbserved zooming text only/increasing font size. This fails WCAG 2.1 success criterion 1.4.4 (Resize Text).</p>
      <p>Two dimensional scrolpng is present at 1280px width and 400% zoom. This fails WCAG 2.1 success criterion 1.4.10 (Reflow).</p>
      <p>Headings and labels do not describe a topic or purpose. This fails WCAG 2.1 success criterion 2.4.6 (Headings and Labels).</p>
      <p>The map is included twice in tab order. This fails WCAG 2.1 success criterion 1.1.1 (Non-text Content) and 2.4.3 (Focus Order).</p>
      <p>UTLA meaning not clear. This fails WCAG 2.1 success criterion 1.3.1 (Info and Relationships).</p>
      <p>Chart hover content is not hoverable and dismissable. This fails WCAG 2.1 success criterion 1.4.13 (Content on Hover or Focus).</p>
      <p>Visible tab focus indicator missing on map. This fails WCAG 2.1 success criterion 2.4.7 (Focus Visible).</p>
      <p>The map name is not meaningful on screen readers. This fails WCAG 2.1 success criterion 1.1.1 (Non-Text Content).</p>

      <p>We plan to address these issues in the near future.</p>

      <h2 id="preparation-of-this-accessibility-statement">Preparation of this accessibility statement</h2>
      <p>This statement was prepared on 11 April 2020. It was last reviewed on 11 April 2020.</p>
      <p>This website was last tested on 11 April 2020. The test was carried out externally by Zoonou.</p>
      
    </Styles.Container>
  );
};

export default Accessibility;
