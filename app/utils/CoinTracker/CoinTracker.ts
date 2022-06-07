import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import type { CoinInfo, CoinStorage } from './types'

class CoinTracker {
  getCoinLocalStorage = () => {
    return localStorage.getItem('coins')
  }

  track = (coinInfo: CoinInfo) => {
    const coinsStorage = this.getCoinLocalStorage()
    const storage: CoinStorage = {}

    // nothing has initialized yet
    if (isEmpty(coinsStorage)) {
      this.saveCoinInfo(storage, coinInfo)
    } else {
      const parsedCoinStorage: CoinStorage = JSON.parse(coinsStorage ?? '')
      const isOvertime = this.isOvertime(parsedCoinStorage, coinInfo, 'minute')
      if (isOvertime) {
        this.saveCoinInfo(storage, coinInfo)
      }
    }
  }

  saveCoinInfo = (storage: CoinStorage, coinInfo: CoinInfo) => {
    const { coin, fetchedAmount } = coinInfo
    storage[coin] = {
      amount: fetchedAmount ?? 0,
      createdAt: new Date(),
    }
    localStorage.setItem('coins', JSON.stringify(storage))
  }

  isOvertime = (
    coinStorage: CoinStorage,
    coinInfo: CoinInfo,
    unit: 'minute' | 'second'
  ) => {
    const { coin } = coinInfo
    // if the coin has been saved before, update if 1 minute has passed
    if (!isEmpty(coinStorage[coin])) {
      const createdDate = dayjs(new Date())
      const diff = createdDate.diff(dayjs(coinStorage[coin].createdAt), unit)

      if (diff >= 1) {
        return true
      }
    }

    return false
  }
}

export default CoinTracker
