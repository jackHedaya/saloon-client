import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './styles/Navigation.scss'

function Navigation() {
  return (
    <div className="navigation">
      <div className="links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  )
}

const NavLink = withRouter(props => {
  const isSelected = () => props.location.pathname.includes(props.to)

  return (
    <Link
      to={props.to}
      className={[isSelected() ? 'selected' : '', 'nav-item'].join(' ')}
    >
      {props.children}
    </Link>
  )
})

export default Navigation
