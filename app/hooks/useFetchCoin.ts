import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import CoinTracker from '~/utils/CoinTracker/CoinTracker'
import type { CoinInfo, CoinStorage } from '~/utils/CoinTracker/types'

const useFetchCoin = (coin: string, symbol: string) => {
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCoin = async (callback: (coinInfo: CoinInfo) => void) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
      )

      const data = await res.json()
      callback({
        coin: 'btc',
        fetchedAmount: data[0]?.current_price ?? 0,
      })
    }

    const coinTracker = new CoinTracker()
    const coinsStorage = coinTracker.getCoinLocalStorage()

    if (isEmpty(coinsStorage)) {
      fetchCoin((coinInfo: CoinInfo) => {
        coinTracker.track(coinInfo)
        setAmount(coinInfo.fetchedAmount ?? 0)
      })
    } else {
      const parsedCoinStorage: CoinStorage = JSON.parse(coinsStorage ?? '')
      const isOvertime = coinTracker.isOvertime(
        parsedCoinStorage,
        {
          coin: symbol,
        },
        'minute'
      )

      if (isOvertime) {
        fetchCoin((coinInfo: CoinInfo) => {
          coinTracker.track(coinInfo)
          setAmount(coinInfo.fetchedAmount ?? 0)
        })
      } else {
        setAmount(parsedCoinStorage[symbol].amount)
      }
    }
  }, [coin, symbol])

  return amount
}

export default useFetchCoin
