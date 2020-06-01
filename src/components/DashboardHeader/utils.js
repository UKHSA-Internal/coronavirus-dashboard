import moment from "moment";

import type { ParamItem } from "./DashboardHeader.types";


export const getParamValueFor = (params: Array<ParamItem>, keyName: string, defaultValue: string|null=null): string | null => {

    return params
        .reduce((acc, { key, value }) =>
            key === keyName ? value : acc,
            defaultValue
        )

};  // getParamValueFor


export const getParamDateFor = (params: Array<ParamItem>, keyName: string, defaultValue: moment|null=null, sign: string): moment | any => {

    return params
        .reduce((acc, { key, sign: paramSign, value }) =>
            ((key === keyName && paramSign === sign) ? moment(value) : moment(acc)),
            defaultValue
        )

};  // getDateParamsFor
