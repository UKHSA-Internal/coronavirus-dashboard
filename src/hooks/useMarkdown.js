// @flow

import { useMemo, useState } from "react";

import remark from "remark";
import html from "remark-html";
import toc from "remark-toc";
import slug from "remark-slug";
import externalLink from "remark-external-links";

export const useMarkdown = (content: string | undefined, withToc=false) => {

    const [body, setBody] = useState(null);

    useMemo(() => {
        remark()
            .use(slug)
            .use(externalLink)
            .use(toc)
            .use(html)
            .process(content, (err, text) => {
                setBody(err ? null : String(text).replace(/(id=")user-content-/ig, '$1'));
            });

    }, [ content ])

    return body

};  // ProcessedMarkdown
