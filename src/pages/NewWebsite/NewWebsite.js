// @flow

import React, { useEffect, useState } from 'react';

import toc from "remark-toc";
import slug from "remark-slug";
import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";
import Loading from "components/Loading";

import axios from "axios";

import URLs from "common/urls";

import {
    Markdown,
    Article
} from './NewWebsite.styles';

import type { ComponentType } from "react";
import type { NewWebsiteProps } from "./NewWebsite.types";
import { analytics } from "common/utils";


const useMarkdownData = (path: string): string | null => {

    const [ data, setData ] = useState(null);

    useEffect(() => {
        analytics({
            category: 'NewWebsite',
            action: 'open',
            label: path
        });

        (async () => {
            const { data } = await axios.get(path, { responseType: "text" });

            remark()
                .use(toc)
                .use(slug)
                .use(externalLink)
                .use(html)
                .process(data, (err, text) =>
                    setData(err ? data : String(text))
            );

        })()
    }, [])

    return data

};  // useMarkdownData


const NewWebsite: ComponentType<NewWebsiteProps> = ({ ...props }) => {

    const data = useMarkdownData(URLs.newWebsite);

    if ( !data ) return <Loading/>;

    return <Article>
        <Markdown dangerouslySetInnerHTML={{ __html: data }}/>
    </Article>


} // NewWebsite


export default NewWebsite;
