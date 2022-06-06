import { Outlet, useLoaderData } from '@remix-run/react'

import styles from './../styles/dashboard.css'
import Sidebar from './../components/Sidebar/Sidebar'
import type { IUser } from '~/types/user.types'

export const links = () => [{ rel: 'stylesheet', href: styles }]

export function loader() {
  return {
    name: 'Test User',
  }
}

export default function Dashboard() {
  const user = useLoaderData<IUser>()
  return (
    <div
      className="dashboard"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <Sidebar user={user} />
      <Outlet />
    </div>
  )
}
