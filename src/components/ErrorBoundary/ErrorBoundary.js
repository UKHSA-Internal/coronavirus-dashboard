// @flow

import React from 'react';

type Props = {
  children: any,
};

type State = {
  hasError: boolean
};

export default class ErrorBoundary extends React.Component<Props, State> {
  props: Props;
  state: State = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return null;
    }
    return this.props.children;
  }
}
