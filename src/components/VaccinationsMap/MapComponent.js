// @flow

import React, { memo } from "react";

import { ReactCompareSlider } from "react-compare-slider";
import { CompareHandle } from "./CompareHandle";

import type { ComponentType } from "react";


export const MapComponent: ComponentType<*> = memo( ( props ) => {

    return <ReactCompareSlider
        onlyHandleDraggable
        id={ "vaccinations-map-container" }
        handle={ <CompareHandle  portrait={ false } /> }
        itemOne={<div id="first" className="map"/>}
        itemTwo={<div id="second" className="map"/>}
    />;

});
