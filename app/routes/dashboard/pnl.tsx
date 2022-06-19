import { Outlet, useLoaderData, Link } from '@remix-run/react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import PnlHeaders from '~/components/PnlHeaders/PnlHeaders'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'

export const loader = async () => {
  // const pnlRes = await fetch('http://localhost:3003/spot-order/')
  // console.log(await pnlRes?.json())
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
