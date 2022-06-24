import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'

import styles from './../styles/dashboard.css'
import rootStyles from './../styles/root.css'
import formStyles from './../styles/form.css'
import Sidebar from './../components/Sidebar/Sidebar'
import { getSession, commitSession } from './../utils/sessions'
import SignupForm from '~/components/SignupForm/SignupForm'

export const links = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: rootStyles },
  { rel: 'stylesheet', href: formStyles },
]

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('user')) {
    return redirect('/dashboard/pnl')
  }

  return null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const values = Object.fromEntries(formData)

  const res = await fetch(`${process.env.API_URL}/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...values,
    }),
  })

  const response = await res.json()

  if (response?.success === true) {
    return { success: true }
  }
  
  return { success: false }
}

export default function Signup() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="root-page-wrapper">
        <SignupForm />
      </div>
    </div>
  )
}
