import type { ActionFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import type { FunctionComponent } from 'react'
import type { IUser } from '~/types/user.types'
import { getSession, destroySession } from '~/utils/sessions';

const Sidebar: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className="sidebar-wrapper">
      <h1>Moon Stats</h1>
      {user && (
        <>
          <ul>
            <li>Dashboard</li>
            <li>{`${user?.firstName} ${user?.lastName}`}</li>
          </ul>
          <form method='get' action='/logout'>
            <button type="submit">Logout</button>
          </form>
        </>
      )}
    </div>
  )
}

type Props = {
  user?: IUser
}

export default Sidebar
