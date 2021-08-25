// @flow

import React from 'react';

import PageTitle from 'components/PageTitle';
import type { Props } from './ErrorBoundary.types';
import { Container, DetailsBody } from './ErrorBoundary.styles';
import { analytics } from "common/utils";


export default class ErrorBoundary extends React.Component<Props, State> {
    props: Props;
    state: State = {
        error: null,
        errorInfo: null
    };

    componentDidCatch(error, errorInfo) {

        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        analytics({
            action: "exception",
            description: error,
            fatal: true
        });

    }

    render() {

        if ( this.state.errorInfo ) {

            // Error path
            return <Container role="main">
                <PageTitle title={ "Something went wrong" }/>

                <p className="govuk-body">
                    There was an error. Please try again later.
                </p>
                <p className="govuk-body">
                    If the problem persists, contact us via <a href="mailto:coronavirus-tracker@phe.gov.uk"
                                                               className="govuk-link">coronavirus-tracker@phe.gov.uk</a> and
                    include:
                </p>
                <ul className="govuk-list govuk-list--bullet">
                    <li>details of what you were trying to do that caused the problem</li>
                    <li>your operating system (such as Windows, Mac OS, Android, iOS) and its version if possible</li>
                    <li>your platform (such as mobile, tablet, computer)</li>
                    <li>your browser (such as Chrome, Edge, Firefox, Internet Explorer)</li>
                    <li>the technical details quoted below</li>
                </ul>
                <details className="govuk-details" data-module="govuk-details">
                    <summary className="govuk-details__summary">
                        <span className="govuk-details__summary-text">
                            Technical details
                        </span>
                    </summary>
                    <DetailsBody>
                        { this.state.error && this.state.error.toString() }
                        <br/>
                        { this.state.errorInfo.componentStack }
                    </DetailsBody>
                </details>
            </Container>;

        }

        // Normally, just render children
        return this.props.children;
    }

}
