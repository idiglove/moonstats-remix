import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'

import HeaderColumn from '~/components/HeaderColumn/HeaderColumn'
import { HeaderColumnData } from '~/components/HeaderColumn/types'
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

  return pnl
}

export default function DashboardPnl() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // ref: https://github.com/vercel/next.js/discussions/17443
    setMounted(true) // we need to hydrate after mounted when using localStorage
  }, [])
  const data = useLoaderData()

  const btcAmount = useFetchCoin('bitcoin', 'btc')

  return (
    <div className="pnl-wrapper">
      {mounted && (
        <div className="header-columns">
          {data?.map((col: HeaderColumnData, i: number) => {
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
      )}
      <PnlLineChart />
    </div>
  )
}
