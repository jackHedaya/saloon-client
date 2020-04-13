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

import ClearClasses from '../_helpers/ClearClasses'

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
      <div className="i-wrapper">
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

  const [subOpen, setSubOpen] = useState(false)

  const toggle = () => setOpen(!open)
  const subToggle = () => setSubOpen(!subOpen)

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
        <DropdownLink to="/account">My Account</DropdownLink>

        <Dropdown isOpen={subOpen} toggle={subToggle} direction="left">
          <ClearClasses nClassName="dropdown-item">
            <DropdownToggle caret>Invitations</DropdownToggle>
          </ClearClasses>
          <DropdownMenu>
            <DropdownItem>Hello</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <DropdownItem divider />
        <DropdownLink to="/settings">Settings</DropdownLink>
        <DropdownItem divider />
        <DropdownItem onClick={signOut}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default withRouter(Header)
