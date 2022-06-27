import type { FunctionComponent } from 'react'
import type { IUser } from '~/types/user.types'

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
      <h6>Built on Remix.run and Linode - For Hashnode hackathon</h6>
    </div>
  )
}

type Props = {
  user?: IUser
}

export default Sidebar
