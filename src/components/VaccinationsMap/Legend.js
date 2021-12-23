// @flow

import React, { useState } from "react";

import {
    LegendContainer, ScaleColor,
    ScaleGroup, ScaleLegend,
    ScaleLegendLabel, ScaleValue,
    LegendButton
} from "pages/InteractiveMap/InteractiveMap.styles";
import * as constants from "./constants";

import type { ComponentType } from "react";


const LegendHeader: ComponentType<*> = () =>
    <span><abbr title={ "Percentage" }>%</abbr>&nbsp;12+ vaccinated</span>;


export const Legend: ComponentType<*> = () => {

    const [ showLegend, setShowLegend ] = useState(true);

    if ( !showLegend )
        return <LegendContainer>
            <ScaleLegend>
                <ScaleLegendLabel>
                    <LegendButton onClick={ () => setShowLegend(true) } active={ !showLegend }>
                        <LegendHeader/>
                    </LegendButton>
                </ScaleLegendLabel>
            </ScaleLegend>
        </LegendContainer>;

    return <LegendContainer>
        <ScaleLegend>
            <ScaleLegendLabel>
                <LegendButton onClick={ () => setShowLegend(false) }>
                    <LegendHeader/>
                </LegendButton>
            </ScaleLegendLabel>
            <ScaleGroup>
                <ScaleColor style={{ background: "#fff" }}/>
                <ScaleValue>{
                    "Data missing"
                }</ScaleValue>
            </ScaleGroup>
            {

                constants.bucketsFirst.map( (item, index) => {
                    const firstValue = constants.bucketsFirst?.[index - 2] ?? 0;
                    if ( index % 2 > 0 ) {
                        return <ScaleGroup key={ `legend-${index}` }>
                            <ScaleColor style={ { background: constants.bucketsFirst?.[index - 1] ?? 0 } }/>
                            <ScaleValue>
                                {
                                    firstValue === 0
                                        ? 0
                                        : firstValue
                                }
                                &nbsp;&ndash;&nbsp;
                                { constants.bucketsFirst?.[index] - 1 ?? "+" }
                            </ScaleValue>
                        </ScaleGroup>
                    }
                })
            }
            <ScaleGroup>
                <ScaleColor style={ { background: constants.bucketsFirst.slice(-1) } }/>
                <ScaleValue>
                    { constants.bucketsFirst.slice(-2, -1)[0] }&nbsp;+
                </ScaleValue>
            </ScaleGroup>
        </ScaleLegend>
    </LegendContainer>;

};
