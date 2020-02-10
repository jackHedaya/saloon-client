import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'

import useUser from '../hooks/useUser'
import useAuth from '../hooks/useAuth'

import './styles/Header.scss'

function Header(props) {
  const { isLoggedIn } = useAuth()
  const user = useUser()

  return (
    <div className="header">
      <Link to="/" className="saloon">
        Saloon
      </Link>
      <Search />
      {isLoggedIn && (
        <Link to="/post" className="login-account">
          Post
        </Link>
      )}
      {isLoggedIn ? (
        <UserDropdown
          name={user ? user.first_name : undefined}
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
      <div>
        <div className="body">
          <GoSearch size={20} className="icon" color="white" />
        </div>
      </div>
    </div>
  )
}

function UserDropdown(props) {
  const [open, setOpen] = useState(false)
  const { setIsLoggedIn, setToken } = useAuth()

  const toggle = () => setOpen(!open)

  const signOut = () => {
    setToken(null)
    setIsLoggedIn(false)
    props.redirect('/')
  }

  const DropdownLink = ({ to, ...other }) => (
    <DropdownItem onClick={() => props.redirect(to)} {...other} />
  )

  return (
    <Dropdown isOpen={open} toggle={toggle} nav>
      <DropdownToggle caret className="login-account">
        Hey, {props.name}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownLink to="/user">Profile</DropdownLink>
        <DropdownLink to="/saved-conversations">
          Saved Conversations
        </DropdownLink>
        <DropdownLink to="/history">History</DropdownLink>
        <DropdownItem divider />
        <DropdownLink to="/settings">Settings</DropdownLink>
        <DropdownItem divider />
        <DropdownItem onClick={signOut}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default withRouter(Header)
