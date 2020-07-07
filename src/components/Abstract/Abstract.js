// @flow

import React from "react";

import type { ComponentType } from "react";
import ModalTooltip from "components/Modal";

import { AbstractContainer } from "./Abstract.styles";


const Abstract: ComponentType = ({ content }) => {

    if ( !content ) return null;

    let
        result = [],
        cnt = content.trim();

    for ( const match of cnt.match(/{([^:]+):([^}]+)}/ig) ) {
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

                    if (!index) return [ item ];

                    return [
                        ...acc,
                        <ModalTooltip key={ `sub-${index}` }
                                      markdownPath={ variable }>
                            <span className={ "modal-opener-text" }>{ text }</span>
                        </ModalTooltip>,
                        item
                    ]

                }, [])
        ];

        cnt = cn[1];

    }

    return <AbstractContainer>{ result }</AbstractContainer>

};  // Abstract


export default Abstract;
