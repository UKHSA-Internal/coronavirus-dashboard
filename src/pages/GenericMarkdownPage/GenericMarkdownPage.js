// @flow

import React, { useState, useMemo } from 'react';

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
    const [ data, setData ] = useState(null);

    useMemo(() => {
        remark()
            .use(toc)
            .use(slug)
            .use(externalLink)
            .use(html)
            .process(rawData, (err, text) =>
                err ? err : setData(String(text))
            );
    }, [ rawData ]);

    if ( !data || !rawData ) return <Loading/>;

    return <BrowserHistory>
        <Article>
            <Markdown dangerouslySetInnerHTML={{
                // Not entirely sure which plugin add the prefix, but
                // we don't need it.
                __html: data.replace(/(id=")user-content-/ig, '$1')
            }}/>
        </Article>
    </BrowserHistory>;


};  // GenericMarkdownPage

export default GenericMarkdownPage;
