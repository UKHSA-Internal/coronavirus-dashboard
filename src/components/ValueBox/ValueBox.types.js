export type ValueItemType = {|
    caption: string,
    primaryLabel: string,
    primaryValue: string,
    primaryModal?: any,
    primaryTooltip?: string,
    primarySign?: null,
    primaryModalReplacements?: {
        [string]: string
    },

    secondaryLabel: string,
    secondaryValue: string,
    secondaryModal?: any,
    secondaryTooltip?: string,
    secondarySign?: null,
    secondaryModalReplacements?: {
        [string]: string
    },

    chart?: {
        colour: string
    },

    isEnabled: boolean,
    setChartState?: () => void

|}
