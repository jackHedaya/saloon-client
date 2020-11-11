import React from 'react'

import CardRow from '../components/CardRow'

import { useProfile } from '../hooks/useUser'

import './styles/Account.scss'

function Profile(props) {
  const id = props.match.params.id
  const user = useProfile(id)

  return (
    <div className="column-page">
      <div className="user-name">{`${user?.first_name ?? 'John'} ${
        user?.last_name ?? 'Smith'
      }`}</div>

      <div className="section">{`${user?.first_name ?? 'John'}`}'s Posts</div>
      <CardRow cards={user?.convos} noflex />
    </div>
  )
}

export default Profile
