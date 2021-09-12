// @flow

import React, { useState, useEffect } from 'react';

import toc from "remark-toc";
import slug from "remark-slug";
import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";

import useGenericAPI from 'hooks/useGenericAPI';

import { Markdown, Article } from './GenericMarkdownPage.styles';
import type { GenericProps } from './GenericMarkdownPage.types';
import type { ComponentType } from "react";

import BrowserHistory from "components/BrowserHistory";
import Loading from "components/Loading";


const GenericMarkdownPage: ComponentType<GenericProps> = ({ pathName }) => {

    const rawData = useGenericAPI(pathName, [], {}, "text");
    let [ data, setData ] = useState(null);

    useEffect(() =>
        remark()
            .use(toc)
            .use(slug)
            .use(externalLink)
            .use(html)
            .process(rawData, (err, text) =>
                setData(String(text))
            ),
        [ rawData ]
    );

    if ( !data ) return <Loading/>;

    return <BrowserHistory>
        <Article>
            <Markdown dangerouslySetInnerHTML={{ __html: data }}/>
        </Article>
    </BrowserHistory>;


};  // GenericMarkdownPage

export default GenericMarkdownPage;
