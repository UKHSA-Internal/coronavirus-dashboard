import type { ComponentType } from "react";


export interface DropdownButtonProps {

    launcherSrOnly: string,
    buttonLabel:    string,
    icon:           string,
    props:          {||},
    tooltip?:       string,
    children?:      ComponentType,
    optionsProps?:  {||},
    launcherProps?: {||}

}  // DropdownButtonProps
