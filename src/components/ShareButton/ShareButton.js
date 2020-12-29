import React, { useState, useRef, useEffect } from "react";

import ReactTooltip from "react-tooltip";

import type { ComponentType } from "react";

import { useLocation } from "react-router-dom";

import {
    Launcher,
    SharedContainer,
    OptionsContainer,
    SharedLabel
} from "./ShareButton.styles";


const ShareButton: ComponentType<ShareButtonProps> = ({tooltip, heading, launcherSrOnly, children, optionsProps={},
                                                        launcherProps={}, ...props }) => {

    const preppedLabel = (heading ?? "").toLowerCase().replace(/\s/g, "_").replace("(", "_").replace(")", "");
   
    const [ open, setOpen ] = useState(false);
    const share = useRef(null);

    function handleClickEvent ({ target }) {

        if ( share.current && !target.closest(`.${share.current.className}`) && open )
            setOpen(false);

    }

    useEffect(() => {
        document.addEventListener("click", handleClickEvent);

        return () => {
            document.removeEventListener("click", handleClickEvent);
        }
    });

    return  <SharedContainer ref={ share }>
                {
                    open &&
                    <OptionsContainer { ...optionsProps }>{ children }</OptionsContainer>
                }
                <Launcher
                    data-tip={ tooltip }
                    data-for={ `tooltip-text-${ preppedLabel }` }
                    aria-labelledby={ `hashLink-${ preppedLabel }` }
                    className={ "hashLink"  }
                    onClick={ () => setOpen(open => !open) }
                    { ...launcherProps }>
                    <span id={ `hashLink-${ preppedLabel }` }
                        className={ "govuk-visually-hidden" }>
                            { launcherSrOnly }
                    </span>
                </Launcher>
                <SharedLabel>Share</SharedLabel>
                {
                    tooltip &&
                    <ReactTooltip id={ `tooltip-text-${ preppedLabel }` }
                                place={ "right" }
                                backgroundColor={ "#0b0c0c" }
                                className={ "tooltip" }
                                effect={ "solid" }/>
                }
               </SharedContainer>
          

}; // ShareButton

export default ShareButton;