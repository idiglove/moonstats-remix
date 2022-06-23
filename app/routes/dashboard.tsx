import { Outlet, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import styles from './../styles/dashboard.css'
import Sidebar from './../components/Sidebar/Sidebar'
import { getSession } from '~/utils/sessions'

export const links = () => [{ rel: 'stylesheet', href: styles }]

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')
  if (!session.has('user')) {
    return redirect('/')
  }

  return { user }
}

export default function Dashboard() {
  const { user } = useLoaderData()
  return (
    <div className="dashboard">
      <Sidebar user={user} />
      <Outlet />
    </div>
  )
}
