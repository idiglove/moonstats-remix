import { Outlet, useLoaderData, Link } from '@remix-run/react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import type { HeaderColumnData } from '~/components/HeaderColumn/types'
import PnlHeaders from '~/components/PnlHeaders/PnlHeaders'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'

export const loader = async () => {
  const userId = 'test'
  const pnlRes = await fetch(`${process.env.API_URL}/user/pnl/id/${userId}`)
  const pnlObj = await pnlRes?.json()

  const pnl: HeaderColumnData[] = [
    {
      name: 'Unrealized PNL',
      field: 'unrealizedPnl',
      mainText: `${pnlObj?.totalUnrealizedPnl.toFixed(2) ?? 0}$`,
      subText: '',
    },
    {
      name: 'Realized PNL',
      field: 'realizedPnl',
      mainText: `${pnlObj?.totalRealizedPnl.toFixed(2) ?? 0}$`,
    },
    {
      name: 'Most Holdings',
      field: 'mostHoldings',
      mainText: `${pnlObj?.mostHoldings?.quantity.toFixed(3) ?? 0} / ${
        pnlObj?.mostHoldings?.symbol.toUpperCase() ?? ''
      }`,
    },
  ]

  const gainersLosers = pnlObj?.totalPnl?.map((pnl: any) => {
    return {
      coin: pnl?.symbol ?? '',
      amount: pnl?.realizedPnl,
    }
  })

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

  return { pnl, pnlObj, gainersLosers, allCoins, apiUrl: process.env.API_URL }
}

export default function DashboardPnl() {
  const { pnl, gainersLosers, allCoins, apiUrl, pnlObj } = useLoaderData()
  if (typeof window !== 'undefined') {
    window.apiUrl = apiUrl
  }

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
            gainersLosers,
            allCoins,
            pnlObj,
          }}
        />
      </>
    </div>
  )
}
