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

    useEffect(() => {
        analytics("vaccinations map", "slider", "click");
    }, [ focused ]);

    useEffect(() => {
            analytics("vaccinations map", "slider", "hover");
    }, [ active ]);

    return <SliderContainer id={ "slider-container" }
                            active={ active } focused={ focused } portrait={ portrait }
                            onMouseEnter={ () =>  setActive(true) }
                            onMouseLeave={ () =>  setActive(false) }
                            onTouchStart={ () => setFocused(true) }
                            onTouchEnd={ () => setFocused(false) }
                            onMouseDown={ () => setFocused(true) }
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
