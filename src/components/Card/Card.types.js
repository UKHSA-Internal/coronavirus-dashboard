// @flow

import type { ParamItem } from "../DashboardHeader/DashboardHeader.types";

export type Props = {||};


declare export type IsIncludedTypeProps = {
    params: Array<ParamItem>,
    locationAware: {
        included: {
            areaType: Array<string>,
            areaName: Array<string>
        },
        excluded: {
            areaType: Array<string>,
            areaName: Array<string>
        }
    }
}
