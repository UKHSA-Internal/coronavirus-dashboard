// @flow

import React, { useState } from "react";
import {
    LeftMarker, RightMarker,
    SlideMarker,
    SliderButton,
    SliderContainer,
    SliderLine,
    SliderRoot,
    TriangleMarker
} from "./VaccinationsMap.styles";


export const CompareHandle = ({ portrait }) => {

    const [active, setActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return <SliderContainer active={ active } focused={ isFocused } portrait={ portrait }
                            onMouseEnter={ () =>  setActive(true) }
                            onMouseLeave={ () =>  setActive(false) }
                            onTouchStart={ () => setIsFocused(true) }
                            onTouchEnd={ () => setIsFocused(false) }
                            onMouseDown={ () => setIsFocused(true) }
                            onMouseUp={ () => setIsFocused(false) }>
        <SliderRoot>
            <SliderLine active={ active } focused={ isFocused } portrait={ portrait }/>
            <LeftMarker>1st dose</LeftMarker>
            <RightMarker>2nd dose</RightMarker>
            <SliderButton active={ active } focused={ isFocused } portrait={ portrait }>
                <TriangleMarker direction={ "left" }/>
                <TriangleMarker direction={ "right" }/>
            </SliderButton>
        </SliderRoot>
    </SliderContainer>
};
