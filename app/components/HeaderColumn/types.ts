export type HeaderColumnData = {
  field: string
  mainText: string
  subText?: string
  name?: string
}

export type DisplayOptions = {
  heading: string
  data: HeaderColumnData
  subHeadingCurrentAmount: number | null
  subHeadingCoin: string
}
