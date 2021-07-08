// @flow

import React, { useState, useEffect } from "react";
import {
    LeftMarker, RightMarker,
    SliderButton,
    SliderContainer,
    SliderLine,
    SliderRoot,
    TriangleMarker
} from "./VaccinationsMap.styles";
import { analytics } from "common/utils";


export const CompareHandle = ({ portrait }) => {

    const [active, setActive] = useState(false);
    const [focused, setFocused] = useState(false);

    const activationCallback = () => {
        if ( !active ) {
            setActive(true);
            analytics({
                category: "map-slider",
                action: "click",
                label: "vaccinations map"
            });
        }
    };

    const focusCallback = () => {
        if ( !focused ) {
            setFocused(true);
            analytics({
                category: "map-slider",
                action: "hover",
                label: "vaccinations map"
            });
        }
    };

    return <SliderContainer id={ "slider-container" }
                            active={ active } focused={ focused } portrait={ portrait }
                            onMouseEnter={ activationCallback }
                            onMouseLeave={ () =>  setActive(false) }
                            onTouchStart={ focusCallback }
                            onTouchEnd={ () => setFocused(false) }
                            onMouseDown={ focusCallback }
                            onMouseUp={ () => setFocused(false) }>
        <SliderRoot id={ "slider-root" }>
            <SliderLine id={ "slider-line" } active={ active } focused={ focused } portrait={ portrait }/>
            <LeftMarker>1st dose</LeftMarker>
            <RightMarker>2nd dose</RightMarker>
            <SliderButton id={ "slider-button" } active={ active } focused={ focused } portrait={ portrait }>
                <TriangleMarker direction={ "left" }/>
                <TriangleMarker direction={ "right" }/>
            </SliderButton>
        </SliderRoot>
    </SliderContainer>
};
