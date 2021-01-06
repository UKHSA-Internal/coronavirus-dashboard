// @flow

import React from "react";
import { BasePlotter } from "./BasePlot";

import Heatmap from "./heatmap";
import { XAxis } from "./xAxis";

import type { ComponentType } from "react";


const Plotter: ComponentType<*> = ({ type = "generic", ...props }) => {

    switch ( type ) {
        case "XAxis":
            return <XAxis { ...props }/>;

        case "Heatmap":
            return <Heatmap { ...props }/>;

        case "Generic":
        default:
            return <BasePlotter { ...props }/>;
    }

};

export default Plotter;
