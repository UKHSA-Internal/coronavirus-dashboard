// @flow

import React, { Component } from 'react';

import slug from "remark-slug";
import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";

import type { Props } from './Disclaimer.types';
import * as Styles from './Disclaimer.styles';
import toc from "remark-toc";


export default class Disclaimer extends Component<Props, {}> {

    state = {

        data: null,
        loading: false

    } // state

    processData  = () => {

        const { text } = this.props;

        remark()
            .use(toc)
            .use(slug)
            .use(externalLink)
            .use(html).process(text, (err, text) =>
                this.setState({
                    data: err ? text : String(text),
                    loading: false
                })
        );

    } // processData

    componentDidMount(): * {

        this.setState({ loading: true }, this.processData)

    } // componentDidMount

    render(): React$Node {

        const { data, loading } = this.state;

        if ( loading ) return null;

        return <Styles.Container className="disclaimer govuk-!-margin-top-9">
            <div className={ "markdown" } dangerouslySetInnerHTML={{ __html: data }}/>
        </Styles.Container>

    } // render

}