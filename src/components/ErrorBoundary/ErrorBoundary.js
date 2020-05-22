// @flow

import React from 'react';

import PageTitle from 'components/PageTitle';
import type { Props } from './ErrorBoundary.types';
import * as Styles from './ErrorBoundary.styles';


export default class ErrorBoundary extends React.Component<Props, State> {
    props: Props;
    state: State = {
        error: null,
        errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
  }

  render() {
        if (this.state.errorInfo) {

            // Error path
            return <Styles.Container className="govuk-width-container" role="main">
                <PageTitle title={"Something went wrong"} />

                <p className="govuk-body">
                    There was an error. Please try again later.
                </p>
                <p className="govuk-body">
                    If the problem persists, please contact us via <a href="mailto:coronavirus-tracker@phe.gov.uk" className="govuk-link">coronavirus-tracker@phe.gov.uk</a> and include:
                </p>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Details of what you were trying to do that caused the problem</li>
                    <li>Your operating system (such as Windows, Mac OS, Android, iOS) and its version if possible</li>
                    <li>Your platform (such as mobile, table, computer)</li>
                    <li>Your browser (such as Chrome, Edge, Firefox, Internet Explorer)</li>
                    <li>The technical details quoted below</li>
                </ul>
                <details className="govuk-details" data-module="govuk-details">
                    <summary className="govuk-details__summary">
                        <span className="govuk-details__summary-text">
                            Technical details
                        </span>
                    </summary>
                    <Styles.DetailsBody className="govuk-details__text">
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </Styles.DetailsBody>
                </details>

            </Styles.Container>

        }
        // Normally, just render children
        return this.props.children;
    }

}
