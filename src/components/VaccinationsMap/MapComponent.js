// @flow

import React from "react";

import { ReactCompareSlider } from "react-compare-slider";
import { CompareHandle } from "./CompareHandle";

import type { ComponentType } from "react";


export const MapComponent: ComponentType<*> = ({ frameOption }) => {

    return <ReactCompareSlider
            onlyHandleDraggable
            id={ "vaccinations-map-container" }
            handle={ <CompareHandle portrait={ false } frameOption={ frameOption }/> }
            itemOne={ <div id={ frameOption.left } className="map"/> }
            itemTwo={ <div id={ frameOption.right } className="map"/> }
        />;

}; // MapComponent
