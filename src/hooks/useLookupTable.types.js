export type LookupItem = {

    [string]: {
        c: Array<string>,  // children
        p: string          // parent
    }

}  // LookupItem


export type LookupDataType = {

    nation: Array<LookupItem>,
    region: Array<LookupItem>,
    nhsRegion: Array<LookupItem>,
    nhsNation: Array<LookupItem>,
    utla: Array<LookupItem>,
    ltla: Array<LookupItem>

}  // HierarchyDataType
