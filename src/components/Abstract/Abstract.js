// @flow

import React from "react";

import type { ComponentType } from "react";
import ModalTooltip from "components/Modal";

import { AbstractContainer, Text } from "./Abstract.styles";
import Accessibility from "../../pages/Accessibility";


const Abstract: ComponentType = ({ content }) => {

    if ( !content ) return null;

    let
        result = [],
        cnt = content.trim();

    const matches = cnt.match(/{([^:]+):([^}]+)}/ig);

    if ( !matches )
        return <AbstractContainer>{ content }</AbstractContainer>;

    for ( const match of matches ) {
        if ( !match ) continue;

        const
            [ text, variable ] = match.replace(/[{}]/g, "").split(":"),
            cn = cnt.split(match);

        if (cn.length < 2) continue;

        result = [
            ...result,
            cnt
                .split(match)
                .reduce((acc, item, index) => {

                    if (!index) return [ <Text>{ item }</Text> ];

                    return [
                        ...acc,
                        <ModalTooltip key={ `sub-${index}` }
                                      replacements={{ kwargs: { date: "latest date available" }}}
                                      markdownPath={ variable }>
                            <span className={ "modal-opener-text" }>{ text }</span>
                        </ModalTooltip>,
                        <Text>{ item }</Text>
                    ]

                }, [])
        ];

        cnt = cn[1];

    }

    return <AbstractContainer>{ result }</AbstractContainer>

};  // Abstract


export default Abstract;
