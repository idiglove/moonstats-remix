import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import HeaderColumn from '~/components/HeaderColumn/HeaderColumn'
import type { HeaderColumnData } from '~/components/HeaderColumn/types'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'
import useFetchCoin from '~/hooks/useFetchCoin'

export const loader = async () => {
  const pnl = [
    {
      name: 'Total PNL',
      field: 'pnl',
      mainAmount: 20,
      isPositive: true,
    },
    {
      name: 'Balance',
      field: 'balance',
      mainAmount: 100,
      showSubheading: true,
    },
    {
      name: '24 Hour Change',
      field: 'dailyChange',
      mainAmount: 1,
      isPositive: true,
    },
    {
      name: 'Weekly Change',
      field: 'weeklyChange',
      mainAmount: 2,
      isPositive: false,
    },
  ]

  const gainers = [
    {
      coin: 'WinkLink',
      amount: 10,
    },
    {
      coin: 'SLP',
      amount: 15,
    },
    {
      coin: 'KNC',
      amount: 3,
    },
    {
      coin: 'IDEX',
      amount: 4,
    },
  ]

  const losers = [
    {
      coin: 'WinkLink',
      amount: 10,
    },
    {
      coin: 'SLP',
      amount: 15,
    },
    {
      coin: 'KNC',
      amount: 3,
    },
    {
      coin: 'IDEX',
      amount: 4,
    },
  ]

  const allCoins = [
    {
      coin: 'WinkLink',
      amount: 10,
      holdings: 12,
    },
    {
      coin: 'SLP',
      amount: 15,
      holdings: 13,
    },
    {
      coin: 'KNC',
      amount: 3,
      holdings: 11,
    },
    {
      coin: 'IDEX',
      amount: 4,
      holdings: 13,
    },
  ]

  return { pnl, gainers, losers, allCoins }
}

export default function DashboardPnl() {
  const { pnl, gainers, losers, allCoins } = useLoaderData()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // ref: https://github.com/vercel/next.js/discussions/17443
    setMounted(true) // we need to hydrate after mounted when using localStorage
  }, [])

  const btcAmount = useFetchCoin('bitcoin', 'btc')

  if (!mounted) {
    return null
  }

  return (
    <div className="pnl-wrapper">
      <>
        <div className="header-columns">
          {pnl?.map((col: HeaderColumnData, i: number) => {
            return (
              <HeaderColumn
                key={`header-column-${i}`}
                displayOptions={{
                  heading: col?.name ?? '',
                  data: col,
                  subHeadingCurrentAmount: btcAmount,
                  subHeadingCoin: 'btc',
                }}
              />
            )
          })}
        </div>
        <PnlLineChart />
        <FooterColumns
          data={{
            gainers,
            losers,
            allCoins,
          }}
        />
      </>
    </div>
  )
}
