import React, { useState, useEffect } from "react";
import axios from "axios";
import URLs from "common/urls";
import remark from "remark";
import externalLink from "remark-external-links";
import html from "remark-html";
import { analytics } from "common/utils";


const useModalData = (fileName: string): string | null => {

    const [ data, setData ] = useState(null);

    useEffect(() => {
        analytics({
            category: 'Modals',
            action: 'open',
            label: fileName
        });

        (async () => {
            const { data } = await axios.get(
                    fileName.endsWith(".md") ? fileName : `${fileName}.md`,
                    { baseURL: URLs.modals }
                );

            remark()
                .use(externalLink)
                .use(html).process(data, (err, text) => {
                    if ( !err ) setData(String(text))
                });

        })()
    }, [])

    return data

};  // usePageLayout


export default useModalData;
