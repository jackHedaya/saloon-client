import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";

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
  const { accountName } = props;

  return (
    <Link to="/login" className="login-account">
      {accountName ? `Hello, ${accountName}` : "Login"}
    </Link>
  );
}

export default Header;
