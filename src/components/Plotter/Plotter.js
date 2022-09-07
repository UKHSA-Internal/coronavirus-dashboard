// @flow

import React from "react";
import { BasePlotter } from "./BasePlot";

import Heatmap from "./heatmap";
import { XAxis } from "./xAxis";
import Waffle from "./Waffle";

import type { ComponentType } from "react";
import PercentageHeatmap from "./PercentageHeatmap";
import GenericHeatmap from "./GenericHeatmap";


const Plotter: ComponentType<*> = ({ type = "generic", ...props }) => {

    switch ( type ) {
        case "XAxis":
            return <XAxis { ...props }/>;

        case "percentageHeatmap":
            return <PercentageHeatmap { ...props }/>;

        case "GenericHeatmap":
            return <GenericHeatmap { ...props }/>;

        case "Heatmap":
            return <Heatmap { ...props }/>;

        case "percentageWaffle":
            return <Waffle { ...props }/>;

        default:
            return <BasePlotter { ...props }/>;
    }

};

export default Plotter;
