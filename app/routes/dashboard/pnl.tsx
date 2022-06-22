import { Outlet, useLoaderData, Link } from '@remix-run/react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import type { HeaderColumnData } from '~/components/HeaderColumn/types'
import PnlHeaders from '~/components/PnlHeaders/PnlHeaders'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'

export const loader = async () => {
  // const userId = 'test'
  const userId = '62b29088109c957aa82ca3a9'
  // const url = new URL(request.url)
  // const userId = url.searchParams.get('userId')
  const pnlRes = await fetch(`${process.env.API_URL}/user/pnl/id/${userId}`)
  const pnlObj = await pnlRes?.json()
  const spotOrdersByDateRes = await fetch(
    `${process.env.API_URL}/spot-order/date-grouped/user/${userId}`
  )
  const spotOrdersByDate = await spotOrdersByDateRes?.json()

  const pnl: HeaderColumnData[] = [
    {
      name: 'Unrealized PNL',
      field: 'unrealizedPnl',
      mainText: `${pnlObj?.totalUnrealizedPnl?.toFixed(2) ?? 0}$`,
      subText: '',
    },
    {
      name: 'Realized PNL',
      field: 'realizedPnl',
      mainText: `${pnlObj?.totalRealizedPnl?.toFixed(2) ?? 0}$`,
    },
    {
      name: 'Most Holdings',
      field: 'mostHoldings',
      mainText: `${pnlObj?.mostHoldings?.quantity?.toFixed(3) ?? 0} / ${
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

  return {
    pnl,
    pnlObj,
    gainersLosers,
    apiUrl: process.env.API_URL,
    spotOrdersByDate,
  }
}

export default function DashboardPnl() {
  const { pnl, gainersLosers, apiUrl, pnlObj, spotOrdersByDate } =
    useLoaderData()
  if (typeof window !== 'undefined') {
    window.apiUrl = apiUrl
  }

  return (
    <div className="pnl-wrapper">
      <>
        <Outlet />
        <PnlHeaders pnl={pnl} />
        <PnlLineChart spotOrdersByDate={spotOrdersByDate} />
        <Link to="/dashboard/pnl/order/add" className="add-order-btn">
          Add Order
        </Link>
        <FooterColumns
          data={{
            gainersLosers,
            pnlObj,
          }}
        />
      </>
    </div>
  )
}
