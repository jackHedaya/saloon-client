import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";

import useUser from "../hooks/useUser";
import { AuthContext } from "../App"

import "./styles/Header.scss";

function Header() {
  return (
    <div className="header">
      <Link to="/" className="saloon">
        Saloon
      </Link>
      <Search />
      <LoginAccount />
    </div>
  );
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
  );
}

function LoginAccount(props) {
  const { isLoggedIn } = useContext(AuthContext)
  const user = useUser()

  return (
    <>
      { isLoggedIn && <Link to="/post" className="login-account">Post</Link>}
      <Link to="/login" className="login-account">
        {user ? `Hello, ${user.first_name}` : "Login"}
      </Link>
    </>
  );
}

export default Header;
