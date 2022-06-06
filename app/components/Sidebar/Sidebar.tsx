import type { FunctionComponent } from 'react'
import type { IUser } from '~/types/user.types'

const Sidebar: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className="sidebar-wrapper">
      <h1>Moon Stats</h1>
      <ul>
        <li>{user?.name}</li>
      </ul>
    </div>
  )
}

type Props = {
  user: IUser
}

export default Sidebar
