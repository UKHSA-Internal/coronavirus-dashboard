// @flow

import React, { Fragment } from "react";

import type { ComponentType } from "react";
import ModalTooltip from "components/Modal";

import { AbstractContainer } from "./Abstract.styles";


const Abstract: ComponentType = ({ content, fullWidth=false }) => {

    if ( !content ) return null;

    let
        result = [],
        cnt = content.trim();

    const matches = cnt.match(/{([^:]+):([^}]+)}/ig);

    if ( !matches )
        return <AbstractContainer aria-label={ "Abstract description of the contents" }
                                  fullWidth={ fullWidth }>
            { content }
        </AbstractContainer>;

    for ( const match of matches ) {
        if ( !match ) continue;

        const
            [ text, variable ] = match.replace(/[{}]/g, "").split(":"),
            cn = cnt.split(match);

        if ( cn.length < 2 ) continue;

        result = [
            ...result,
            cnt
                .split(match)
                .reduce((acc, item, index) => {

                    if ( !index ) return [ <Fragment key={ item }>{ item }</Fragment> ];

                    return [
                        ...acc,
                        <ModalTooltip key={ `sub-${index}` }
                                      replacements={{ kwargs: { date: "latest date available" }}}
                                      markdownPath={ variable }>
                            <span className={ "modal-opener-text" }>{ text }</span>
                        </ModalTooltip>,
                        <Fragment key={ `${item}-${index}` }>{ item }</Fragment>
                    ]

                }, [])
        ];

        cnt = cn[1];

    }

    return <AbstractContainer aria-label={ "Abstract description of the contents" }
                              fullWidth={ fullWidth }>
        { result }
    </AbstractContainer>;

};  // Abstract


export default Abstract;
