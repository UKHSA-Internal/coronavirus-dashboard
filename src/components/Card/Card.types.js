// @flow

export type Props = {|
  caption: string,
  title: string,
  subtitle: string,
  backUrl: string,
|};


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