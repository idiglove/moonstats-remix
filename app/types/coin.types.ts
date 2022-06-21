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
