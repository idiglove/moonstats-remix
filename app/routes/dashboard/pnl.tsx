import { useLoaderData } from '@remix-run/react'

import HeaderColumn from '~/components/HeaderColumn/HeaderColumn'
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
  const data = useLoaderData()

  const btcAmount = useFetchCoin('bitcoin', 'btc')

  return (
    <div className="pnl-wrapper">
      <table className="header-columns">
        {data.map((col, i) => {
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
      </table>
    </div>
  )
}
