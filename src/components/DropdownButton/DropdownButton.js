import React, { useState, useRef, useEffect } from "react";

import ReactTooltip from "react-tooltip";

import {
    Launcher,
    DropdownContainer,
    Options,
    DropdownLabel
} from "./DropdownButton.styles";

import type { ComponentType } from "react";
import type { DropdownButtonProps } from "./DropdownButton.types";


const DropdownButton: ComponentType<DropdownButtonProps> = ({
            tooltip, launcherSrOnly, optionsProps={},
            buttonLabel, icon, launcherProps={},
            children, ...props }) => {

    const
        preppedLabel = (props?.heading ?? "")
            .toLowerCase()
            .replace(/\s/g, "_"),
        [ open, setOpen ] = useState(false),
        dropdown = useRef(null);

    function handleClickEvent ({ target }) {

        if ( dropdown.current && !target.closest(`.${dropdown.current.className}`) && open )
            setOpen(false);

    }

    useEffect(() => {
        document.addEventListener("click", handleClickEvent);

        return () => {
            document.removeEventListener("click", handleClickEvent);
        }
    });


    return <DropdownContainer ref={ dropdown }>
        <Launcher
                  data-tip={ tooltip }
                  data-for={ `tooltip-text-${ preppedLabel }` }
                  aria-labelledby={ `sr-only-download-${ preppedLabel }` }
                  className={ `dropdown-launcher ${ open ? "open" : "" }` }
                  onClick={ () => setOpen(open => !open) }
                  icon={ icon }
                  { ...launcherProps }>
            <span id={ `sr-only-download-${ preppedLabel }` }
                className={ "govuk-visually-hidden" }>{ launcherSrOnly }</span>
            <DropdownLabel>{ buttonLabel }</DropdownLabel>
        </Launcher>
        {
            open &&
            <Options { ...optionsProps }
                              top={ dropdown?.current?.offsetHeight ?? 0 }>
                { children }
            </Options>
        }
        {
            tooltip &&
            <ReactTooltip id={ `tooltip-text-${ preppedLabel }` }
                          place={ "right" }
                          backgroundColor={ "#0b0c0c" }
                          className={ "tooltip" }
                          effect={ "solid" }/>
        }
    </DropdownContainer>

};  // DownloadData


export default DropdownButton;
