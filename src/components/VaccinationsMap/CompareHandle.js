// @flow

import React, { useState } from "react";
import {
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
                        onMouseDown={ () => setIsFocused(true) }
                        onMouseUp={ () => setIsFocused(false) }>
        <SliderRoot>
            <SliderLine active={ active } focused={ isFocused } portrait={ portrait }/>
            <SliderButton active={ active } focused={ isFocused } portrait={ portrait }>
                <SlideMarker>1st dose</SlideMarker>
                <TriangleMarker direction={ "left" }/>
                <TriangleMarker direction={ "right" }/>
                <SlideMarker>2nd dose</SlideMarker>
            </SliderButton>
        </SliderRoot>
    </SliderContainer>
};
