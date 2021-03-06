export interface ICoin {
  coin: string
  amount: number
  holdings?: number
}

export interface IPnl {
  totalRealizedPnl: number
  totalUnrealizedPnl: number
  totalUnrealizedQuantity: number
  totalPnl: PnlBreakdown[]
}

export interface PnlBreakdown {
  id: string
  unrealizedPnl: number
  realizedPnl: number
  unrealizedQuantity: number
  symbol: string
}

export interface ISpotOrder {
  _id: string
  userId: string
  symbolPair: string
  coinId: string
  type: string
  pricePerCoin: number
  quantity: number
  totalAmount: number
  createdAt: string
}
