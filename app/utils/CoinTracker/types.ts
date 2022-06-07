export type CoinInfo = {
  coin: string
  fetchedAmount?: number
}

export type CoinStorage = {
  [key: string]: {
    amount: number
    createdAt: Date
  }
}
