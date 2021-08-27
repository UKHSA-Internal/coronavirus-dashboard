// @flow

import React, { useMemo, useState } from "react";

import remark from "remark";
import html from "remark-html";
import slug from "remark-slug";
import externalLink from "remark-external-links";

export const useMarkdown = (content: string | undefined) => {

    const [body, setBody] = useState(null);

    useMemo(() => {
        remark()
            .use(slug)
            .use(externalLink)
            .use(html)
            .process(content, (err, text) => {
                setBody(err ? null : String(text));
            });

    }, [ content ])

    return body

};  // ProcessedMarkdown
