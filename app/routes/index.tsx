import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'

import styles from './../styles/dashboard.css'
import rootStyles from './../styles/root.css'
import formStyles from './../styles/form.css'
import Sidebar from './../components/Sidebar/Sidebar'
import { getSession, commitSession } from './../utils/sessions'
import LoginForm from '~/components/LoginForm/LoginForm'

export const links = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: rootStyles },
  { rel: 'stylesheet', href: formStyles },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Moon Stats - Login',
  description: 'Exciting Crypto PNL Tracker',
  viewport: 'width=device-width,initial-scale=1',
})

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
  const res = await fetch(`${process.env.API_URL}/user/login`, {
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
    const session = await getSession(request.headers.get('Cookie'))
    session.set('user', response?.data)

    return redirect('/dashboard/pnl', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  return json({ res: response })
}

export default function Index() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="root-page-wrapper">
        <LoginForm />
      </div>
    </div>
  )
}
