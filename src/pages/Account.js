import React from 'react'

import CardRow from '../components/CardRow'

import useUser from '../hooks/useUser'

import './styles/Account.scss'

function Account() {
  const user = useUser()

  return (
    <div className="column-page">
      <div className="user-name">{`${user?.first_name ??
        'John'} ${user?.last_name ?? 'Smith'}`}</div>

      <div>History</div>
      <CardRow />

      <div>Liked Posts</div>
      <CardRow cards={user?.convos} noflex />

      <div>My Posts</div>
      <CardRow />
    </div>
  )
}

export default Account
