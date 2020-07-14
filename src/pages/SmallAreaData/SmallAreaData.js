// @flow

import React from "react";

import { Frame, DownloadLink } from "./SmallAreaData.styles";
import type { ComponentType } from "react";


const SmallAreaData: ComponentType<*> = () => {

    return <>
        <Frame
            title={ "Choropleth map of case in small areas" }
            allowpaymentrequest={ false }
            allowfullscreen={ false }
            src={ "https://phe.maps.arcgis.com/apps/webappviewer/index.html?id=47574f7a6e454dc6a42c5f6912ed7076" }/>
        <DownloadLink href={ 'https://coronavirus.data.gov.uk/downloads/msoa_data/MSOAs-09-07-2020.xlsx' }>Download Small Area (MSOA) data as a spreadsheet</DownloadLink>
    </>

};  // SmallAreaData


export default SmallAreaData;
