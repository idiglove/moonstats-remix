export type HeaderColumnData = {
  field: string
  mainAmount: number
  isPositive?: boolean
  showSubheading?: boolean
  name?: string
}

export type DisplayOptions = {
  heading: string
  data: HeaderColumnData
  subHeadingCurrentAmount: number | null
  subHeadingCoin: string
}
