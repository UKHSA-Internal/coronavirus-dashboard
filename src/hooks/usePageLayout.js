import React, { useState, useEffect } from "react";
import axios from "axios";
import URLs from "common/urls";
import type  { usePageLayoutInputType, usePageLayoutReturnType } from "hooks/hooks.types"


const usePageLayout = (layout: usePageLayoutInputType): usePageLayoutReturnType => {

    const [ data, setData ] = useState(null);

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
