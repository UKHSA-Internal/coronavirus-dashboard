import React, { useState, useEffect } from "react";
import axios from "axios";
import URLs from "common/urls";
import type  { 
    usePageLayoutInputType, 
    usePageLayoutReturnType,
    LayoutInput,
    PageLayoutDefaultOutput
} from "hooks/usePageLayout.types";


const usePageLayout: usePageLayoutInputType<LayoutInput, PageLayoutDefaultOutput> =
    (layout: LayoutInput, defaultOutput: PageLayoutDefaultOutput): usePageLayoutReturnType<LayoutInput | PageLayoutDefaultOutput> => {

    const [ data, setData ] = useState(defaultOutput);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                    layout,
                    { baseURL: URLs.pageLayoutsBase }
                );
            setData(data)
        })()
    }, [])

    return data

};  // usePageLayout


export default usePageLayout;
