import type { LoaderFunction, MetaFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { Outlet, useLoaderData, Link } from '@remix-run/react'

import FooterColumns from '~/components/FooterColumns/FooterColumns'
import type { HeaderColumnData } from '~/components/HeaderColumn/types'
import PnlHeaders from '~/components/PnlHeaders/PnlHeaders'
import PnlLineChart from '~/components/PnlLineChart/PnlLineChart'
import { getSession } from './../../utils/sessions'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Moon Stats - PNL Dashboard',
  description: 'Exciting Crypto PNL Tracker',
  viewport: 'width=device-width,initial-scale=1',
})

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')
  if (!session.has('user')) {
    return redirect('/')
  }

  const userId = user.id ?? ''
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
    user
  }
}

export default function DashboardPnl() {
  const { pnl, gainersLosers, apiUrl, pnlObj, spotOrdersByDate, user } =
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
