// @flow

import React, { Component } from 'react';

import toc from "remark-toc";
import slug from "remark-slug";
import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";

import axios from "axios";

import URLs from "common/urls";

import type { AboutProps, AboutState } from './About.types';
import * as Styles from './About.styles';



export default class About extends Component<AboutProps, {}> {

    #url = URLs.about;

    state: AboutState = {
        loading: false,
        data: []
    };

    getData = async () => {

        const
            { data } = await axios.get(this.#url, {responseType: "text"});
            remark()
                .use(toc)
                .use(slug)
                .use(externalLink)
                .use(html).process(data, (err, text) =>
                this.setState({
                    data: err ? data : String(text),
                    loading: false
                })
            );

    };

    componentDidMount() {

        this.setState({ loading: true }, this.getData)

    } // componentDidMount

    display() {

        const { loading, data } = this.state;

        if ( loading ) return <p>Loading&hellip;</p>

        return <div className={ "markdown" } dangerouslySetInnerHTML={{ __html: data }}/>

    } // display

    render(): React$Node {

        return <Styles.Container className={"govuk-width-container about"} role="main">
            { this.display() }
        </Styles.Container>

    } // render

} // About
