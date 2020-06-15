// @flow

import type { Location } from 'react-router';

export type Props = {|
   location: Location,
|};


export type LocationPickerProps = {

    hierarchy: HierarchyDataType,

} // LocationPickerProps


export type ParamItem = {

    key:   string,
    sign:  string,
    value: string

}  // ParamItem


export type HierarchyItem = {

    key:   string,
    value: string

}  // HierarchyItem


export type FlatHierarchyItem = {

    key:   string,
    value: string
    type:  string

}  // HierarchyItem


export type HierarchyDataType = {

    overview:  Array<HierarchyItem>
    nation:    Array<HierarchyItem>,
    region:    Array<HierarchyItem>,
    nhsRegion: Array<HierarchyItem>,
    utla:      Array<HierarchyItem>,
    ltla:      Array<HierarchyItem>

}  // HierarchyDataType
