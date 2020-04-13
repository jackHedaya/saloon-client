import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GoSearch, GoCheck, GoX } from 'react-icons/go'
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
} from 'reactstrap'

import ClearClasses from '../_helpers/ClearClasses'

import { acceptInvite } from '../services/user.service'

import useUser from '../hooks/useUser'
import useAuth from '../hooks/useAuth'

import './styles/Header.scss'

function Header(props) {
  const { isLoggedIn } = useAuth()
  const user = useUser()

  return (
    <div className="header">
      <span id="logo">
        <Link to="/" className="saloon">
          Saloon
        </Link>
        <span id="slogan">Conversation Reimagined</span>
      </span>
      <Search />
      {isLoggedIn && (
        <Link to="/post" className="login-account">
          Post
        </Link>
      )}
      {isLoggedIn ? (
        <UserDropdown
          name={user?.first_name}
          invites={user?.invites}
          redirect={props.history.push}
        />
      ) : (
        <div className="login-account">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </div>
  )
}

function Search(props) {
  return (
    <div className="search-wrapper">
      <input placeholder="Search..." />
      <div className="i-wrapper">
        <div className="body">
          <GoSearch size={20} className="icon" color="white" />
        </div>
      </div>
    </div>
  )
}

function UserDropdown({ name, invites, redirect }) {
  const [open, setOpen] = useState(false)
  const { setIsLoggedIn, setToken } = useAuth()

  const toggle = () => setOpen(!open)

  const signOut = () => {
    setToken(null)
    setIsLoggedIn(false)
    redirect('/')
  }

  const DropdownLink = ({ to, ...other }) => (
    <DropdownItem onClick={() => redirect(to)} {...other} />
  )

  return (
    <Dropdown isOpen={open} toggle={toggle} nav>
      <DropdownToggle caret className="login-account">
        {name ? `Hey, ${name}` : 'Hey!'}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownLink to="/account">My Account</DropdownLink>

        <InvitesDropdown
          invites={invites}
          redirect={to => {
            toggle()
            redirect(to)
          }}
        />

        <DropdownItem divider />
        <DropdownLink to="/settings">Settings</DropdownLink>
        <DropdownItem divider />
        <DropdownItem onClick={signOut}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

function InvitesDropdown({ invites = [], redirect }) {
  const [open, setOpen] = useState(false)
  const { token } = useAuth()

  const toggle = () => {
    if (invites?.length < 1) {
      setOpen(false)
      return
    }

    setOpen(!open)
  }

  function InviteItem({ children: name, id }) {
    return (
      <div
        className="sub-item dropdown-item"
        onClick={() => {
          toggle()
          redirect(`/conversation/${id}`)
        }}
      >
        <div className="title">{name}</div>
        <span className="buttons">
          <Button
            outline
            size="sm"
            color="success"
            style={{ marginRight: '5px' }}
            onClick={e => {
              acceptInvite(token, id)

              e.stopPropagation()
            }}
          >
            <GoCheck />
          </Button>
          <Button
            outline
            size="sm"
            color="danger"
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <GoX />
          </Button>
        </span>
      </div>
    )
  }

  return (
    <Dropdown isOpen={open} toggle={toggle} direction="left">
      <ClearClasses nClassName="dropdown-item">
        <DropdownToggle>
          Invitations
          <Badge style={{ marginLeft: '20px' }}>{invites?.length ?? 0}</Badge>
        </DropdownToggle>
      </ClearClasses>
      <DropdownMenu>
        {invites.map(invite => (
          <InviteItem
            key={`Notification/${invite.convo_id}`}
            id={invite.convo_id}
          >
            {invite.title}
          </InviteItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default withRouter(Header)
