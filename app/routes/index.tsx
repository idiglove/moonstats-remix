import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import styles from './../styles/dashboard.css'
import rootStyles from './../styles/root.css'
import formStyles from './../styles/form.css'
import Sidebar from './../components/Sidebar/Sidebar'
import type { IUser } from '~/types/user.types'
import { getSession } from './../utils/sessions'
import LoginForm from '~/components/LoginForm/LoginForm'

export const links = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: rootStyles },
  { rel: 'stylesheet', href: formStyles },
]

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }
  return {
    name: 'Test User',
  }
}

export default function Index() {
  const user = useLoaderData<IUser>()
  return (
    <div className="dashboard">
      <Sidebar user={user} />

      <div className="root-page-wrapper">
        <LoginForm />
      </div>
    </div>
  )
}
