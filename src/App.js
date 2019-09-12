import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Persist } from "react-persist";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";

import "./App.scss";

/**
 * @type {React.Context<{ isLoggedIn: boolean, setIsLoggedIn: ()=> void, token: string, setToken: () => void }>}
 */
const AuthContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
      <Persist
        name="saloon"
        data={{ token, isLoggedIn }}
        debounce={500}
        onMount={data => {
          setIsLoggedIn(data.isLoggedIn);
          setToken(data.token);
        }}
      />
      <Router>
        <div>
          <Header />
          <Navigation />
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/conversation/:id" component={Conversation} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

function SecuredRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default App;
export { AuthContext };
