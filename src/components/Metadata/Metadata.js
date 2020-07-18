// @flow

import React from "react";

import useModalData from "hooks/useModalData";
import Loading from "components/Loading";
import { strFormat } from "common/utils";
import { Markdown } from "./Metadata.styles";

import type { ComponentType } from "react";


const Metadata: ComponentType<*> = ({ filename, ...props }) => {

    const data = useModalData(filename)

    if ( !data ) return <Loading/>;

    return  <Markdown dangerouslySetInnerHTML={{
        __html: strFormat(data, { kwargs: { date: "latest date available" }})
    }}/>

};  // Metadata


export default Metadata;
