import { Outlet, useLoaderData, Link } from '@remix-run/react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import { HeaderColumnData } from '~/components/HeaderColumn/types'
import PnlHeaders from '~/components/PnlHeaders/PnlHeaders'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'

export const loader = async () => {
  const userId = 'test'
  const pnlRes = await fetch(`http://localhost:3003/user/pnl/id/${userId}`)
  const pnlObj = await pnlRes?.json()

  // const pnl = pnlObj?.
  const pnl: HeaderColumnData[] = [
    {
      name: 'Unrealized PNL',
      field: 'unrealizedPnl',
      mainText: `$${pnlObj?.totalUnrealizedPnl ?? 0}`,
      subText: '',
    },
    {
      name: 'Realized PNL',
      field: 'realizedPnl',
      mainText: `$${pnlObj?.totalRealizedPnl ?? 0}`,
    },
    {
      name: 'Most Holdings',
      field: 'mostHoldings',
      mainText: `${pnlObj?.mostHoldings?.quantity ?? 0} / ${
        pnlObj?.mostHoldings?.symbol ?? ''
      }`,
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

  return (
    <div className="pnl-wrapper">
      <>
        <Outlet />
        <PnlHeaders pnl={pnl} />
        <PnlLineChart />
        <Link to="/dashboard/pnl/order/add" className="add-order-btn">
          Add Order
        </Link>
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
