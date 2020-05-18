import React from 'react'

import CardRow from '../components/CardRow'

import { useUser, useLiked } from '../hooks/useUser'

import './styles/Account.scss'

function Account() {
  const user = useUser()
  const liked = useLiked()

  return (
    <div className="column-page">
      <div className="user-name">{`${user?.first_name ?? 'John'} ${
        user?.last_name ?? 'Smith'
      }`}</div>

      <div className="section">History</div>
      <CardRow />

      <div className="section">Liked Posts</div>
      <CardRow cards={liked?.convos} noflex />

      <div className="section">My Posts</div>
      <CardRow cards={user?.convos} noflex />
    </div>
  )
}

export default Account
