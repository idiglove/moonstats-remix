export type ColumnData = {
  field: string
  mainAmount: number
  isPositive?: boolean
  showSubheading?: boolean
}

export type DisplayOptions = {
  heading: string
  data: ColumnData
  subHeadingCurrentAmount: number | null
  subHeadingCoin: string
}
