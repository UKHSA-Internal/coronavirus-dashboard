// @flow

import React from 'react';
import type { ComponentType } from 'react';

import type { Props } from './Accessibility.types.js';
import * as Styles from './Accessibility.styles.js';

const Accessibility: ComponentType<Props> = ({}: Props) => {
  return (
    <Styles.Container className="govuk-width-container">

      <h2 id="accessibility-statement-for-website-name">Accessibility statement for Track coronavirus (COVID-19)</h2>
      <p>This accessibility statement applies to coronavirus.data.go.uk.</p>
      <p>This website is run by Public Health England. We want as many people as possible to be able to use this website. For example, that means you should be able to:</p>
      <ul>
        <li>change colours, contrast levels and fonts</li>
        <li>zoom in up to 300% without the text spilling off the screen</li>
        <li>navigate most of the website using just a keyboard</li>
        <li>navigate most of the website using speech recognition software</li>
        <li>listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)</li>
      </ul>
      <p>We’ve also made the website text as simple as possible to understand.</p>
      <p><a rel="external" href="https://mcmw.abilitynet.org.uk/" class="govuk-link">AbilityNet</a> has advice on making your device easier to use if you have a disability.</p>
      
      <h3 id="how-accessible-this-website-is">How accessible this website is</h3>
      <p>We know some parts of this website are not fully accessible:</p>
      <ul>
        <li>JEREMEY HELP</li>
        <li>the text will not reflow in a single column when you change the size of the browser window</li>
        <li>you cannot modify the line height or spacing of text</li>
        <li>most older PDF documents are not fully accessible to screen reader software</li>
        <li>live video streams do not have captions</li>
        <li>some of our online forms are difficult to navigate using just a keyboard</li>
        <li>you cannot skip to the main content when using a screen reader</li>
        <li>there’s a limit to how far you can magnify the map on our ‘contact us’ page</li>
      </ul>
      
      <h3 id="feedback-and-contact-information">Feedback and contact information</h3>
      <p>If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:</p>
      <ul>
        <li>PHE PROVIDE CONTACT INFO</li>
        <li>email [email address]</li>
        <li>call [phone number]</li>
        <li>[add any other contact details]</li>
      </ul>
      <p>We’ll consider your request and get back to you in [number] days.</p>
      <p>If you cannot view the map on our ‘contact us’ page, call or email us [add link to contact details page] for directions.</p>
      
      <h3 id="reporting-accessibility-problems-with-this-website">Reporting accessibility problems with this website</h3>
      <p>We’re always looking to improve the accessibility of this website. If you find any problems not listed on this page or think we’re not meeting accessibility requirements, contact: [provide both details of how to report these issues to your organisation, and contact details for the unit or person responsible for dealing with these reports].</p>
      
      <h3 id="enforcement-procedure">Enforcement procedure</h3>
      <p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018
(the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, <a rel="external" href="https://www.equalityadvisoryservice.com/" class="govuk-link">contact the Equality Advisory and Support Service (EASS)</a>.</p>
      
      <h2 id="contacting-us-by-phone-or-visiting-us-in-person">Contacting us by phone or visiting us in person</h2>
      <p>We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment.</p>
      <p>Our offices have audio induction loops, or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.</p>
      <p>Find out how to <a class="govuk-link" href="https://www.gov.uk/government/organisations/public-health-england">contact us</a>.</p>
      
      <h2 id="technical-information-about-this-websites-accessibility">Technical information about this website’s accessibility</h2>
      <p>Public Health England is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>
      
      <h3 id="compliance-status">Compliance status</h3>
      <p>JEREMEY HELP</p>
      <p>This website is fully compliant with the <a rel="external" href="https://www.w3.org/TR/WCAG21/" class="govuk-link">Web Content Accessibility Guidelines version 2.1</a> AA standard.</p>
      <p>This website is partially compliant with the <a rel="external" href="https://www.w3.org/TR/WCAG21/" class="govuk-link">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to [insert one of the following: ‘the non-compliances’, ‘the exemptions’ or ‘the non-compliances and exemptions’] listed below.</p>
      <p>This website is not compliant with the <a rel="external" href="https://www.w3.org/TR/WCAG21/" class="govuk-link">Web Content Accessibility Guidelines version 2.1</a> AA standard. The [insert one of the following: ‘non-compliances’, ‘exemptions’ or ‘non-compliances and exemptions’] are listed below.</p>

      <h2 id="non-accessible-content">Non-accessible content</h2>
      <p>JEREMY HELP</p>
      <p>The content listed below is non-accessible for the following reasons.</p>

      <h3 id="non-compliance-with-the-accessibility-regulations">Non-compliance with the accessibility regulations</h3>
      <p>Some images do not have a text alternative, so people using a screen reader cannot access the information. This fails WCAG 2.1 success criterion 1.1.1 (non-text content).</p>
      <p>We plan to add text alternatives for all images by September 2020. When we publish new content we’ll make sure our use of images meets accessibility standards.</p>

      <h3 id="disproportionate-burden">Disproportionate burden</h3>
      <h4 id="navigation-and-accessing-information">Navigation and accessing information</h4>
      <p>There’s no way to skip the repeated content in the page header (for example, a ‘skip to main content’ option).</p>
      <p>It’s not always possible to change the device orientation from horizontal to vertical without making it more difficult to view the content.</p>
      <p>It’s not possible for users to change text size without some of the content overlapping.</p>
      <h4 id="interactive-tools-and-transactions">Interactive tools and transactions</h4>
      <p>Some of our interactive forms are difficult to navigate using a keyboard. For example, because some form controls are missing a ‘label’ tag.</p>
      <p>Our forms are built and hosted through third party software and ‘skinned’ to look like our website.</p>
      <p>We’ve assessed the cost of fixing the issues with navigation and accessing information, and with interactive tools and transactions. We believe that doing so now would be a <a rel="external" href="http://www.legislation.gov.uk/uksi/2018/952/regulation/7/made" class="govuk-link">disproportionate burden</a> within the meaning of the accessibility regulations. We will make another assessment when the supplier contract is up for renewal, likely to be in [rough timing].</p>

      <h3 id="content-thats-not-within-the-scope-of-the-accessibility-regulations">Content that’s not within the scope of the accessibility regulations</h3>
      <h4 id="pdfs-and-other-documents">PDFs and other documents</h4>
      <p>Some of our PDFs and Word documents are essential to providing our services. For example, we have PDFs with information on how users can access our services, and forms published as Word documents. By September 2020, we plan to either fix these or replace them with accessible HTML pages.</p>
      <p>The accessibility regulations <a rel="external" href="http://www.legislation.gov.uk/uksi/2018/952/regulation/4/made" class="govuk-link">do not require us to fix PDFs or other documents published before 23 September 2018</a> if they’re not essential to providing our services. For example, we do not plan to fix [example of non-essential document].</p>
      <p>Any new PDFs or Word documents we publish will meet accessibility standards.</p>
      <h4 id="live-video">Live video</h4>
      <p>We do not plan to add captions to live video streams because live video is <a rel="external" href="http://www.legislation.gov.uk/uksi/2018/952/regulation/4/made" class="govuk-link">exempt from meeting the accessibility regulations</a>.</p>

      <h2 id="what-were-doing-to-improve-accessibility">What we’re doing to improve accessibility</h2>
      <p>Our accessibility roadmap [add link to roadmap] shows how and when we plan to improve accessibility on this website.</p>

      <h2 id="preparation-of-this-accessibility-statement">Preparation of this accessibility statement</h2>
      <p>This statement was prepared on [date when it was first published]. It was last reviewed on [date when it was last reviewed].</p>
      <p>This website was last tested on [date]. The test was carried out by [add name of organisation that carried out test, or indicate that you did your own testing].</p>
      <p>We used this approach to deciding on a sample of pages to test [add link to explanation of how you decided which pages to test].</p>
      <p>You can read the full accessibility test report [add link to report].</p>
      
    </Styles.Container>
  );
};

export default Accessibility;
