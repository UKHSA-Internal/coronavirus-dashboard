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
import {
    Loading,
    Markdown,
    Article
} from './About.styles';

const headings = [
    "introduction",

]

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
        

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        // let data1 = "" + data

        // const regex = new RegExp(/id="([^"]*?)".*?/gi);
        // const res = data1.match(regex);
        
        // if (res) {
        //     for (const [key, value] of Object.entries(res)) {
        //         data1 = data1.replace(value, value + "ref=" + value.split("=")[1])
        //     }
        // }

        return <Markdown dangerouslySetInnerHTML={{ __html: data }}/>

    } // display

    render(): React$Node {

        return <Article>
            { this.display() }
            </Article>

    } // render

} // About