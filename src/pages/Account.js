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

      <div className="section">History</div>
      <CardRow />

      <div className="section">Liked Posts</div>
      <CardRow cards={user?.convos} noflex />

      <div className="section">My Posts</div>
      <CardRow />
    </div>
  )
}

export default Account
