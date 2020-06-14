// @flow

export type Props = {||};


export type TabContentProps = {
    params: any,
    tabtype: string,
    barmode:
        null
        | "stack"
        | "normal"
        | "group"
        | "overlay",
    fields: Array<{
        label: string,
        value: string,
        tooltip: string,
        type: string,
        colour: number,
        rollingAverage: boolean
    }>
}


declare export type TabContentType<P> = React$ComponentType<P>;