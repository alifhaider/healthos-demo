import * as React from 'react'
import { AuthContext } from '../contexts/auth-context'
import { TUser } from '../utils/types'

export default function UserInfo() {
  const { user } = React.useContext(AuthContext)
  if (!user)
    return <p className="text-orange-400 mb-8">Login to see Your info</p>
  return (
    <div className="p-5 bg-black text-slate-300 rounded-lg">
      <h2 className="text-lg font-medium">User Info: </h2>
      <ul className="list-inside capitalize ml-4 leading-5">
        <li>Phone: {user.phone}</li>
        <li>Admin: {user.admin ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  )
}
