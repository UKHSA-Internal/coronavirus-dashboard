// @flow

import React from 'react';

import toc from "remark-toc";
import slug from "remark-slug";
import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";

import { Loading } from './About.styles';
import useGenericAPI from 'hooks/useGenericAPI';

import {
    Markdown,
    Article
} from './About.styles';

import type { AboutProps } from './About.types';
import type { ComponentType } from "react";
import { Helmet } from "react-helmet";
import BrowserHistory from "components/BrowserHistory";


const About: ComponentType<AboutProps> = ({ ...props }) => {

    let data = useGenericAPI("about", [], {}, "text");

    if ( !data ) return <Loading>Loading&hellip;</Loading>;

    remark()
        .use(toc)
        .use(slug)
        .use(externalLink)
        .use(html)
        .process(data, (err, text) => {
            data = err ? data : String(text);
        });

    return <BrowserHistory>
        <Helmet>
            <title>About the data | Coronavirus in the UK</title>
            <meta name="description"
                  content="Sources, metric definitions, and other generic
                  information about the data that presented on the dashboard." />
        </Helmet>
        <Article>
            <Markdown dangerouslySetInnerHTML={{ __html: data }}/>
        </Article>
    </BrowserHistory>;


};  // About

export default About;