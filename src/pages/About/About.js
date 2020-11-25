// @flow

import React, { Component, useState, useEffect } from 'react';
import { Redirect } from 'react-router'


import BrowserHistory from "components/BrowserHistory";

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


const About: ComponentType<Props> = ({ ...props }: Props) => {

    const url = URLs.about;

    const [loading, setLoading] = useState(false)
    const [data, setData ] = useState([])
    // state: AboutState = {
    //     loading: false,
    //     data: []
    // };

    const getData = async () => {

        const
            { data } = await axios.get(url, {responseType: "text"});
            remark()
                .use(toc)
                .use(slug)
                .use(externalLink)
                .use(html).process(data, (err, text) => {
                    setLoading(false)
                    setData(err ? data : String(text))
                }
        
            );

    };

    useEffect(() => {
        setLoading(true);
        setData(getData());
    });

    const display = () => {

        // const { hash } = this.props
        // alert (hash)

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return <Markdown dangerouslySetInnerHTML={{ __html: data }}/>

    } // display

    

        return <BrowserHistory>
                <Article>
                    { display() }
                </Article>
            </BrowserHistory>

     // render

} // About

export default About
